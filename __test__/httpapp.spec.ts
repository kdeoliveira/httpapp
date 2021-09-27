import {Controller} from "@kdeoliveira/ioc";
import "reflect-metadata";
import HttpApplication, { BaseController, HttpException } from "../src";
import request from "supertest";


describe("The Http App class", () => {
    @Controller({
        path: "test/"
    })
    //@ts-ignore
    class TestController extends BaseController {
        constructor(public path: string) { super() }

        protected routing(): void {
            this.router.get(this.path, (req, res) => { throw new HttpException(400, "Test Error") });
            this.router.get(`${this.path}/2`, (req, res) => {
                res.send({
                    "response": "ok"
                })
            })
        }
    }

    let server = new HttpApplication({
        port: 4000,
        host: "0.0.0.0",
        controllers: [TestController]
    }).getServer();

    describe("Initial test page", () => {
        it("should return status OK", (done) => {
            request(server).get("/.healthCheck").expect(200).then(
                (res) => {
                    expect(res.text).toEqual("OK")
                    done();
                }
            )
        })
    })

    describe("When executing get on designed paths", () => {

        it("should return expected output", (done) => {
            const expectedValue = {
                name: "HTTP_EXCEPTION", 
                status: 400, 
                message: "Test Error"
            };

            request(server).get("/test").expect(400).then(
                (res) => {

                    expect(res.body).toEqual(expectedValue)
                    done();
                }
            )
        })
    })


})