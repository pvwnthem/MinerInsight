import { miners } from "../constants/miners";
import { type miner } from "../types/miner.types";
import axios from 'axios'

export const discoverRunning = async (): Promise<miner[]> => 
{
    let out: miner[] = [];

    for (const miner of miners) 
    {
        const response = await axios.get(miner.baseUrl)
        if (response) {
            out.push(miner)
        }
    }
    return out;
}