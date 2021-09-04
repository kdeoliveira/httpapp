export default class InvalidArgumentException extends Error {
    private readonly type;
    constructor(message?: string);
}
