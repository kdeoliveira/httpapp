import "reflect-metadata"
import Controller from "@kdeoliveira/ioc/dist/controller";
import HttpApplication, {BaseController, HttpException} from "./src"



@Controller({
    path : "test/"
})
class TestController extends BaseController{
    
    constructor(public path : string){
        super();       
    }
    protected routing(): void {

        this.router.get(this.path, (req, res) => {throw new HttpException(400, "Error found")})

        this.router.get("/test2", (req, res) => {
            res.send({
                "response": "ok"
            })
        })
    }
    
}




    const server = new HttpApplication({
        port: 4000,
        host: "127.0.0.1",
        controllers: [TestController],
        cors: true
    });
    
    
    
    server.listen(() => console.log("STARTED"))
