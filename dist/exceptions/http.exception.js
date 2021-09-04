"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'HTTP_EXCEPTION';
        this.file = __filename;
    }
}
exports.default = HttpException;
//# sourceMappingURL=http.exception.js.map