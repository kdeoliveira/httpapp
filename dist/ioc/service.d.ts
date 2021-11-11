import { ConstructorDecorator, Type } from "./types";
declare const Service: <T>({ model }: {
    model?: T | undefined;
}) => ConstructorDecorator<Type<object>>;
export default Service;
