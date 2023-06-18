import { MinerAlgorithm, MinerAlgorithmLocations, MinerWorker } from "./data.types";

export interface minerapi {
    [key: string]: minerapiroute | algorithmapiroute;
    software: minerapiroute;
    uptime: minerapiroute;
    algorithms: algorithmapiroute;
    workers: minerapiroute;
  }
  

export interface minerapiroute {
    location: string;
    value: string;
}


export interface algorithmapiroute extends minerapiroute {
    locations: MinerAlgorithmLocations
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
  