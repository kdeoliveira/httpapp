import { NextFunction, Request, Response } from "express";
export declare type Middleware = (...args: any[]) => (x: any, y: Request, w: Response, z: NextFunction) => Promise<void> | void | NextFunction;
