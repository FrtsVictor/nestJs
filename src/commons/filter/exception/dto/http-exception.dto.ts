export class HttpExceptionDto {
  status: number;
  body: {
    statusCode: number;
    timestamp: string;
    path: string;
    message: string;
  };
}
