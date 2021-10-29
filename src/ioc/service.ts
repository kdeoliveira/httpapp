import { ConstructorDecorator, Type } from "./types";



const Service = () : ConstructorDecorator<Type<object>> => {

    return (target: Type<object>) => {
        
    }
}


export default Service;