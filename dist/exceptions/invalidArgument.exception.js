"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidArgumentException extends Error {
    constructor(message) {
        super(message ? message : "Invalid argument type provided");
        this.type = 'INVALID_ARGUMENT_ERROR';
    }
}
exports.default = InvalidArgumentException;
//# sourceMappingURL=invalidArgument.exception.js.map