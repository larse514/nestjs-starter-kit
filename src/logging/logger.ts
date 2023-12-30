import * as winston from 'winston';

const loggingFormat = () => {
    if (process.env.LOG_FORMAT === 'simple') {
        console.warn('Using simple logging format, this is not recommended for production');
        return winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple()
        );
    } else {
        return winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        );
    }
}

export const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: loggingFormat()
        }),
    ],
});