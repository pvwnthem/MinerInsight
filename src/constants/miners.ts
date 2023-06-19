import { Miner } from "../classes/Miner";
import { miner, minerapi, partials } from "../types/miner.types"

// for an empty field you must set the location but not the value

const lolminerAPI: minerapi = {
    software: {
        location: "/",
        value: "Software"
    },
    version: {
        location: "/",
        value: ""
    },
    start_time: {
      location: "/",
      value: "Session.Startup",
    },
    workers: {
        location: "/",
        value: "Workers",
        locations: {
            id: "Index",
            name: "Name"
        }
    },
    algorithms: {
        location: "/",
        value: "Algorithms",
        locations: {
            algorithm: "Algorithm",
            pool: "Pool",
            user: "User",
            hashrate: "Worker_Performance",
            hashrate_unit: "Performance_Unit"
        }
    }
  };
const lolminer = new Miner<minerapi>("lolminer", "", lolminerAPI, {algorithms: {}, workers: {}}, "lolMiner API");


const nbminerAPI: minerapi = {
    version: {
        location: "/api/v1/status",
        value: "version"
    },
    software: {
        location: "/api/v1/status",
        value: "",
        override: "name"
    },
    start_time: {
      location: "/api/v1/status",
      value: "start_time",
    },
    workers: {
        location: "/api/v1/status",
        value: "miner.devices",
        locations: {
            id: "id",
            name: "info"
        }
    },    
   
    algorithms: {
        location: "/api/v1/status",
        value: "miner.devices",
        locations: {
            //algorithm: "Algorithm",
            //pool: "Pool",
            //user: "User",
            hashrate: "hashrate",
            //hashrate_unit: "Performance_Unit"
        }
    },
}

const nbminerPartials: partials = {
        algorithms: {
            algorithm: {
                location: "/api/v1/status",
                value: "stratum.algorithm",
                index: 0
            },
            user: {
                location: "/api/v1/status",
                value: "stratum.user",
                index: 0
            },
            pool: {
                location: "/api/v1/status",
                value: "stratum.url",
                index: 0
            },

            
        },
        workers: {}
}

const nbminer = new Miner<minerapi>("nbminer", "/api/v1/status", nbminerAPI, nbminerPartials, undefined, undefined,
 { location: "/api/v1/status", value: "stratum.dual_mine" });


export const miners = [
    lolminer,
    nbminer
]