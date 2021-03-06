import "reflect-metadata";
import { ControllerRoute, Module, Service,BaseController, BaseService } from "../src";
import Store from "../src/ioc/store";


@Service({
    model: "whatever"
})
//@ts-ignore
class TestService extends BaseService<string>{
    constructor(public model : string){
        super();
    } 

    thisClass(){
        return "TestService:"+this.model;
    }
    
}

@ControllerRoute({
    path: "/posts"
})
//@ts-ignore
class TestController extends BaseController {
    constructor(public service: TestService, public path : string){
        super();
    }

    public routing(){
        console.log("Routing has been called ||", this.service.thisClass());
    }
}


describe("The Module Decorator on HttpApp", () => {
    let container : any;


    // describe("IoC applied on general context", () => {
    //     beforeAll(() => {
    //         container = Module.container()
    //     })
    // })
    
    describe("IoC applied on the http app context", () => {
        beforeAll(() => {
            container = Module.container(TestController);
        })
        
        it("should be a new instance of TestController", ()=> {
            expect(container).toBeInstanceOf(TestController);
        })
        
        it("should return the path value as defined in decorator", () => {
            expect(container.path).toEqual("/posts/");
        })
    
        it("should create a new instance of decorated service", () => {
    
            expect(container.service).toBeDefined();
        })

        describe("Storage of container's instances", () => {
            let _injector : Store;

            beforeAll(() => {
                _injector = Module.of(TestController);
            })

            it("should route all controlller's instances", () => {


                const spy = jest.spyOn(container, "routing");
                
                _injector.route();
    
                expect(spy).toBeCalled();
    
                spy.mockReset();
                spy.mockRestore();
                
            })


            it("should contain the Store inside metadata", () => {
                expect(_injector.get(TestController)).toBeDefined();
            })
    
            it("should release all its instances", () => {


                const spy = jest.spyOn(container, "release");
                
                _injector.release();

                expect(spy).toBeCalled();

                spy.mockReset();
                spy.mockRestore();
                
            })
        })
    });
})