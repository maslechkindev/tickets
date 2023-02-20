import {RequestHandler} from "express";
import {plainToClass} from "class-transformer";
import {validate, ValidationError} from "class-validator";
import {sanitize} from "class-sanitizer";


function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
    return (req, res, next) => {
        const dto = plainToClass(type, req.method === 'POST' ? req.body : req.query);
        console.log('dto', dto)
        validate(dto, { skipMissingProperties }).then(
            (errors: ValidationError[]) => {
                console.log(errors);
                if (errors.length > 0) {
                    const dtoErrors = parseErrors(errors)
                    next(res.status(400).send(dtoErrors));
                } else {
                    sanitize(dto);
                    req.body = dto;
                    next();
                }
            }
        );
    };
}

function parseErrors(errors: ValidationError[]): any {
    return errors.map((error: ValidationError) => {
        if (error.children && error.children.length > 0) {
            console.log(error);
            return parseErrors(error.children)
        } else {
            return `${error.property}: ${(Object as any).values(error.constraints)}`
        }
    });
}


export default validationMiddleware;