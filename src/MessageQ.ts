import { TransactionError } from "./error/TransactionError";

var amqplib = require('amqplib');
var dateFormat = require('dateformat');

export class MessageQ {

    connection: any;
    channel: any;

    private queue: string;
    host: string;

    constructor(queue: string) {
        this.queue = queue;
        this.host = (process.env.RABITMQ_URI || '');
    }

    dateTimeLogger(): string {
        return dateFormat(new Date(), "yyyy-mm-dd hh:mm:ss:l");
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
                    conn.createChannel().then((ch: any) =>{ inst.channel = ch});
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
            //const channel = await this.connection.createChannel();
            this.channel.assertExchange("pds.ex", "direct", { durable: true });
            //channel.assertExchange("pds.dlx", "fanout", { durable: true });
            this.channel.assertQueue(this.queue, {
                durable: true //,
                // deadLetterExchange: "pds.dlx",
                // deadLetterRoutingKey: "dlx.rk"
            })
                .then(() => {
                    this.channel.bindQueue(this.queue, 'pds.ex');
                })
                .then(() => {
                    let jsonContent = JSON.stringify(content);
                    console.log(this.dateTimeLogger() + ' send to queue');
                    this.channel.sendToQueue(this.queue, Buffer.from(jsonContent), {
                        persistent: false,
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
                inst.connection.createChannel()
                    .then((channel: any) => {
                        channel.assertQueue('pds.res', {
                            durable: true
                        })
                            .then(() => {
                                channel.bindQueue('pds.res', 'pds.ex');
                            })
                            .then(() => {
                                channel.prefetch(1);
                                channel.consume('pds.res', (messageData: any) => {
                                    if (messageData === null) {
                                        return;
                                    }
                                    console.log(inst.dateTimeLogger() + " Received response %s", messageData.content.toString());
                                    resolve(messageData.content);
                                });

                            }, (error: any) => {
                                throw error;
                            });
                    });
            } catch (error) {
                throw new Error(error.message);
            }
        });
    }
}

export default new MessageQ('pds');