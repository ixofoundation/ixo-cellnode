import { TransactionError } from "./error/TransactionError";
import axios from 'axios';
import { timingSafeEqual } from "crypto";

var amqplib = require('amqplib/callback_api');


const BLOCKCHAIN_URI_TENDERMINT = (process.env.BLOCKCHAIN_URI_TENDERMINT || '');

export class MessageQ {

    connection: any;

    private queue: string;
    host: string;

    constructor(queue: string) {
        this.queue = queue;
        this.host = (process.env.RABITMQ_URI || '');
    }      

    connect(): void {
        console.log('Checking MQ connection');
        amqplib.connect(this.host + "?heartbeat=60", (err: any, conn: any) => {
            let connFunc = this.connect;
            if (err) {
                console.error("[AMQP]", err.message);
                return setTimeout(connFunc, 1000);
            }
            conn.on("error", function(err: any) {
                if (err.message !== "Connection closing") {
                  console.error("[AMQP] conn error", err.message);
                }
              });
            conn.on("close", function() {
                console.error("[AMQP] reconnecting");
                return setTimeout(connFunc, 1000);
            });
            this.connection = conn;
            console.log('RabbitMQ connected');
        });
    }

    async publish(content: any) {
        try {

            const channel = await this.connection.createChannel();
            channel.assertQueue(this.queue, {
                durable: true
            }, (error: any) => {
                if (error) {
                    throw error;
                }
                let jsonContent = JSON.stringify(content);
                console.log(new Date().getUTCMilliseconds() + ' publish to queue');
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

 
   private handleMessage(message: any): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            console.log(new Date().getUTCMilliseconds() + ' consume from queue');
            axios.get(BLOCKCHAIN_URI_TENDERMINT + message)
                .then((response: any) => {
                    console.log(new Date().getUTCMilliseconds() + ' received response from blockchain');
                    resolve(true);
                })

        });
    }
}

export default new MessageQ('pds');