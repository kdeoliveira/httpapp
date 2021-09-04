

export default class InvalidArgumentException extends Error{
    public readonly type : string;
    constructor(message?: string){
        super(message ? message : "Invalid argument type provided");
        this.type = 'INVALID_ARGUMENT_ERROR'
    }

    
    

}