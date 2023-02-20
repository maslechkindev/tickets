import {Request, Response} from 'express'
import TicketService from "../services/ticket.service";
import Ticket from "../models/tickets.model";

const service = new TicketService();

export const input = async (req: Request, res: Response) => {
    try {
        const ticket: Ticket = await service.input(req.body);
        res.status(200).send({ticket: ticket.id});
    } catch(e: Error | any) {
        res.status(400).send({msq: e.message});
    }
}

export const output = async (req: Request, res: Response) => {
    try {
        const id: any = req.query.ticket;
        const result = await service.output(id);
        res.status(200).send(result);
    } catch(e: Error | any) {
        res.status(400).send({msq: e.message});
    }
}

export const inprogress = async (req: Request, res: Response) => {
    try {
        const result = await service.inprogress();
        res.status(200).send(result);
    } catch(e: Error | any) {
        res.status(400).send({msq: e.message});
    }
}