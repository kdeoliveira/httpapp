"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const http_exception_1 = __importDefault(require("../exceptions/http.exception"));
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const datePattern = 'YY-MM-DD';
const timePattern = 'HH:mm:SS';
const format = winston_1.default.format.printf(({ timestamp, level, message }) => `${level.toUpperCase()} at ${timestamp} \n${message}`);
const log = winston_1.default.createLogger({
    levels: winston_1.default.config.npm.levels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: `${datePattern} ${timePattern}`
    }), format),
    transports: [
        new winston_daily_rotate_file_1.default({
            level: "error",
            datePattern,
            dirname: "logs/error",
            filename: '%DATE%.error.log',
            maxFiles: 30,
            json: false,
            handleExceptions: true,
            handleRejections: true,
            zippedArchive: true
        }),
        new winston_daily_rotate_file_1.default({
            level: 'debug',
            datePattern,
            dirname: "logs/debug",
            filename: `%DATE%.debug.log`,
            maxFiles: 30,
            json: false,
            zippedArchive: true
        }),
        new winston_1.default.transports.Console({
            level: 'silly',
            format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.colorize({
                level: true,
                all: true,
                colors: {
                    error: 'red',
                    debug: 'blue',
                    info: 'white'
                }
            }))
        })
    ]
});
class Logger {
    static error(error) {
        log.error(`>>${error.name}<< ${error.status} : ${error.message}`);
    }
    static debug(message) {
        log.debug(message instanceof http_exception_1.default ? `>>${message.name}<< ${message.status} : ${message.message}` : message);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=index.js.map