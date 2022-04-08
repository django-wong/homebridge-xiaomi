"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDriverForMiotDevice = exports.Devices = void 0;
const air_conditioner_1 = __importDefault(require("./air_conditioner"));
const air_fresh_1 = __importDefault(require("./air_fresh"));
const air_fryer_1 = __importDefault(require("./air_fryer"));
const air_monitor_1 = __importDefault(require("./air_monitor"));
const air_purifier_1 = __importDefault(require("./air_purifier"));
const airer_1 = __importDefault(require("./airer"));
const alertor_1 = __importDefault(require("./alertor"));
const baby_bottle_warmer_1 = __importDefault(require("./baby_bottle_warmer"));
const bath_heater_1 = __importDefault(require("./bath_heater"));
const beauty_instrument_1 = __importDefault(require("./beauty_instrument"));
const bed_1 = __importDefault(require("./bed"));
const camera_1 = __importDefault(require("./camera"));
const card_switch_1 = __importDefault(require("./card_switch"));
const ceiling_fan_1 = __importDefault(require("./ceiling_fan"));
const chair_1 = __importDefault(require("./chair"));
const clock_1 = __importDefault(require("./clock"));
const clothes_dryer_1 = __importDefault(require("./clothes_dryer"));
const coffee_machine_1 = __importDefault(require("./coffee_machine"));
const control_panel_1 = __importDefault(require("./control_panel"));
const cooker_1 = __importDefault(require("./cooker"));
const cooking_machine_1 = __importDefault(require("./cooking_machine"));
const cup_1 = __importDefault(require("./cup"));
const curtain_1 = __importDefault(require("./curtain"));
const dehumidifier_1 = __importDefault(require("./dehumidifier"));
const diffuser_1 = __importDefault(require("./diffuser"));
const dimmer_1 = __importDefault(require("./dimmer"));
const dishwasher_1 = __importDefault(require("./dishwasher"));
const doorbell_1 = __importDefault(require("./doorbell"));
const driving_recorder_1 = __importDefault(require("./driving_recorder"));
const dryer_1 = __importDefault(require("./dryer"));
const electric_blanket_1 = __importDefault(require("./electric_blanket"));
const electronic_valve_1 = __importDefault(require("./electronic_valve"));
const engraving_machine_1 = __importDefault(require("./engraving_machine"));
const fan_1 = __importDefault(require("./fan"));
const fish_tank_1 = __importDefault(require("./fish_tank"));
const flowerpot_1 = __importDefault(require("./flowerpot"));
const foot_bath_1 = __importDefault(require("./foot_bath"));
const fridge_1 = __importDefault(require("./fridge"));
const fruit_vegetable_purifier_1 = __importDefault(require("./fruit_vegetable_purifier"));
const garbage_can_1 = __importDefault(require("./garbage_can"));
const garbage_disposal_1 = __importDefault(require("./garbage_disposal"));
const gas_sensor_1 = __importDefault(require("./gas_sensor"));
const gateway_1 = __importDefault(require("./gateway"));
const germicidal_lamp_1 = __importDefault(require("./germicidal_lamp"));
const head_up_display_1 = __importDefault(require("./head_up_display"));
const health_pot_1 = __importDefault(require("./health_pot"));
const heater_1 = __importDefault(require("./heater"));
const hood_1 = __importDefault(require("./hood"));
const humidifier_1 = __importDefault(require("./humidifier"));
const illumination_sensor_1 = __importDefault(require("./illumination_sensor"));
const induction_cooker_1 = __importDefault(require("./induction_cooker"));
const integrated_stove_1 = __importDefault(require("./integrated_stove"));
const ir_remote_control_1 = __importDefault(require("./ir_remote_control"));
const juicer_1 = __importDefault(require("./juicer"));
const kettle_1 = __importDefault(require("./kettle"));
const light_1 = __importDefault(require("./light"));
const magnet_sensor_1 = __importDefault(require("./magnet_sensor"));
const massage_1 = __importDefault(require("./massage"));
const massager_1 = __importDefault(require("./massager"));
const microwave_oven_1 = __importDefault(require("./microwave_oven"));
const mirror_1 = __importDefault(require("./mirror"));
const mopping_machine_1 = __importDefault(require("./mopping_machine"));
const mosquito_dispeller_1 = __importDefault(require("./mosquito_dispeller"));
const motion_sensor_1 = __importDefault(require("./motion_sensor"));
const motor_controller_1 = __importDefault(require("./motor_controller"));
const moxibustion_1 = __importDefault(require("./moxibustion"));
const multifunction_cooking_pot_1 = __importDefault(require("./multifunction_cooking_pot"));
const night_light_1 = __importDefault(require("./night_light"));
const outlet_1 = __importDefault(require("./outlet"));
const oven_1 = __importDefault(require("./oven"));
const pet_drinking_fountain_1 = __importDefault(require("./pet_drinking_fountain"));
const pet_feeder_1 = __importDefault(require("./pet_feeder"));
const pillow_1 = __importDefault(require("./pillow"));
const plant_monitor_1 = __importDefault(require("./plant_monitor"));
const pressure_cooker_1 = __importDefault(require("./pressure_cooker"));
const printer_1 = __importDefault(require("./printer"));
const projector_1 = __importDefault(require("./projector"));
const relay_1 = __importDefault(require("./relay"));
const remote_control_1 = __importDefault(require("./remote_control"));
const repeater_1 = __importDefault(require("./repeater"));
const rice_bin_1 = __importDefault(require("./rice_bin"));
const robot_1 = __importDefault(require("./robot"));
const router_1 = __importDefault(require("./router"));
const scooter_1 = __importDefault(require("./scooter"));
const sleep_monitor_1 = __importDefault(require("./sleep_monitor"));
const smoke_sensor_1 = __importDefault(require("./smoke_sensor"));
const soap_dispenser_1 = __importDefault(require("./soap_dispenser"));
const sofa_1 = __importDefault(require("./sofa"));
const speaker_1 = __importDefault(require("./speaker"));
const sphygmomanometer_1 = __importDefault(require("./sphygmomanometer"));
const split_tv_1 = __importDefault(require("./split_tv"));
const stationary_bicycle_1 = __importDefault(require("./stationary_bicycle"));
const stb_1 = __importDefault(require("./stb"));
const sterilizer_1 = __importDefault(require("./sterilizer"));
const story_machine_1 = __importDefault(require("./story_machine"));
const submersion_sensor_1 = __importDefault(require("./submersion_sensor"));
const switch_1 = __importDefault(require("./switch"));
const table_1 = __importDefault(require("./table"));
const television_1 = __importDefault(require("./television"));
const temperature_humidity_sensor_1 = __importDefault(require("./temperature_humidity_sensor"));
const thermostat_1 = __importDefault(require("./thermostat"));
const toilet_1 = __importDefault(require("./toilet"));
const toothbrush_1 = __importDefault(require("./toothbrush"));
const towel_rack_1 = __importDefault(require("./towel_rack"));
const treadmill_1 = __importDefault(require("./treadmill"));
const tv_box_1 = __importDefault(require("./tv_box"));
const uwb_1 = __importDefault(require("./uwb"));
const vacuum_1 = __importDefault(require("./vacuum"));
const vibration_sensor_1 = __importDefault(require("./vibration_sensor"));
const video_doorbell_1 = __importDefault(require("./video_doorbell"));
const walking_pad_1 = __importDefault(require("./walking_pad"));
const washer_1 = __importDefault(require("./washer"));
const watch_1 = __importDefault(require("./watch"));
const watch_winder_1 = __importDefault(require("./watch_winder"));
const water_dispenser_1 = __importDefault(require("./water_dispenser"));
const water_heater_1 = __importDefault(require("./water_heater"));
const water_purifier_1 = __importDefault(require("./water_purifier"));
const water_softener_1 = __importDefault(require("./water_softener"));
const weather_sensor_1 = __importDefault(require("./weather_sensor"));
const window_opener_1 = __importDefault(require("./window_opener"));
const wine_tank_1 = __importDefault(require("./wine_tank"));
const instances_json_1 = require("../spec/instances.json");
const allDeviceDrivers = {
    AirConditioner: air_conditioner_1.default, AirFresh: air_fresh_1.default, AirFryer: air_fryer_1.default, AirMonitor: air_monitor_1.default, AirPurifier: air_purifier_1.default, Airer: airer_1.default, Alertor: alertor_1.default, BabyBottleWarmer: baby_bottle_warmer_1.default, BathHeater: bath_heater_1.default, BeautyInstrument: beauty_instrument_1.default, Bed: bed_1.default, Camera: camera_1.default, CardSwitch: card_switch_1.default, CeilingFan: ceiling_fan_1.default, Chair: chair_1.default, Clock: clock_1.default, ClothesDryer: clothes_dryer_1.default, CoffeeMachine: coffee_machine_1.default, ControlPanel: control_panel_1.default, Cooker: cooker_1.default, CookingMachine: cooking_machine_1.default, Cup: cup_1.default, Curtain: curtain_1.default, Dehumidifier: dehumidifier_1.default, Diffuser: diffuser_1.default, Dimmer: dimmer_1.default, Dishwasher: dishwasher_1.default, Doorbell: doorbell_1.default, DrivingRecorder: driving_recorder_1.default, Dryer: dryer_1.default, ElectricBlanket: electric_blanket_1.default, ElectronicValve: electronic_valve_1.default, EngravingMachine: engraving_machine_1.default, Fan: fan_1.default, FishTank: fish_tank_1.default, Flowerpot: flowerpot_1.default, FootBath: foot_bath_1.default, Fridge: fridge_1.default, FruitVegetablePurifier: fruit_vegetable_purifier_1.default, GarbageCan: garbage_can_1.default, GarbageDisposal: garbage_disposal_1.default, GasSensor: gas_sensor_1.default, Gateway: gateway_1.default, GermicidalLamp: germicidal_lamp_1.default, HeadUpDisplay: head_up_display_1.default, HealthPot: health_pot_1.default, Heater: heater_1.default, Hood: hood_1.default, Humidifier: humidifier_1.default, IlluminationSensor: illumination_sensor_1.default, InductionCooker: induction_cooker_1.default, IntegratedStove: integrated_stove_1.default, IrRemoteControl: ir_remote_control_1.default, Juicer: juicer_1.default, Kettle: kettle_1.default, Light: light_1.default, MagnetSensor: magnet_sensor_1.default, Massage: massage_1.default, Massager: massager_1.default, MicrowaveOven: microwave_oven_1.default, Mirror: mirror_1.default, MoppingMachine: mopping_machine_1.default, MosquitoDispeller: mosquito_dispeller_1.default, MotionSensor: motion_sensor_1.default, MotorController: motor_controller_1.default, Moxibustion: moxibustion_1.default, MultifunctionCookingPot: multifunction_cooking_pot_1.default, NightLight: night_light_1.default, Outlet: outlet_1.default, Oven: oven_1.default, PetDrinkingFountain: pet_drinking_fountain_1.default, PetFeeder: pet_feeder_1.default, Pillow: pillow_1.default, PlantMonitor: plant_monitor_1.default, PressureCooker: pressure_cooker_1.default, Printer: printer_1.default, Projector: projector_1.default, Relay: relay_1.default, RemoteControl: remote_control_1.default, Repeater: repeater_1.default, RiceBin: rice_bin_1.default, Robot: robot_1.default, Router: router_1.default, Scooter: scooter_1.default, SleepMonitor: sleep_monitor_1.default, SmokeSensor: smoke_sensor_1.default, SoapDispenser: soap_dispenser_1.default, Sofa: sofa_1.default, Speaker: speaker_1.default, Sphygmomanometer: sphygmomanometer_1.default, SplitTv: split_tv_1.default, StationaryBicycle: stationary_bicycle_1.default, Stb: stb_1.default, Sterilizer: sterilizer_1.default, StoryMachine: story_machine_1.default, SubmersionSensor: submersion_sensor_1.default, Switch: switch_1.default, Table: table_1.default, Television: television_1.default, TemperatureHumiditySensor: temperature_humidity_sensor_1.default, Thermostat: thermostat_1.default, Toilet: toilet_1.default, Toothbrush: toothbrush_1.default, TowelRack: towel_rack_1.default, Treadmill: treadmill_1.default, TvBox: tv_box_1.default, Uwb: uwb_1.default, Vacuum: vacuum_1.default, VibrationSensor: vibration_sensor_1.default, VideoDoorbell: video_doorbell_1.default, WalkingPad: walking_pad_1.default, Washer: washer_1.default, Watch: watch_1.default, WatchWinder: watch_winder_1.default, WaterDispenser: water_dispenser_1.default, WaterHeater: water_heater_1.default, WaterPurifier: water_purifier_1.default, WaterSoftener: water_softener_1.default, WeatherSensor: weather_sensor_1.default, WindowOpener: window_opener_1.default, WineTank: wine_tank_1.default
};
exports.Devices = allDeviceDrivers;
function findDriverForMiotDevice(device) {
    const instance = instances_json_1.instances.find(instance => {
        return instance.model == device.model;
    });
    if (!instance) {
        return;
    }
    return Object.values(allDeviceDrivers).find((Driver) => {
        return Driver.type == instance.type.split(':').slice(0, 5).join(':');
    });
}
exports.findDriverForMiotDevice = findDriverForMiotDevice;
