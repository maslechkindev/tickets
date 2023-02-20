import CalculateService from "./calculate.service";
import {TicketStatusEnum} from "../enums/ticketStatus.enum";
import Ticket from "../models/tickets.model";
import {InputMessageDataDto, InputMessageDto} from "../dtos/inputMessage.dto";

require("dotenv").config();
const md5 = require('md5');

export default class TicketService {

    calculatorService: CalculateService;

    constructor() {
        this.calculatorService = new CalculateService();
    }

    async init(dto: InputMessageDto) {
        if(dto.action === 'input') {
            await this.input(dto.data)
        }
    }

    async input (dto: InputMessageDataDto) {
        const result = await this.calculatorService.calculate(dto);
        console.log(result);
        const tickets = await TicketService.#findTicketsByRequest(dto);
        await Promise.all(
            tickets.map(async (ticket) => {
                await ticket.update({result, status: TicketStatusEnum.FINISH});
            })
        )
    };

    static async #findTicketsByRequest(dto: InputMessageDataDto): Promise<Ticket[] | []> {
        const request = md5(JSON.stringify(dto));
        const tickets = await Ticket.findAll({ where: { request, result: null} });
        console.log('tickets',tickets);
        return tickets
    }
}