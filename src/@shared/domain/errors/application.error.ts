export class ApplicationError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
  }
}
