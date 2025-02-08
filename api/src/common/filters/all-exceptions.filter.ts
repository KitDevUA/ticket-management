import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';

interface HttpExceptionResponse {
	message?: string | string[];
	error?: string;
	statusCode?: number;
	[key: string]: any;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();

		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let message = 'Internal Server Error';
		let errors: string[] = [];

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const exceptionResponse =
				exception.getResponse() as HttpExceptionResponse;

			const responseMessage =
				typeof exceptionResponse === 'object'
					? exceptionResponse.message || exceptionResponse.error
					: exceptionResponse;

			message = Array.isArray(responseMessage)
				? responseMessage.join('; ')
				: String(responseMessage);

			errors = Array.isArray(responseMessage)
				? responseMessage
				: [message];
		} else if (exception instanceof Error) {
			message = exception.message;
			errors = [message];
		}

		response.status(status).json({
			success: false,
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			message: message,
			errors: errors,
		});
	}
}
