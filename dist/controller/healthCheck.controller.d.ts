import BaseController from "./base.controller";
export default class HealthCheckController extends BaseController {
    path: string;
    constructor(path: string);
    protected routing(): void;
    private healthStatus;
}
