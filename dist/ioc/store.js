"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Store extends Map {
    fetch(target) {
        var tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        //A new instance will be generated for each arguments extracted from design:paramtypes
        var instances = tokens.map(x => this.fetch(x));
        const classInstance = this.get(target);
        if (classInstance)
            return classInstance;
        const newClassInstance = new target(...instances);
        if (Reflect.hasMetadata(target.name, target)) {
            const meta = Reflect.getMetadata(target.name, target);
            //Adding data members to contained class
            Reflect.defineProperty(newClassInstance, meta.name, {
                value: meta.value,
                writable: true,
                enumerable: true
            });
            // Reflect.defineProperty(target.prototype, "local", {
            //     value: meta.value,
            //     writable: true
            // })
            //Writing realease method to Controllers class
            if (!Reflect.has(target, "release") && meta.type === "Controller") {
                Object.defineProperty(newClassInstance, "release", {
                    value: () => "release",
                    writable: true,
                    enumerable: false
                });
            }
        }
        this.set(target, newClassInstance);
        return newClassInstance;
    }
    route() {
        this.forEach((values) => {
            if (Reflect.has(values, "routing") && typeof Reflect.get(values, "routing") === "function") {
                Reflect.apply(values["routing"], values, []);
            }
        });
    }
    release() {
        this.forEach((values) => {
            if (Reflect.has(values, "release") && typeof Reflect.get(values, "release") === "function") {
                Reflect.apply(values["release"], null, []);
            }
        });
        this.clear();
    }
}
exports.default = Store;
//# sourceMappingURL=store.js.map