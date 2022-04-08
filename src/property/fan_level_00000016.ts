import AbstractProperty from "./abstract";

export class Fan_level_00000016 extends AbstractProperty<number> {
    static urn = 'urn:miot-spec-v2:property:fan-level:00000016';

    urn(): string {
        return Fan_level_00000016.urn;
    }

    init(): void {
        throw new Error("Method not implemented.");
    }
}
