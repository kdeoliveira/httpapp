"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_exception_1 = require("../exceptions/enum.exception");
const logger_1 = require("../logger");
const errorMiddleware = () => (error, request, response, next) => {
    const status = error.status || 500;
    const name = error.name || enum_exception_1.EXCPETION_STATUS.INTERNAL_ERROR;
    const message = error.message || `An error has occured on file ${error.file}`;
    logger_1.Logger.error(error);
    response.status(status).send({ name: name, status: status, message: message });
};
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.middleware.js.map