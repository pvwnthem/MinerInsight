import axios, { AxiosResponse } from "axios";
import { Logger } from "../logging/Logger";
import { apilocation, miner, minerapi } from "../types/miner.types";
import { standardizedData } from "@/types/data.types";


export function parseLocation ( location : string, data : string )
{
    const keys = location.split('.');
    let value: any = data;

    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
        value = value[key];
        } else {
        return undefined;
        }
    }

    return value;
}

export async function getField ( location : apilocation, baseUrl : string ): Promise<any>
{
    const response: AxiosResponse = await axios.get(baseUrl + location.location)
    const data: any = parseLocation(location.value, response.data)

    return data;
}

export async function getFields ( locations: string[], url : string ): Promise<any>
{   
    const response: AxiosResponse = await axios.get(url)

    let data: any = {};

    for (const location of locations) {
        const parsed: any = parseLocation(location, response.data)
        data[location] = parsed
    }
    

    return data;
}

export function standardizeData( data : any, miner : miner ) : standardizedData
{
    const rtdata: standardizedData = {};

    for (const prop in miner.api) {
        if (miner.api.hasOwnProperty(prop)) {
        const propName = prop as keyof standardizedData;
        rtdata[propName] = data[miner.api[prop].value];
        }
    }

    return rtdata;
}

export function groupRoutesByLocation( miner : miner ) 
{
    
    const api: minerapi = miner.api

    const routesByLocation: any = {};
  
    for (const key in api) {
      const item = api[key];
  
      // Check if location already exists in the result object
      if (!routesByLocation.hasOwnProperty(item.location)) {
        routesByLocation[item.location] = [];
      }
  
      // Push the item value to the corresponding location array
      routesByLocation[item.location].push(item.value);
    }
  
    return routesByLocation;
  }
  

export async function getAllData ( miner: miner ): Promise<any>
{
    let data: any = {}

    if (miner.baseUrl) {
        const routes = groupRoutesByLocation(miner)
        
        for (const route of Object.keys(routes)) {
            const response = await getFields(routes[route], miner.baseUrl + route);
            data = response
        }

       
    }   
    // return standardized data
    return standardizeData(data, miner)
}