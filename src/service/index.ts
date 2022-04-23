import InstanceService = MiIOSpec.InstanceService;

import {AirConditioner} from "./air_conditioner";
import {DeviceInformation} from "./device_information";
import {Light}  from "./light";
import { FanControl } from "./fan_control";
import { Environment } from "./environment";
import { Battery } from "./battery";
import { AirPurifier } from "./air_purifier";
import {Airer} from "./airer";
import {Speaker} from "./speaker";
import {Service} from "./abstract";
import {Humidifier} from "./humidifier";


const Services: Service[] = [
    DeviceInformation, AirConditioner, Light, Environment, FanControl, Battery, AirPurifier, Airer, Speaker, Humidifier
]

function isEqual(left: any, right: any) {
    return left === right;
}

export function findService(service: InstanceService) {
    return Services.find(
        (S) => {
            return isEqual(S.urn, service.type.split(':').splice(0, 5).join(':'))
        }
    )
}


export function findServiceByType(type: string) {
    return Services.find(
        (S) => {
            return S.urn === type.split(':').splice(0, 5).join(':');
        }
    )
}
