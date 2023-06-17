import { miner, minerapi } from "@/types/miner.types"


export class Miner<T extends minerapi> {
    name: string;
    baseUrl: string;
    serverHeader: string | undefined;
    x_powered_by_header: string | undefined;
    api: T;
  
    constructor(name: string, baseUrl: string, api: T, serverHeader?: string, x_powered_by_header?: string) {
      this.name = name;
      this.baseUrl = baseUrl;
      this.serverHeader = serverHeader;
      this.x_powered_by_header = x_powered_by_header;
      this.api = api;
    }

    setBaseUrl (url: string)
    {
        this.baseUrl = url
    }
  }
