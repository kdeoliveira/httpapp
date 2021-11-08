import { Router } from "express";
import { Controller } from "../types/controller.types";
export default abstract class BaseController implements Controller {
    router: Router;
    abstract readonly path: string;
    constructor();
    abstract routing(): void;
}
