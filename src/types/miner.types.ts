export interface minerapi {
    [key: string] : minerapiroute;
    "software": minerapiroute;
    "uptime": minerapiroute;
    "hashrate": minerapiroute;
    "hashrate_unit": minerapiroute
    //"workers": minerapiroute;
}

export interface minerapiroute {
    location: string;
    value: string;
}

export interface apilocation {
    "location": string;
    "value": string;
}

export interface miner {
    name: string
    baseUrl?: string;
    serverHeader?: string;
    x_powered_by_header?: string;
    api: minerapi;
    
};