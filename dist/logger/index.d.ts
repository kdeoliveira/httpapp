import HttpException from "../exceptions/http.exception";
export declare class Logger {
    static error(error: HttpException): void;
    static debug(message: HttpException | string): void;
}
