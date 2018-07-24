import { TransactionError } from "./error/TransactionError";
import axios from 'axios';

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
                    resolve(conn);
                    console.log('RabbitMQ connected');
                }, (reason: any) => {
                    //console.log("Could not initialize RabbitMQ Server");
                    reject("Cannot connect to RabbitMQ Server " + reason);
                });
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