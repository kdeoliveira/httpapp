"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    Inject model class/interface on service object
    @return ConstructorDecorator
*/
const Service = ({ model }) => {
    return (target) => {
        if (model) {
            Reflect.defineMetadata(target.name, {
                type: "Service",
                name: Object.keys({ model })[0],
                value: model
            }, target);
        }
    };
};
exports.default = Service;
//# sourceMappingURL=service.js.map