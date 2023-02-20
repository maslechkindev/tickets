import {IsEnum, IsNotEmpty, IsNumber, ValidateIf, ValidateNested} from "class-validator";
import {TypeEnum} from "../enums/type.enum";
import {Type} from "class-transformer";
import 'reflect-metadata'

class InputRequestDataDto {
    @IsNotEmpty()
    start: number;
    @IsNotEmpty()
    common: number;
}

export class InputRequestDto {
    @IsNotEmpty()
    @IsNumber()
    number: number;

    @IsNotEmpty()
    @IsNumber()
    @IsEnum(TypeEnum)
    type: TypeEnum;

    @ValidateIf(val => val.type !== TypeEnum.FIBONACCI)
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => InputRequestDataDto)
    data: InputRequestDataDto
}