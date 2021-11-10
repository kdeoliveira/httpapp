


export default abstract class BaseService<T>{
    public abstract model : T;
    protected dataSource : any | undefined;

    //Constructor used only to initialize data source if rqeuired
    constructor(dataSource?: any){
        this.dataSource = dataSource;
    }

    //Note that for any express based handler, arrow function required

}