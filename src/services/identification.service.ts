import axios from "axios";
import { miners } from "../constants/miners";


export async function identifyApi(url: string) {
    const headers = (await axios.get(url)).headers;
    
    for (const miner of miners) {
        const { serverHeader, x_powered_by_header } = miner;
  
      if (
        serverHeader &&
        headers.server &&
        headers.server.toLowerCase().includes(serverHeader.toLowerCase())
      ) {
        return miner.name;
      }
  
      if (
        x_powered_by_header &&
        headers['x-powered-by'] &&
        headers['x-powered-by']
          .toLowerCase()
          .includes(x_powered_by_header.toLowerCase())
      ) {
        return miner.name;
      }
    }
  
    return 'Unknown mining software';
  }