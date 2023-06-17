export interface minerapi {
    "workers": {
        "location": string;
        "value": string;
    };
}

export interface apilocation {
    "location": string;
    "value": string;
}

export interface miner {
    name: string
    baseUrl: string;
    serverHeader?: string;
    x_powered_by_header?: string;
    api: minerapi;
    
};