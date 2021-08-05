import fs from "fs";
import HttpException  from "../exceptions/http.exception";
import { TransformableInfo } from "logform";
import winston, { Logform } from "winston";
import winstonDaily from "winston-daily-rotate-file";


const datePattern = 'YY-MM-DD';
const timePattern = 'HH:mm:SS';



const format = winston.format.printf(
    ({ timestamp, level, message }: TransformableInfo) => `${level.toUpperCase()} at ${timestamp} \n${message}`
);

const log = (directory : string) => winston.createLogger({
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({
            format: `${datePattern} ${timePattern}`
        }),
        format
    ),
    transports: [
        new winstonDaily({
            level: "error",
            datePattern,
            dirname: directory,
            filename: '%DATE%.error.log',
            maxFiles: 30,
            json: false,
            handleExceptions: true,
            handleRejections: true,
            zippedArchive: true
        }),
        new winstonDaily({
            level: 'debug',
            datePattern,
            dirname: directory,
            filename: `%DATE%.debug.log`,
            maxFiles: 30,

            json: false,
            zippedArchive: true
        }),

        new winston.transports.Console({
            level: 'silly',
            format: winston.format.combine(winston.format.splat(), winston.format.colorize({
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



export class Logger {
    
    public static error(error : HttpException){
        log("logs/error").error(`>>${error.name}<< ${error.status} : ${error.message}`)
    }

    public static debug(message : HttpException | string){
        log("logs/debug").debug(
            message instanceof HttpException ? `>>${message.name}<< ${message.status} : ${message.message}` : message
        )
    }

}



