export default class InvalidArgumentException extends Error {
    readonly type: string;
    constructor(message?: string);
}
