import { Miner } from "../classes/Miner";
import { miner, minerapi } from "../types/miner.types"


const lolminerAPI: minerapi = {
    workers: {
      location: "/",
      value: "Workers",
    },
  };
const lolminer = new Miner<minerapi>("lolminer", "http://localhost:4000", lolminerAPI, "lolMiner API");
  



export const miners = [
    lolminer
]