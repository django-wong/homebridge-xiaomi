import AbstractService, { AnyHBService } from "./abstract";
export declare class TvBox extends AbstractService {
    static urn: string;
    getHbService(): AnyHBService;
    urn(): string;
}
