import { InfraException } from './infra.exception';

export class DataBaseException extends InfraException {
  constructor(message: string) {
    super(message);
  }
}
