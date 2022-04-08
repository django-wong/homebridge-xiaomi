/// <reference types="node" />
import EventEmitter from 'events';
export default abstract class AbstractDevice extends EventEmitter {
    protected constructor();
    abstract getProperties(properties: GetPropertyOption[]): Promise<GetPropertyResult[]>;
    abstract setProperties(properties: SetPropertyOption[]): Promise<void>;
    abstract callAction(action: CallActionOption): Promise<void>;
}
