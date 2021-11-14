"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { ApplicationConfig } from "types/application.types";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_1 = require("http");
const healthCheck_controller_1 = __importDefault(require("../controller/healthCheck.controller"));
const invalidArgument_exception_1 = __importDefault(require("../exceptions/invalidArgument.exception"));
const errorMiddleware_middleware_1 = __importDefault(require("../middleware/errorMiddleware.middleware"));
const logger_1 = require("../logger");
const helmet_1 = __importDefault(require("helmet"));
const module_1 = __importDefault(require("../ioc/module"));
class HttpApplication {
    constructor(config) {
        if (!config)
            throw new invalidArgument_exception_1.default();
        const { app, port, host, path, cors, controllers, middlewares, contentSecurityPolicy } = config;
        this.app = app ? app : (0, express_1.default)();
        this.port = port;
        this.host = host;
        this.path = path ? () => path : () => "/";
        this.app.use(contentSecurityPolicy ? (0, helmet_1.default)({
            contentSecurityPolicy
        }) :
            (0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
        if (cors === true) {
            this.app.use((0, cors_1.default)());
        }
        else if (cors && cors instanceof Object) {
            this.app.use((0, cors_1.default)(cors));
        }
        if (!Array.isArray(controllers))
            throw new invalidArgument_exception_1.default("Controlller must be provided as an array");
        if (middlewares && !Array.isArray(middlewares))
            throw new invalidArgument_exception_1.default("Middlewares must be provided as an array");
        this.initializeMiddlwares(middlewares);
        this.initializeControllers(controllers);
        //Note that this middleware must be last since it depends on occasional next(new Exception()) call
        this.app.use((0, errorMiddleware_middleware_1.default)());
        this.server = (0, http_1.createServer)(this.app);
    }
    initializeControllers(controllers) {
        controllers.push(healthCheck_controller_1.default);
        let instances = [];
        controllers.forEach((x) => {
            instances.push(module_1.default.container(x));
        });
        for (var e of instances) {
            e.routing();
        }
        instances.forEach(x => this.app.use(this.path(), x.router));
    }
    initializeMiddlwares(middlewares) {
        if (middlewares)
            middlewares.forEach(x => this.app.use(x));
    }
    getServer() {
        return this.server;
    }
    getApplication() {
        return this.app;
    }
    listen(callback) {
        logger_1.Logger.debug(`HTTP Application has started on port ${this.port}`);
        this.server.listen(this.port, this.host, callback);
    }
}
exports.default = HttpApplication;
//# sourceMappingURL=http.application.js.map