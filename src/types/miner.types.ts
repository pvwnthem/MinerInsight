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
    api: minerapi;
};