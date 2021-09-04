// import "reflect-metadata"
// import Controller from "@kdeoliveira/ioc/dist/controller";
// import HttpApplication, {BaseController, HttpException} from "./src"

//VERIFICATION MADE BY SNYK:
//- csurf middleware to protect against cross-site request forgery (CSRF).
//- sqlmap tool to detect SQL injection vulnerabilities in your app
//- nmap and sslyze tools to test the configuration of your SSL ciphers, keys

// @Controller({
//     path : "test/"
// })
// //@ts-ignore
// class TestController extends BaseController{
    
//     constructor(public path : string){
//         super();       
//     }
//     protected routing(): void {

//         this.router.get(this.path, (req, res) => {throw new HttpException(400, "Error found")})

//         this.router.get("/test2", (req, res) => {
//             res.send({
//                 "response": "ok"
//             })
//         })
//     }
    
// }




//     const server = new HttpApplication({
//         port: 4000,
//         host: "127.0.0.1",
//         controllers: [TestController],
//         cors: true
//     });
    
    
    
//     server.listen(() => console.log("STARTED"))
