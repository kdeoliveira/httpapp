import { ConstructorDecorator, Type } from "./types";


/*
    Inject model class/interface on service object
    @return ConstructorDecorator 
*/
const Service = <T>({model} : {model?: T}) : ConstructorDecorator<Type<object>> => {

    return (target: Type<object>) => {
        if(model){
            Reflect.defineMetadata(target.name, {
                type: "Service",
                name: Object.keys({model})[0],
                value: model
            }, target);
        }
    }
}


export default Service;