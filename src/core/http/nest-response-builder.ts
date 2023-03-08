import { NestResponse } from './nest-response';

export class NestResponseBuilder {
  #response: NestResponse = {
    status: null,
    headers: {},
    body: {},
  };

  withStatus(status: number) {
    this.#response.status = status;
    return this;
  }

  withHeaders(headers: object) {
    this.#response.headers = headers;
    return this;
  }

  withBody(body: object) {
    this.#response.body = body;
    return this;
  }

  build() {
    return new NestResponse(this.#response);
  }
}
