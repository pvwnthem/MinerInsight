import { Miner } from "../classes/Miner";
import { miner, minerapi } from "../types/miner.types"

// for an empty field you must set the location but not the value

const lolminerAPI: minerapi = {
    software: {
        location: "/",
        value: "Software"
    },
    uptime: {
      location: "/",
      value: "Session.Uptime",
    },
    /*hashrate: {
        location: "/",
        value: "Algorithms.0.Worker_Performance.0" 
    },*/
    /*hashrate_unit: {
        location: "/",
        value: "Algorithms.0.Performance_Unit"
    }*/
    workers: {
        location: "/",
        value: "Workers"
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
  



export const miners = [
    lolminer
]