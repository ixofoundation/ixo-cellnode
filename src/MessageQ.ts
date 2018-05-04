import { TransactionError } from "./error/TransactionError";

var amqplib = require('amqplib');

var connection: any;

export class MessageQ {

    private queue: string;
    host: string;

    //static connection: any;
    

    constructor(queue: string) {
        this.queue = queue;
        this.host = (process.env.RABITMQ_URI || '');
        // this.subscribe().then(() => {
        //     console.log('Message queue subscribed');
        // }, () => {
        //     console.log('Message queue subscription failed');
        // });
    }

    connect() : void {
        amqplib.connect('amqp://guest:guest@mq:5672').then((conn: any) => {
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
                // Ensure that the queue is not deleted when server restarts
                durable: true
            }).then(() => {
                channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(content)), {
                    // Store queued elements on disk
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
    }

    public async subscribe() {
        try {

            const channel = await connection.createChannel();

            channel.assertQueue(this.queue, {
                // Ensure that the queue is not deleted when server restarts
                durable: true
            }).then(() => {

                // Only request 1 unacked message from queue
                // This value indicates how many messages we want to process in parallel
                channel.prefetch(1);

                channel.consume(this.queue, (messageData: any) => {

                    if (messageData === null) {
                        return;
                    }

                    // Decode message contents
                    const message = JSON.parse(messageData.content.toString());

                    // this.handleMessage(message).then(() => {
                    //     return channel.ack(messageData);
                    // }, () => {
                    //     return channel.nack(messageData);
                    // });
                });
            }, (error: any) => {
                throw error;
            });

        } catch (error) {
            throw new TransactionError(error.message);
        }
    }
}

export default new MessageQ('pds');