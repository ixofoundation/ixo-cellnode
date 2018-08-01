import { TransactionError } from "./error/TransactionError";

var amqplib = require('amqplib');

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
                    setTimeout(function () {
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
                    //channel.bindQueue(this.queue, 'pds.dlx');
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
}

export default new MessageQ('pds');