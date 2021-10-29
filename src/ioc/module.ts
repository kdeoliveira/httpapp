import Store from "./store";
import { Type } from "./types";


export default class Module{

    public static container<T extends object>(target: Type<T>) : T {
        
        const _injector = new Proxy(new Store(), {
            get: (targetProxy, p, receiver) => {
                if(p === "release" && Reflect.hasOwnMetadata(target.name, target)){
                    Reflect.deleteMetadata(target.name, target);
                }

                let val = Reflect.get(targetProxy, p);

                return typeof val === "function" ? val.bind(targetProxy) : val;
            }
        });

        const newInstance = _injector.fetch<T>(target);

        Reflect.defineMetadata(newInstance.constructor.name, _injector, target);
        return newInstance;
    }

    public static of<T extends object>(target: Type<T>) : Store{
        if(!Reflect.hasMetadata(target.name, target)){
            throw new Error("This class type has not been injected")
        }

        return Reflect.getMetadata(target.name, target);
    }
}