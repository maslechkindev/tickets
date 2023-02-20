import {InputRequestDto} from "../dtos/inputRequest.dto";
import {TicketStatusEnum} from "../enums/ticketStatus.enum";
import Ticket from "../models/tickets.model";
import {AmqpService} from "./amqp.service";
import {AmqpMessageDto} from "../dtos/amqpMessage.dto";
import {OutputResponseExistDto, OutputResponseNotExistDto} from "../dtos/outputResponse.dto";

require("dotenv").config();
const md5 = require('md5');
const amqpUrl: string = process.env.AMQP_URL || '';
const queue: string = process.env.QUEUE_NAME || '';

export default class TicketService {

    producer: AmqpService;

    constructor() {
        this.producer = new AmqpService(amqpUrl, queue);
    }

    async input (dto: InputRequestDto): Promise<Ticket> {
        const request = md5(JSON.stringify(dto));
        const ticketFinished = await TicketService.#isExistFinished(dto);
        const result = ticketFinished ? ticketFinished.result : null;
        const status = ticketFinished ? TicketStatusEnum.FINISH : TicketStatusEnum.IN_PROGRESS;
        const newTicket = await Ticket.create({result, request, status});
        if(!ticketFinished) {
            const msg: AmqpMessageDto = {
                action: 'input',
                data: dto,
            }
            this.producer.channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)))
        }
        return newTicket;
    };

    async output (id: string): Promise<OutputResponseExistDto | OutputResponseNotExistDto> {
        const ticket = await Ticket.findByPk(id);
        if(!ticket) throw new Error(`Ticket with id ${id} not exist`)
        const result = ticket ?
            {number_series: ticket.result} :
            {msg: 'try one more time later.'}
        return result;
    };

    async inprogress (): Promise<(number | undefined)[]> {
        const tickets = await Ticket.findAll({where: {status: TicketStatusEnum.IN_PROGRESS}});
        const ids = tickets.map(ticket => ticket.id)
        return ids;
    };

    static async #isExistFinished(dto: InputRequestDto): Promise<Ticket | null> {
        const request = md5(JSON.stringify(dto));
        const ticket = await Ticket.findOne({ where: { request, status: TicketStatusEnum.FINISH } });
        return ticket
    }
}