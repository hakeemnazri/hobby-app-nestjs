import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ElasticsearchTransport, LogData } from 'winston-elasticsearch';
import { TFormatPrint } from './logger.interface';

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    node: 'http://localhost:9200', //TODO: move to env pleaseeeee, dont be lazy
  },
  indexPrefix: 'app',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transformer: (logData: LogData) => {
    const { meta, timestamp, ...other } = logData;
    return {
      '@timestamp': timestamp,
      ...meta,
      ...other,
    };
  },
};

const elasticsearchTransport = new ElasticsearchTransport(esTransportOpts);

const transports = [
  elasticsearchTransport,
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.printf(
        ({ timestamp, level, message, context, trace }: TFormatPrint) => {
          return `${timestamp} [${context}] ${level}: ${message}${
            trace ? `\n${trace}` : ''
          }`;
        },
      ),
    ),
  }),
  // save logs tp ELK
  new winston.transports.DailyRotateFile({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(), // Add a timestamp to file logs
      winston.format.json(),
    ),
  }),
];
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports,
});
