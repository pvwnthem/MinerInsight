import { partials } from "./miner.types";

export interface iterable {
  [key: string]: any | undefined
}

export interface standardizedData extends iterable {
  algorithms?: MinerAlgorithm[];
  workers?: MinerWorker[];
  partials?: partials;
}

export interface MinerAlgorithm {
  algorithm?: string;
  pool?: string;
  user?: string;
  hashrate?: number;
  hashrate_unit?: number;
}

export interface MinerAlgorithmLocations {
  algorithm?: string;
  pool?: string;
  user?: string;
  hashrate?: string;
  hashrate_unit?: string;
}

export interface MinerWorkerLocations {
  [key: string]: string;
  id: string;
  name: string;
}

export interface MinerWorker {
  id?: number;
  // Define properties of the worker object if needed
}
