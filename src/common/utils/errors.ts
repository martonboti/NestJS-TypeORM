import { HttpException, HttpStatus, Logger } from '@nestjs/common';

const logger = new Logger();

/**
 * Handle various exception types.
 */
export const handleErrors = (exception: any) => {
    // Catch http exceptions
    if (exception instanceof HttpException) {
        throw new HttpException(exception.message, exception.getStatus());
    }

    logger.error(JSON.stringify(exception), exception.stack);
    throw new HttpException('Unexpected server error.', HttpStatus.INTERNAL_SERVER_ERROR);
};
