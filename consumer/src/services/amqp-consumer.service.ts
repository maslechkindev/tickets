import amqp, {Message} from 'amqplib/callback_api'
import {InputMessageDto} from "../dtos/inputMessage.dto";
import TicketService from "./ticket.service";

const createMQConsumer = (amqpURl: string, queueName: string,  ticketService: TicketService) => {
    console.log('Connecting to RabbitMQ...')
    return async () => {
        amqp.connect(amqpURl, (errConn, conn) => {
            if (errConn) {
                throw errConn
            }

            conn.createChannel((errChan, channel) => {
                if (errChan) {
                    throw errChan
                }

                console.log('Connected to RabbitMQ')
                channel.assertQueue(queueName, { durable: true })
                channel.consume(queueName, (msg: Message | null) => {
                    if (msg) {
                        const parsed: InputMessageDto = JSON.parse(msg.content.toString())
                        ticketService.init(parsed)
                    }
                }, { noAck: true })
            })
        })
    }
}

export default createMQConsumer