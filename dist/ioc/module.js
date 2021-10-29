"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("./store"));
class Module {
    static container(target) {
        const _injector = new Proxy(new store_1.default(), {
            get: (targetProxy, p, receiver) => {
                if (p === "release" && Reflect.hasOwnMetadata(target.name, target)) {
                    Reflect.deleteMetadata(target.name, target);
                }
                let val = Reflect.get(targetProxy, p);
                return typeof val === "function" ? val.bind(targetProxy) : val;
            }
        });
        const newInstance = _injector.fetch(target);
        Reflect.defineMetadata(newInstance.constructor.name, _injector, target);
        return newInstance;
    }
    static of(target) {
        if (!Reflect.hasMetadata(target.name, target)) {
            throw new Error("This class type has not been injected");
        }
        return Reflect.getMetadata(target.name, target);
    }
}
exports.default = Module;
//# sourceMappingURL=module.js.map