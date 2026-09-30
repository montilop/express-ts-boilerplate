export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public override readonly message: string,
    public readonly isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg: string): AppError {
    return new AppError(400, msg);
  }

  static unauthorized(msg = 'Не авторизован'): AppError {
    return new AppError(401, msg);
  }

  static forbidden(msg = 'Доступ запрещен'): AppError {
    return new AppError(403, msg);
  }

  static notFound(msg = 'Ресурс не найден'): AppError {
    return new AppError(404, msg);
  }

  static internal(msg = 'Внутренняя ошибка сервера'): AppError {
    return new AppError(500, msg, false);
  }
}