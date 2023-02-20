import 'reflect-metadata'
import {InputRequestDto} from "./inputRequest.dto";

export class AmqpMessageDto {
    action: string;
    data: InputRequestDto
}