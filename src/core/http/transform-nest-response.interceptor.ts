import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { NestResponse } from './nest-response';

@Injectable()
export class TransformNestResponseInterceptor implements NestInterceptor {
  #httpAdapter: AbstractHttpAdapter;

  constructor(httpAdapterHost: HttpAdapterHost) {
    this.#httpAdapter = httpAdapterHost.httpAdapter;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((controllerResponse: object) => {
        if (controllerResponse instanceof NestResponse) {
          return this.#handleNestResponse(context, controllerResponse);
        }

        return controllerResponse;
      }),
    );
  }

  #handleNestResponse(
    context: ExecutionContext,
    controllerResponse: NestResponse,
  ) {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const { headers, status, body } = controllerResponse;
    const headerNames = Object.getOwnPropertyNames(headers);

    headerNames.forEach((headerName) => {
      const headerValue = headers[headerName];
      this.#httpAdapter.setHeader(response, headerName, headerValue);
    });

    const statusCode =
      status ?? this.#getStatusByHttpMethod(httpContext.getRequest().method);

    this.#httpAdapter.status(response, statusCode);

    return body;
  }

  #getStatusByHttpMethod(httpMethod: string) {
    switch (httpMethod) {
      case 'POST':
        return 201;
      case 'GET':
        return 200;
      case 'PUT':
        return 204;
      case 'DELETE':
        return 204;
      default:
        return 200;
    }
  }
}
