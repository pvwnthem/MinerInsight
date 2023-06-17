export interface minerapi {
    [key: string] : {
        "location": string,
        "value": string,
    }
    "workers": {
        "location": string;
        "value": string;
    };
    "algorithms": {
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
    baseUrl?: string;
    serverHeader?: string;
    x_powered_by_header?: string;
    api: minerapi;
    
};