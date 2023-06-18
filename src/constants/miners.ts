import { Miner } from "../classes/Miner";
import { miner, minerapi } from "../types/miner.types"

// for an empty field you must set the location but not the value

const lolminerAPI: minerapi = {
    software: {
        location: "/",
        value: "Software"
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
const lolminer = new Miner<minerapi>("lolminer", "", lolminerAPI, "lolMiner API");


const nbminerAPI: minerapi = {
    software: {
        location: "/api/v1/status",
        value: "version"
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
    algorithm: {
        location: "/api/v1/status",
        value: "stratum.algorithm"
    },
    pool: {
        location: "/api/v1/status",
        value: "stratum.url"
    },
    user: {
        location: "/api/v1/status",
        value: "user"
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

const nbminer = new Miner<minerapi>("nbminer", "/api/v1/stats", nbminerAPI, undefined, undefined, { location: "/api/v1/status", value: "stratum.dual_mine" });


export const miners = [
    lolminer,
    nbminer
]