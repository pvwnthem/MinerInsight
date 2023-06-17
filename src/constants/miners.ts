import { miner } from "@/types/miner.types"

export const lolminer: miner = {
    name: "lolminer",
    baseUrl: "http://localhost:4000",
    serverHeader: "lolMiner API",
    api: {
        "workers": {
            "location": "/",
            "value": "Workers"
        }
    },
}

export const miners: miner[] = [
    lolminer
]