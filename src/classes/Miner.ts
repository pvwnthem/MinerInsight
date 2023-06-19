import { MinerAlgorithm, MinerWorker } from "@/types/data.types";
import { miner, minerapi, minerapiroute, partials } from "@/types/miner.types"


export class Miner<T extends minerapi> {
    name: string;
    baseUrl: string;
    serverHeader: string | undefined;
    x_powered_by_header: string | undefined;
    identifier: minerapiroute | undefined;
    algorithms: MinerAlgorithm[]
    workers: MinerWorker[]
    partials: partials;
    api: T;
  
    constructor(name: string, baseUrl: string, api: T, partials: partials, serverHeader?: string, x_powered_by_header?: string, identifier?: minerapiroute) {
      this.name = name;
      this.baseUrl = baseUrl;
      this.serverHeader = serverHeader;
      this.x_powered_by_header = x_powered_by_header;
      this.algorithms = []
      this.workers = []
      this.identifier = identifier
      this.partials = partials
      this.api = api;
    }

    setBaseUrl (url: string)
    {
        this.baseUrl = url
    }
  }
