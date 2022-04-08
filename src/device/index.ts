import { Device as MiotDevice } from '../lib/micloud';

import AirConditioner from './air_conditioner';
import AirFresh from './air_fresh';
import AirFryer from './air_fryer';
import AirMonitor from './air_monitor';
import AirPurifier from './air_purifier';
import Airer from './airer';
import Alertor from './alertor';
import BabyBottleWarmer from './baby_bottle_warmer';
import BathHeater from './bath_heater';
import BeautyInstrument from './beauty_instrument';
import Bed from './bed';
import Camera from './camera';
import CardSwitch from './card_switch';
import CeilingFan from './ceiling_fan';
import Chair from './chair';
import Clock from './clock';
import ClothesDryer from './clothes_dryer';
import CoffeeMachine from './coffee_machine';
import ControlPanel from './control_panel';
import Cooker from './cooker';
import CookingMachine from './cooking_machine';
import Cup from './cup';
import Curtain from './curtain';
import Dehumidifier from './dehumidifier';
import Diffuser from './diffuser';
import Dimmer from './dimmer';
import Dishwasher from './dishwasher';
import Doorbell from './doorbell';
import DrivingRecorder from './driving_recorder';
import Dryer from './dryer';
import ElectricBlanket from './electric_blanket';
import ElectronicValve from './electronic_valve';
import EngravingMachine from './engraving_machine';
import Fan from './fan';
import FishTank from './fish_tank';
import Flowerpot from './flowerpot';
import FootBath from './foot_bath';
import Fridge from './fridge';
import FruitVegetablePurifier from './fruit_vegetable_purifier';
import GarbageCan from './garbage_can';
import GarbageDisposal from './garbage_disposal';
import GasSensor from './gas_sensor';
import Gateway from './gateway';
import GermicidalLamp from './germicidal_lamp';
import HeadUpDisplay from './head_up_display';
import HealthPot from './health_pot';
import Heater from './heater';
import Hood from './hood';
import Humidifier from './humidifier';
import IlluminationSensor from './illumination_sensor';
import InductionCooker from './induction_cooker';
import IntegratedStove from './integrated_stove';
import IrRemoteControl from './ir_remote_control';
import Juicer from './juicer';
import Kettle from './kettle';
import Light from './light';
import MagnetSensor from './magnet_sensor';
import Massage from './massage';
import Massager from './massager';
import MicrowaveOven from './microwave_oven';
import Mirror from './mirror';
import MoppingMachine from './mopping_machine';
import MosquitoDispeller from './mosquito_dispeller';
import MotionSensor from './motion_sensor';
import MotorController from './motor_controller';
import Moxibustion from './moxibustion';
import MultifunctionCookingPot from './multifunction_cooking_pot';
import NightLight from './night_light';
import Outlet from './outlet';
import Oven from './oven';
import PetDrinkingFountain from './pet_drinking_fountain';
import PetFeeder from './pet_feeder';
import Pillow from './pillow';
import PlantMonitor from './plant_monitor';
import PressureCooker from './pressure_cooker';
import Printer from './printer';
import Projector from './projector';
import Relay from './relay';
import RemoteControl from './remote_control';
import Repeater from './repeater';
import RiceBin from './rice_bin';
import Robot from './robot';
import Router from './router';
import Scooter from './scooter';
import SleepMonitor from './sleep_monitor';
import SmokeSensor from './smoke_sensor';
import SoapDispenser from './soap_dispenser';
import Sofa from './sofa';
import Speaker from './speaker';
import Sphygmomanometer from './sphygmomanometer';
import SplitTv from './split_tv';
import StationaryBicycle from './stationary_bicycle';
import Stb from './stb';
import Sterilizer from './sterilizer';
import StoryMachine from './story_machine';
import SubmersionSensor from './submersion_sensor';
import Switch from './switch';
import Table from './table';
import Television from './television';
import TemperatureHumiditySensor from './temperature_humidity_sensor';
import Thermostat from './thermostat';
import Toilet from './toilet';
import Toothbrush from './toothbrush';
import TowelRack from './towel_rack';
import Treadmill from './treadmill';
import TvBox from './tv_box';
import Uwb from './uwb';
import Vacuum from './vacuum';
import VibrationSensor from './vibration_sensor';
import VideoDoorbell from './video_doorbell';
import WalkingPad from './walking_pad';
import Washer from './washer';
import Watch from './watch';
import WatchWinder from './watch_winder';
import WaterDispenser from './water_dispenser';
import WaterHeater from './water_heater';
import WaterPurifier from './water_purifier';
import WaterSoftener from './water_softener';
import WeatherSensor from './weather_sensor';
import WindowOpener from './window_opener';
import WineTank from './wine_tank';

import { instances } from '../spec/instances.json';

const allDeviceDrivers = {
    AirConditioner, AirFresh, AirFryer, AirMonitor, AirPurifier, Airer, Alertor, BabyBottleWarmer, BathHeater, BeautyInstrument, Bed, Camera, CardSwitch, CeilingFan, Chair, Clock, ClothesDryer, CoffeeMachine, ControlPanel, Cooker, CookingMachine, Cup, Curtain, Dehumidifier, Diffuser, Dimmer, Dishwasher, Doorbell, DrivingRecorder, Dryer, ElectricBlanket, ElectronicValve, EngravingMachine, Fan, FishTank, Flowerpot, FootBath, Fridge, FruitVegetablePurifier, GarbageCan, GarbageDisposal, GasSensor, Gateway, GermicidalLamp, HeadUpDisplay, HealthPot, Heater, Hood, Humidifier, IlluminationSensor, InductionCooker, IntegratedStove, IrRemoteControl, Juicer, Kettle, Light, MagnetSensor, Massage, Massager, MicrowaveOven, Mirror, MoppingMachine, MosquitoDispeller, MotionSensor, MotorController, Moxibustion, MultifunctionCookingPot, NightLight, Outlet, Oven, PetDrinkingFountain, PetFeeder, Pillow, PlantMonitor, PressureCooker, Printer, Projector, Relay, RemoteControl, Repeater, RiceBin, Robot, Router, Scooter, SleepMonitor, SmokeSensor, SoapDispenser, Sofa, Speaker, Sphygmomanometer, SplitTv, StationaryBicycle, Stb, Sterilizer, StoryMachine, SubmersionSensor, Switch, Table, Television, TemperatureHumiditySensor, Thermostat, Toilet, Toothbrush, TowelRack, Treadmill, TvBox, Uwb, Vacuum, VibrationSensor, VideoDoorbell, WalkingPad, Washer, Watch, WatchWinder, WaterDispenser, WaterHeater, WaterPurifier, WaterSoftener, WeatherSensor, WindowOpener, WineTank
};

export const Devices = allDeviceDrivers;

export function findDriverForMiotDevice(device: MiotDevice) {
    const instance = instances.find(instance => {
        return instance.model == device.model;
    });

    if (!instance) {
        return;
    }

    return Object.values(allDeviceDrivers).find((Driver) => {
        return Driver.type == instance.type.split(':').slice(0, 5).join(':');
    });
}
