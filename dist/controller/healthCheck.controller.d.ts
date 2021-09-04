import BaseController from "./base.controller";
export default class HealthCheckController extends BaseController {
    constructor();
    protected routing(uri: string): void;
    private healthStatus;
}
