import config from './../../config';

export default class Logger {
    logger: HTMLTextAreaElement;

    public static log(key: string, message: string) {
        let logger = <HTMLTextAreaElement> document.getElementById(config.loggerId);
        if (!logger) {
            throw new Error('logger not initialized. Try constructing Logger class');
        } else {
            logger.textContent += '(' + key + '): ' + message + '\n';
        }
    }

    constructor() {
        this.logger = document.createElement('textarea');
        this.logger.id = config.loggerId;
        document.body.appendChild(this.logger);
    }
}