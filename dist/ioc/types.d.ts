export interface Type<T> {
    new (...args: any[]): T;
}
export declare type ConstructorDecorator<T> = (target: T) => void;
export declare type ServiceType = "CONSTRUCTOR" | "SERVICE" | "MIDDLEWARE";
export declare abstract class Base {
    phrase: string;
    constructor(phrase: string);
    abstract print(): void;
}
