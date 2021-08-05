import { Router } from "express";
import { Controller } from "types/controller.types";


export default abstract class BaseController implements Controller{
    public router : Router;
    public readonly uri : string;

    constructor({uri}: {uri : string}){
        this.router = Router();
        this.uri = uri.charAt(0) === '/' ? uri : "/".concat(uri);
        this.routing(this.uri);
    }

    protected abstract routing(uri : string) : void;


}