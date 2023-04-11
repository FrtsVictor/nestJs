export class JwtResponseDto {
  readonly token: string;
  constructor(bearer: string) {
    this.token = bearer;
  }
}
