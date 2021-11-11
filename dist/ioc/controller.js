"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = __importDefault(require("../controller/base.controller"));
const ControllerRoute = ({ path }) => {
    if (path.charAt(0) !== '/')
        path = '/'.concat(path);
    if (path.charAt(path.length - 1) !== '/')
        path = path.concat('/');
    //Create decorator that can initialize the baseURI and other secondary parameters for controllers, middlewares and services
    return (target) => {
        //Eventually each shared type/lib should be separated in a unique package
        //Then, BaseController would be equal for any otehr package using this object.prototype
        if (Reflect.getPrototypeOf(target).name !== base_controller_1.default.name)
            throw new Error("This class must extend a Base controller");
        if (Reflect.hasMetadata(target.name, target)) {
            return;
        }
        if (path)
            Reflect.defineMetadata(target.name, {
                type: "Controller",
                name: Object.keys({ path })[0],
                value: path
            }, target);
    };
};
exports.default = ControllerRoute;
//# sourceMappingURL=controller.js.map