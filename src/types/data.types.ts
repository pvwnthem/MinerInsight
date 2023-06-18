import { minerapiroute } from "./miner.types";

export interface standardizedData {
    software?: string;
    uptime?: number;
    algorithms?: MinerAlgorithm[];
    workers?: MinerWorker[];
  }
  

  export interface MinerAlgorithm {
    algorithm?: string;
    pool?: string;
    user?: string;
    hashrate?: number;
    hashrate_unit?: number;
  }

  export interface MinerAlgorithmLocations {
    [key: string]: string;
    algorithm: string;
    pool: string;
    user: string;
    hashrate: string;
    hashrate_unit: string;
  }
  
  export interface MinerWorker {
    id?: number
    // Define properties of the worker object if needed
  }
  