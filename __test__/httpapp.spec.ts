import "reflect-metadata";

import HttpApplication, { BaseController, BaseService, ControllerRoute, errorMiddleware, HttpException, Service } from "../src";
import request from "supertest";

interface databaseType {
    id: number;
    val: string;
}

var database : databaseType[] = 
[
    {
        id: 1,
        val: "Nisi in reprehenderit in amet.",
    },
    {
        id: 2,
        val: "Laborum labore Lorem dolor occaecat aliqua incididunt."
    },
    {
        id: 3,
        val: "Culpa quis in amet pariatur id."
    }
];

describe("The Http App class", () => {

    @Service({
        model: database
    })
    //@ts-ignore
    class TestService extends BaseService<databaseType[]>{
        constructor(
            public model : databaseType[]
        ){
            super();
        }


        
        public getAll = () => {
            return this.model;
        }

        public getById = (id: number) => {
            return this.model.filter((x) => {
                return (x.id === id)
            })
        }
    }

    @ControllerRoute({
        path: "test/"
    })
    //@ts-ignore
    class TestController extends BaseController {
        constructor(public path: string, public service : TestService) { super() }

        public routing(): void {
            this.router.get(this.path, (req, res) => { throw new HttpException(400, "Test Error") });
            this.router.get(`/checks`, (req, res) => {
                res.send({
                    "response": "ok"
                })
            })

            this.router.get(this.path+":id", (req, res) => {
                const param = req.params["id"];
                res.status(200).send(
                    this.service.getById(Number(param)) 
                )
            })
        }
    }

    const app = new HttpApplication({
        port: 4000,
        host: "0.0.0.0",
        controllers: [TestController],
        middlewares: {
            resStack: [errorMiddleware()]
        }
    });

    let server = app.getServer();

    describe("Middleware and Controller initialization", () => {
        it("should return expected value", (done) => {
            request(server).get("/checks").then((res) => { expect(res.body).toEqual({ "response": "ok" }); done() })
        });

        it("body should return in json format", (done) => {
            request(server).get("/checks").expect(200).then((res) => {
                expect(res.headers["content-type"]).toContain("application/json;")
                done()
            });
        })

        it("should return proper exception handler", (done) => {
            request(server).get("/test").then((res) => {
                expect(typeof res.body).toBe("object");
                done()
            })
        })
    })

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

    describe("WHen executing request handlers", () => {
        it("should execute service and return value based on params provided", (done) => {
            request(server).get("/test/1").expect(200).then(
                (res) => {
                    expect(res.body).toEqual([database[0]]);
                    done();
                }
            )
        })
    })


})