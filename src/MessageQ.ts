import { TransactionError } from "./error/TransactionError";

var amqplib = require('amqplib');

var connection: any;

export class MessageQ {

    private queue: string;
    host: string;

    constructor(queue: string) {
        this.queue = queue;
        this.host = (process.env.RABITMQ_URI || '');
    }

    connect() : void {
        amqplib.connect(this.host).then((conn: any) => {
            connection = conn;
            console.log('RabbitMQ connected');
        }, () => {
            console.log("Could not initialize RabbitMQ Server");
            throw new TransactionError("Cannot connect to RabbitMQ Server");
        });
    }

    async publish(content: any) {
        try {

            const channel = await connection.createChannel();

            channel.assertQueue(this.queue, {
                durable: true
            }).then(() => {
                let jsonContent = JSON.stringify(content);
                console.log('publish to queue ' + jsonContent);
                channel.sendToQueue(this.queue, Buffer.from(jsonContent), {
                    persistent: true,
                    contentType: 'application/json'
                });
                return true;
            }, (error: any) => {
                throw error;
            });

        } catch (error) {
            throw new TransactionError(error.message);
        }

        this.subscribe();
    }

    public async subscribe() {
        try {
            const channel = await connection.createChannel();
            channel.assertQueue(this.queue, {
                durable: true
            }).then(() => {
                channel.prefetch(1);
                channel.consume(this.queue, (messageData: any) => {

                    if (messageData === null) {
                        return;
                    }

                    const message = JSON.parse(messageData.content.toString());

                    this.handleMessage(message).then(() => {
                        return channel.ack(messageData);
                    }, () => {
                        return channel.nack(messageData);
                    });
                });
            }, (error: any) => {
                throw error;
            });

        } catch (error) {
            throw new TransactionError(error.message);
        }
    }

    private handleMessage(message: any): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => { 
            console.log('consume from queue ' + JSON.stringify(message));
            resolve(true);    
        });
    }
}

export default new MessageQ('pds');