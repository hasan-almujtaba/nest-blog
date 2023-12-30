// custom-validation.pipe.ts
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
  ValidationPipe,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const validationPipe = new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = errors.reduce((acc, error) => {
          const [property] = error.property.split('.');
          acc[property] = Object.values(error.constraints)[0];
          return acc;
        }, {});
        return new BadRequestException({
          message: formattedErrors,
          error: 'Bad Request',
          statusCode: 400,
        });
      },
    });
    return validationPipe.transform(value, metadata);
  }
}
