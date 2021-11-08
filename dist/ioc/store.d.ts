import { Type } from "./types";
export default class Store extends Map {
    fetch<T>(target: Type<T>): T;
    route(): void;
    release(): void;
}
