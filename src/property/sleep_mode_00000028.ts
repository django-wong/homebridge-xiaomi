import AbstractProperty from "./abstract";

export class Sleep_mode_00000028 extends AbstractProperty {
    static urn = 'urn:miot-spec-v2:property:sleep-mode:00000028';

    init(): void {
    }

    urn(): string {
        return Sleep_mode_00000028.urn;
    }
}
