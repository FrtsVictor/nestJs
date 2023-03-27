export class AuthenticatedResponseDto {
  readonly accessToken: string;
  constructor(bearer: string) {
    this.accessToken = bearer;
  }
}
