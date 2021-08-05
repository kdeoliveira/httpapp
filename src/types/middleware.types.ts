import { NextFunction, Request, Response } from "express";

export type Middleware = (...args: any[]) => (x: any, y: Request, w: Response, z: NextFunction) => void | NextFunction;