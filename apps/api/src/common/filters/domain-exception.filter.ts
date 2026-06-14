import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

const DOMAIN_ERROR_STATUS_MAP: Record<string, HttpStatus> = {
  ArticleNotFoundError: HttpStatus.NOT_FOUND,
  ProjectNotFoundError: HttpStatus.NOT_FOUND,
  ContactMessageNotFoundError: HttpStatus.NOT_FOUND,
};

@Catch()
export class DomainExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DomainExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof Error) {
      const status = DOMAIN_ERROR_STATUS_MAP[exception.constructor.name];
      if (status) {
        response.status(status).json({
          statusCode: status,
          error: HttpStatus[status],
          message: exception.message,
        });
        return;
      }
    }

    throw exception;
  }
}
