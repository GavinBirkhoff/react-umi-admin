import { Logger, LogLevel } from 'swiftlet-log';

const logger = new Logger({ level: LogLevel.DEBUG, timestamp: true });

export default logger;
