import { Router } from "express";
import { Controller } from "../types/controller.types";


export default abstract class BaseController implements Controller{
    public router : Router;

    public readonly abstract path : string;

    constructor(){
        this.router = Router();
    }

    public abstract routing() : void;


}