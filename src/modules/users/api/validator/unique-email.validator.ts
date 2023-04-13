import { IUserRepository } from '@app-modules/users/domain/user-repository.interface';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true }) //to validate async
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: IUserRepository) {}

  async validate(email: string): Promise<boolean> {
    return !(await this.userRepository.findByEmail(email));
  }

  defaultMessage?(): string {
    throw new Error('Email Already Registered!');
  }
}

export const UniqueEmail = (validationOptions?: ValidationOptions) => {
  return (object: any, property: string) => {
    registerDecorator({
      propertyName: property,
      target: object.constructor,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
