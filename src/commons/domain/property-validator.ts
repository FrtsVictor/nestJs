import { InvalidDomainException } from './invalid-domain.exception';

export const verifyStringSize = (
  str: string,
  size: number,
  propName: string,
) => {
  if (!str || str.length < size)
    throw new InvalidDomainException(`Invalid entity property: ${propName}`);
};

export const verifyNumberPositive = (number: number, propName: string) => {
  if (!number || number <= 0)
    throw new InvalidDomainException(`Invalid entity property: ${propName}`);
};

export const verifyEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!regex.test(email))
    throw new InvalidDomainException(`Invalid entity property: ${email}`);
};
