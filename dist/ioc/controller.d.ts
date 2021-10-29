import { ConstructorDecorator, Type } from "./types";
declare const ControllerRoute: ({ path }: {
    path: string;
}) => ConstructorDecorator<Type<object>>;
export default ControllerRoute;
