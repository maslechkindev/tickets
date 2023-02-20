import 'reflect-metadata'
import {TypeEnum} from "../enums/type.enum";

class InputRequestDataDto {
    start: number;
    common: number;
}

export class InputMessageDataDto {
    number: number;
    type: TypeEnum;
    data: InputRequestDataDto
}

export class InputMessageDto {
    action: string;
    data: InputMessageDataDto
}