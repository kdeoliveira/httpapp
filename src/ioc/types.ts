export interface Type<T>{
    new(...args: any[]) : T
}

export type ConstructorDecorator<T> = (target: T) => void;


export type ServiceType = "CONSTRUCTOR" | "SERVICE" | "MIDDLEWARE";



//TEMPORARY
export abstract class Base{
    constructor(public phrase : string){};
    public abstract print() : void;
}
