export class JwtResponseDto {
  readonly accessToken: string;
  constructor(bearer: string) {
    this.accessToken = bearer;
  }
}
