export default abstract class BaseService<T> {
    abstract model: T;
    protected dataSource: any | undefined;
    constructor(dataSource?: any);
}
