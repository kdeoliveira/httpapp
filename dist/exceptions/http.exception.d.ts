import { EXCPETION_STATUS } from "./enum.exception";
export default class HttpException extends Error {
    status: number | EXCPETION_STATUS;
    file: string;
    constructor(status: number | EXCPETION_STATUS, message: string);
}
