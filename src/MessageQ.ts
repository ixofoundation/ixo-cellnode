import { TransactionError } from "./error/TransactionError";
import { toASCII } from "punycode";
import { resolve } from "path";

var amqplib = require('amqplib');


const BLOCKCHAIN_URI_TENDERMINT = (process.env.BLOCKCHAIN_URI_TENDERMINT || '');

export class MessageQ {

    connection: any;

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
        try {
            const channel = await this.connection.createChannel();
            channel.assertExchange("pds.ex", "direct", { durable: true });
            channel.assertExchange("pds.dlx", "fanout", { durable: true });
            channel.assertQueue(this.queue, {
                durable: true,
                deadLetterExchange: "pds.dlx",
                deadLetterRoutingKey: "dlx.rk"
            })
                .then(() => {
                    channel.bindQueue(this.queue, 'pds.ex');
                })
                .then(() => {
                    let jsonContent = JSON.stringify(content);
                    console.log(new Date().getUTCMilliseconds() + ' send to queue');
                    channel.sendToQueue(this.queue, Buffer.from(jsonContent), {
                        persistent: true,
                        contentType: 'application/json'
                    });
                    return true;
                });

        } catch (error) {
            throw new TransactionError(error.message);
        }
    }

    public subscribe(): Promise<any> {
        var inst: any;
        inst = this;
        return new Promise(function (resolve: Function, reject: Function) {
            try {
                const channel = inst.connection.createChannel();
                channel.assertExchange("pds.dlx", "fanout", { durable: true });
                channel.assertQueue('pds.dlq', {
                    durable: true
                })
                    .then(() => {
                        channel.bindQueue('pds.dlq', 'pds.dlx');
                    })
                    .then(() => {
                        channel.prefetch(1);

                        channel.consume('pds.dlq', (messageData: any) => {
                            console.log(new Date().getUTCMilliseconds() + " Received %s", messageData.content.toString());
                            resolve(messageData.content);
                        }, { noAck: true });
                    }, (error: any) => {
                        throw error;
                    });

            } catch (error) {
                throw new Error(error.message);
            }
        });
    }
}

export default new MessageQ('pds');