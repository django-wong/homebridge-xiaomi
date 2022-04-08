import AbstractService, {AnyHBService} from "./abstract";

export class TvBox extends AbstractService {
    static urn = 'urn:miot-spec-v2:device:tv-box:0000A020';

    getHbService(): AnyHBService {
        throw new Error('Method not implemented')
    }

    urn(): string {
        return "urn:miot-spec-v2:device:tv-box:0000A020";
    }
}
