import { Router } from "express";
import { Controller } from "../types/controller.types";
export default abstract class BaseController implements Controller {
    router: Router;
    readonly uri: string;
    constructor({ uri }: {
        uri: string;
    });
    protected abstract routing(uri: string): void;
}
