import { EXCPETION_STATUS } from "./enum.exception";


export default class HttpException extends Error{
    public status : number | EXCPETION_STATUS;
    public file : string;

    constructor(status: number | EXCPETION_STATUS, message: string){
        super(message);
        this.status = status;
        this.name = 'HTTP_EXCEPTION'
        this.file = __filename;
    }
}