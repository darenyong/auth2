import path from 'path';
import winston from 'winston';
import moment from 'moment-timezone';
import 'winston-daily-rotate-file';

const { combine, printf } = winston.format;

const consoleTransport = new winston.transports.Console({ colorize: true });

const fileTransport = new (winston.transports.DailyRotateFile)({
  filename: path.join(config.logDir, 'auth-%DATE%.log'),
  maxFiles: '7d',
});

const timezone = 'America/Edmonton';

const options = {
  level: config.level,
  format: combine(
    winston.format.colorize(),
    printf (info => `${new moment().tz(timezone).format()} [${info.level}] ${info.message}`),
  ),
  transports: [consoleTransport, fileTransport],
};

const logger = winston.createLogger(options);

module.exports = logger;
