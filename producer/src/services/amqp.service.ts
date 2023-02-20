import amqp, {Channel, Connection} from 'amqplib/callback_api'

export class AmqpService {
    channel: Channel

    constructor(amqpUrl: string, queueName: string) {
        this.init(amqpUrl, queueName)
    }

    async init(amqpUrl: string, queueName: string) {
        amqp.connect(amqpUrl, (errorConnect: Error, connection: Connection) => {
            if (errorConnect) {
                console.log('Error connecting to RabbitMQ: ', errorConnect)
                return
            }

            connection.createChannel((errorChannel, channel) => {
                if (errorChannel) {
                    console.log('Error creating channel: ', errorChannel)
                    return
                }
                this.channel = channel
                channel.assertQueue(queueName);
                console.log('Connected to RabbitMQ')
            })
        })
    }
}