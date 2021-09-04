import { Router } from "express";
import { Controller } from "../types/controller.types";


export default abstract class BaseController implements Controller{
    public router : Router;
    // readonly uri : string;

    public readonly abstract path : string;

    constructor(){
        this.router = Router();
        this.routing();
    }

    protected abstract routing() : void;


}