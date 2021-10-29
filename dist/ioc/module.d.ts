import Store from "./store";
import { Type } from "./types";
export default class Module {
    static container<T extends object>(target: Type<T>): T;
    static of<T extends object>(target: Type<T>): Store;
}
