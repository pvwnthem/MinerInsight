import axios from "axios";
import { miners } from "../constants/miners";

export async function identifyApi(url: string) {
    try {
        const headers = (await axios.get(url)).headers;
  
 
  
        for (const miner of miners) {
            const { serverHeader, x_powered_by_header } = miner;

            if (
            serverHeader &&
            headers.server &&
            headers.server.toLowerCase().includes(serverHeader.toLowerCase())
            ) {
            if (url !== miner.baseUrl) {
                miner.setBaseUrl(url);
            }
            return miner;
            }

            if (
            x_powered_by_header &&
            headers['x-powered-by'] &&
            headers['x-powered-by']
                .toLowerCase()
                .includes(x_powered_by_header.toLowerCase())
            ) {
            if (url !== miner.baseUrl) {
                miner.setBaseUrl(url);
            }
            return miner;
            }
        }

        return 'Unknown mining software';
    } catch (error) {
        return 'Unknown mining software'
    }
  
}
