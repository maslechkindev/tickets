import { IsNotEmpty } from "class-validator";

export class OutputRequestDto {
    @IsNotEmpty()
    ticket: number;
}