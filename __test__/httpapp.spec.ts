import "reflect-metadata";

import HttpApplication, { BaseController, ControllerRoute, HttpException } from "../src";
import request from "supertest";


describe("The Http App class", () => {
    @ControllerRoute({
        path: "test/"
    })
    //@ts-ignore
    class TestController extends BaseController {
        constructor(public path: string) { super() }

        protected routing(): void {
            this.router.get(this.path, (req, res) => { throw new HttpException(400, "Test Error") });
            this.router.get(`/checks`, (req, res) => {
                res.send({
                    "response": "ok"
                })
            })
        }
    }

    const app = new HttpApplication({
        port: 4000,
        host: "0.0.0.0",
        controllers: [TestController]
    });

    let server = app.getServer();

    describe("Middleware initialization", () => {
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


})