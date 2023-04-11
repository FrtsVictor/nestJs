import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { HttpExceptionDto } from './dto/http-exception.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  #httpAdapter: AbstractHttpAdapter;

  constructor(httpAdapterHost: HttpAdapterHost) {
    this.#httpAdapter = httpAdapterHost.httpAdapter;
  }

  catch(exception: Error, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    const { status, body }: HttpExceptionDto =
      exception instanceof HttpException
        ? this.#createFromHttpException(exception, request)
        : this.#createFromNormalException(exception, request);

    //onde retorno pro usuario
    this.#httpAdapter.reply(response, body, status);
    console.log(exception.stack);
  }

  #createFromHttpException(
    exception: HttpException,
    request: any,
  ): HttpExceptionDto {
    return {
      status: exception.getStatus(),
      body: {
        statusCode: exception.getStatus(),
        timestamp: new Date().toISOString(),
        path: request.path,
        message: (exception.getResponse() as any).message,
      },
    };
  }

  #createFromNormalException(exception: Error, request: any): HttpExceptionDto {
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.path,
        message: exception.message,
      },
    };
  }
}
