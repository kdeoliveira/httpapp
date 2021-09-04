"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseController {
    constructor({ uri }) {
        this.router = express_1.Router();
        this.uri = uri.charAt(0) === '/' ? uri : "/".concat(uri);
        this.routing(this.uri);
    }
}
exports.default = BaseController;
//# sourceMappingURL=base.controller.js.map