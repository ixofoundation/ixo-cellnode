import { TransactionError } from "./error/TransactionError";
import { dateTimeLogger } from './logger/Logger';
import Cache from './Cache';
import { handleResponseFromMessageQueue } from './handlers/RequestHandler';

var amqplib = require('amqplib');

export class MessageQ {

    connection: any;
    channel: any;

    private queue: string;
    host: string;

    constructor(queue: string) {
        this.queue = queue;
        this.host = (process.env.RABITMQ_URI || '');
    }

    connect(): Promise<any> {
        var inst: any;
        inst = this;

        return new Promise(function (resolve: Function, reject: Function) {
            amqplib.connect(process.env.RABITMQ_URI || '')
                .then((conn: any) => {
                    inst.connection = conn;
                    conn.on("close", function () {
                        inst.connection = null;
                        console.error("!RabbitMQ reconnecting");
                        inst.connect();
                    });
                    conn.on("error", function () {
                        inst.connection = null;
                        inst.connect();
                    });
                    console.log('RabbitMQ connected');
                    conn.createChannel().then((ch: any) => { inst.channel = ch });
                    resolve(conn);
                }, () => {
                    setTimeout(() => {
                        console.error("RabbitMQ reconnecting");
                        inst.connect()
                    }, 5000);
                });
        });
    }

    async publish(content: any) {
        var inst: any;
        inst = this;
        return new Promise(function (resolve: Function, reject: Function) {
            inst.channel.assertExchange("pds.ex", "direct", { durable: true });
            inst.channel.assertQueue(inst.queue, { durable: true })
                .then(() => {
                    inst.channel.bindQueue(inst.queue, 'pds.ex');
                })
                .then(() => {
                    let jsonContent = JSON.stringify(content);
                    console.log(dateTimeLogger() + ' cache object ' + content.txHash);
                    Cache.set(content.txHash, content.request);
                    inst.channel.sendToQueue(inst.queue, Buffer.from(jsonContent), {
                        persistent: false,
                        contentType: 'application/json'
                    });
                    return true;
                })
                .catch(() => {
                    throw new TransactionError('Exception connecting to mq');
                });
        })

    }

    public subscribe(): Promise<any> {
        var inst: any;
        inst = this;

        return new Promise(function (resolve: Function, reject: Function) {
            inst.channel.assertQueue('pds.res', { durable: true })
                .then(() => {
                    inst.channel.bindQueue('pds.res', 'pds.ex');
                })
                .then(() => {
                    inst.channel.prefetch(50);
                    inst.channel.consume('pds.res', (messageData: any) => {
                        if (messageData === null) {
                            return;
                        }
                        var JSONcontent = JSON.parse(messageData.content.toString());
                        console.log(dateTimeLogger() + " received response for %s with hash %s", JSONcontent.msgType, JSONcontent.txHash);

                        handleResponseFromMessageQueue(messageData.content)
                        inst.channel.ack(messageData);
                    });
                })
                .catch(() => {
                    throw new TransactionError('Exception connecting to mq');
                });
        })

    }
}

export default new MessageQ('pds');