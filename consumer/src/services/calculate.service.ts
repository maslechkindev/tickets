import {TypeEnum} from "../enums/type.enum";
import {InputMessageDataDto} from "../dtos/inputMessage.dto";

class CalculateService {

    static async #getGeometric(dto: InputMessageDataDto): Promise<number> {
        if(!dto.data.start || !dto.data.common) {
            throw new Error('')
        }
        return dto.data.start * Math.pow(dto.data.common, dto.number-1)
    }

    static async #getArithmetic(dto: InputMessageDataDto): Promise<number> {
        if(!dto.data.start || !dto.data.common) {
            throw new Error('')
        }
        return dto.data.start + dto.data.common * (dto.number - 1);
    }

    static async #getHarmonic(dto: InputMessageDataDto): Promise<number> {
        if(!dto.data.start || !dto.data.common) {
            throw new Error('')
        }
        return  1/(dto.data.start + (dto.number -1) * dto.data.common);
    }

    static async #getFibonacci(number: number): Promise<number> {
        let n1 = 0, n2 = 1, nextTerm;
        nextTerm = n1 + n2;
        while (nextTerm <= number) {
            n1 = n2;
            n2 = nextTerm;
            nextTerm = n1 + n2;
        }

        return nextTerm;
    }

    async calculate(dto: InputMessageDataDto): Promise<number> {
        let numberSeries = 0;
        if(dto.type === TypeEnum.ARITHMETIC) {
            numberSeries = await CalculateService.#getArithmetic(dto)
        } else if(dto.type === TypeEnum.GEOMETRIC) {
            numberSeries = await CalculateService.#getGeometric(dto)
        } else if(dto.type === TypeEnum.HARMONIC) {
            numberSeries = await CalculateService.#getHarmonic(dto)
        } else if(dto.type === TypeEnum.FIBONACCI) {
            numberSeries = await CalculateService.#getFibonacci(dto.number)
        }
        return numberSeries;
    }

}

export default CalculateService