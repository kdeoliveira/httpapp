"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BaseController {
    constructor() {
        this.router = (0, express_1.Router)();
    }
}
exports.default = BaseController;
//# sourceMappingURL=base.controller.js.map