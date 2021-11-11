import { Base, ConstructorDecorator, ServiceType, Type } from "./types";
import BaseController from "../controller/base.controller";


const ControllerRoute = ({path}: {path : string}) : ConstructorDecorator<Type<object>> => {

    if(path.charAt(0) !== '/')
        path = '/'.concat(path);
    if(path.charAt(path.length-1) !== '/')
        path = path.concat('/');

    //Create decorator that can initialize the baseURI and other secondary parameters for controllers, middlewares and services

    return (target: Type<object>)  => {

        
        //Eventually each shared type/lib should be separated in a unique package
        //Then, BaseController would be equal for any otehr package using this object.prototype
        if((Reflect.getPrototypeOf(target) as any)!.name !== BaseController.name)
            throw new Error("This class must extend a Base controller")


        if(Reflect.hasMetadata(target.name, target)){
            return;
        }

        if(path)
            Reflect.defineMetadata(target.name, {
                type: "Controller",
                name: Object.keys({path})[0],
                value: path
            }, target)

       
            
    }
}

export default ControllerRoute;