import { Router } from "express";
export interface Controller {
    router: Router;
    readonly uri: string;
}
