import { MinerAlgorithm, MinerAlgorithmLocations, MinerWorker, MinerWorkerLocations } from "./data.types";

export interface minerapi {
    [key: string]: minerapiroute | algorithmapiroute | workerapiroute;
    software: minerapiroute;
    start_time: minerapiroute;
    algorithms: algorithmapiroute;
    workers: workerapiroute;
  }
  

export interface minerapiroute {
    location: string;
    value: string;
}


export interface algorithmapiroute extends minerapiroute {
    locations: MinerAlgorithmLocations
}

export interface workerapiroute extends minerapiroute {
  locations: MinerWorkerLocations
}

export interface miner {
    name: string;
    baseUrl?: string;
    serverHeader?: string;
    x_powered_by_header?: string;
    api: minerapi;
    algorithms: MinerAlgorithm[];
    workers: MinerWorker[];
  }
  