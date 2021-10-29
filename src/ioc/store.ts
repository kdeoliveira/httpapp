import { Type } from "./types";

export default class Store extends Map{
    public fetch<T>(target: Type<T>) : T{

        var tokens : Type<T>[] = Reflect.getMetadata("design:paramtypes", target) || [];

        //A new instance will be generated for each arguments extracted from design:paramtypes
        var instances = tokens.map(x => this.fetch<T>(x));



        const classInstance = this.get(target);
        if(classInstance)
            return classInstance;

        if(Reflect.hasMetadata(target.name, target)){
            const meta = Reflect.getMetadata(target.name, target);

            Reflect.defineProperty(target.prototype, meta.name, {
                value: meta.value,
                writable: true
            })

            // Reflect.defineProperty(target.prototype, "local", {
            //     value: meta.value,
            //     writable: true
            // })

        }

        const newClassInstance = new target(...instances);
        if(Reflect.hasMetadata(target.name, target)){
            
            const meta = Reflect.getMetadata(target.name, target);

            if(!Reflect.has(target, "release") && meta.type === "Controller"){
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


    public release(): void{
        this.forEach((values) => {
            if(Reflect.has(values, "release") && typeof Reflect.get(values, "release") === "function"){
                Reflect.apply(values["release"], null, []);
            }
        })

        this.clear();
    }
}