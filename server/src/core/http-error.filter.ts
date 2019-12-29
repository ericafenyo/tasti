import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    let status;
    let error;
    if (exception.getStatus) {
      status = exception.getStatus();
      error = exception.message;
    }

    Logger.error(
      `
      ${request.method},
      ${request.url},
      `,
      JSON.stringify(exception.message),
      'ErrorFilter'
    );

    response.status(status).json({
      ...error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      infoURL: 'https://docs.ericafenyo.com/tasti/#status-codes'
    });
  }
}
