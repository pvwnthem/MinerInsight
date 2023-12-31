import { MinerAlgorithm, MinerAlgorithmLocations, MinerWorker, MinerWorkerLocations } from "./data.types";

export interface minerapi {
  [key: string]: minerapiroute | algorithmapiroute | workerapiroute;
  software: minerapiroute;
  version: minerapiroute;
  start_time: minerapiroute;
  algorithms: algorithmapiroute;
  workers: workerapiroute;
}

export interface minerapiroute {
  location: string;
  value: string;
  override?: string
}
// override should be a valid field of the Miner class

export interface partials {
  algorithms: algorithmpartials;
  workers: workerpartials;
}

export type algorithmpartials = {
  [K in keyof MinerAlgorithm]: partialapiroute ;
} & { [key: string]: partialapiroute  };

export type workerpartials = {
  [K in keyof MinerWorker]: partialapiroute ;
} & { [key: string]: partialapiroute  };

export interface algorithmapiroute extends minerapiroute {
  locations: MinerAlgorithmLocations;
}

export interface workerapiroute extends minerapiroute {
  locations: MinerWorkerLocations;
}

export interface partialapiroute extends minerapiroute {
  index: number
}

export interface miner {
  name: string;
  baseUrl?: string;
  serverHeader?: string;
  x_powered_by_header?: string;
  api: minerapi;
  algorithms: MinerAlgorithm[];
  workers: MinerWorker[];
  partials: partials;
}
