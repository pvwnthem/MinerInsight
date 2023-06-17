import axios, { AxiosResponse } from "axios";
import { Logger } from "../logging/Logger";
import { apilocation, miner, minerapi } from "../types/miner.types";


export function parseLocation ( location : string, data : string )
{

    const fieldArr = location.split('.');
    let fieldValue: any = data;

    for (const field of fieldArr) {
        fieldValue = fieldValue[field];
    }

    return fieldValue;
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

    let data = {};

    for (const location of locations) {
        const parsed: any = parseLocation(location, response.data)
        console.log(parsed, "parsed")
    }
    

    return data;
}

export function groupRoutesByLocation( miner : miner ) {
    
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
    if (miner.baseUrl) {
        const routes = groupRoutesByLocation(miner)
        console.log(routes)
        
        for (const route of Object.keys(routes)) {
            console.log(route, routes[route], miner.baseUrl + route);
            await getFields(routes[route], miner.baseUrl+ route);
          }

       
    }
    
}