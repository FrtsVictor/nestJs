import { DomainException } from './domain.exception';

export class InvalidDomainException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
