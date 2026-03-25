import { Request, Response, NextFunction } from 'express';

export interface ApiError {
  status: number;
  message: string;
  errors?: any[];
}

export class AppError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', err);

  if (err instanceof AppError) {
    res.status(err.status).json({
      error: err.message,
      ...(err.errors && { errors: err.errors })
    });
    return;
  }

  // Erro genérico
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: err.message
  });
}
