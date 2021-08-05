import HttpApplication, {BaseController, HttpException} from "./src"




class TestController extends BaseController{
    constructor(){
        super({uri: "test"})
    }
    protected routing(uri: string): void {
        this.router.get(uri, (req, res) => {throw new HttpException(400, "Error found")})
    }
    
}

const server = new HttpApplication({
    port: 4000,
    host: "127.0.0.1",
    controllers: [new TestController()],
    cors: true
});



server.listen(() => console.log("STARTED"))