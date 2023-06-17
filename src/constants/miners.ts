import { Miner } from "../classes/Miner";
import { miner, minerapi } from "../types/miner.types"


const lolminerAPI: minerapi = {
    software: {
        location: "/",
        value: "Software"
    },
    uptime: {
      location: "/",
      value: "Session.Uptime",
    },
  };
const lolminer = new Miner<minerapi>("lolminer", "http://localhost:4000", lolminerAPI, "lolMiner API");
  



export const miners = [
    lolminer
]