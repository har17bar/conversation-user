import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JoiPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, {
      allowUnknown: true,
    });
    if (error) {
      throw new RpcException(error.message);
    }
    return value;
  }
}
