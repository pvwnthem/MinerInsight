import { Logger } from "../logging/Logger";
import {
  miner,
  minerapi,
  minerapiroute,
  partials,
} from "../types/miner.types";
import { MinerAlgorithm, MinerWorker, standardizedData } from "@/types/data.types";

export function parseLocation(location: string, data: any) {
  const keys = location.split('.');
  let value: any = data;

  for (const key of keys) {
    if (value) {
      if (Array.isArray(value) && !isNaN(Number(key))) {
        const index = Number(key);
        if (index >= 0 && index < value.length) {
          value = value[index];
        } else {
          return undefined;
        }
      } else if (key in value) {
        value = value[key];
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  } 

  return value;
}

export async function standardizePartials(standardizedData: standardizedData, miner: miner) {
  const partials: partials = miner.partials;
  const routes = groupPartialsByLocation(partials);

  let data: any = {};

  for (const route of Object.keys(routes)) {
    const response = await getFields(routes[route], miner.baseUrl + route);
    data = response;
  }

  for (const key in partials) {
    for (const route in partials[key as keyof partials]) {
      const index: number = partials[key as keyof partials]?.[route].index;
      standardizedData[key][index][route] = data[partials[key as keyof partials]?.[route].value];
    }
  }

  return data;
}

export async function getField(location: minerapiroute, baseUrl: string): Promise<any> {
  const response = await fetch(baseUrl + location.location);
  const data: any = parseLocation(location.value, await response.json());
  console.log(data)
  return data;
}

export async function getFields(locations: string[], url: string): Promise<any> {
  const response = await fetch(url);
  const json = await response.json();

  let data: any = {};

  for (const location of locations) {
    const parsed: any = parseLocation(location, json);
    data[location] = parsed;
  }

  return data;
}

export function standardizeData(data: any, miner: miner): standardizedData {
  const rtdata: standardizedData = {};
  for (const prop in miner.api) {
    if (miner.api.hasOwnProperty(prop)) {
      const propName = prop as keyof standardizedData;
      rtdata[propName] = data[miner.api[prop].value];
    }
  }

  return rtdata;
}

export function standardizeAlgorithm(data: standardizedData, miner: miner) {
  const rtdata: standardizedData = {};

  if (miner.api.algorithms) {
    const algorithmsData = data.algorithms;
    const algorithmFields: MinerAlgorithm[] = [];

    if (Array.isArray(algorithmsData)) {
      algorithmsData.forEach((algorithmObj: any) => {
        const algorithm: MinerAlgorithm = {};

        for (const key in miner.api.algorithms.locations) {
          if (miner.api.algorithms.locations.hasOwnProperty(key)) {
            const prop = key as keyof MinerAlgorithm;
            const location = miner.api.algorithms.locations[key as keyof MinerAlgorithm];
            algorithm[prop] = parseLocation(location as string, algorithmObj);
          }
        }

        algorithmFields.push(algorithm);
      });
    }

    rtdata.algorithms = algorithmFields;
  }
  return rtdata.algorithms;
}

export function standardizeWorkers(data: standardizedData, miner: miner) {
  const rtdata: standardizedData = {};

  if (miner.api.workers) {
    const workerData = data.workers;
    const workerFields: MinerWorker[] = [];

    if (Array.isArray(workerData)) {
      workerData.forEach((workerObj: any) => {
        const worker: MinerWorker = {};

        for (const key in miner.api.workers.locations) {
          if (miner.api.workers.locations.hasOwnProperty(key)) {
            const prop = key as keyof MinerWorker;
            const location = miner.api.workers.locations[key];
            worker[prop] = parseLocation(location, workerObj);
          }
        }

        workerFields.push(worker);
      });
    }

    rtdata.workers = workerFields;
  }
  return rtdata.workers;
}

export function groupRoutesByLocation(miner: miner) {
  const api: minerapi = miner.api;

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

export function groupPartialsByLocation(partials: partials) {
  const routesByLocation: any = {};

  for (const key in partials) {
    for (const route in partials[key as keyof partials]) {
      const item = partials[key as keyof partials]?.[route];

      // Check if location already exists in the result object
      if (!routesByLocation.hasOwnProperty(item?.location)) {
        routesByLocation[item?.location as string] = [];
      }

      // Push the item value to the corresponding location array
      routesByLocation[item?.location as string].push(item?.value);
    }
  }

  return routesByLocation;
}

export async function getAllData(miner: miner): Promise<any> {
  let data: any = {};

  if (miner.baseUrl) {
    const routes = groupRoutesByLocation(miner);

    for (const route of Object.keys(routes)) {
      const response = await getFields(routes[route], miner.baseUrl + route);
      data = response;
    }
  }

  const standardizedData: standardizedData = standardizeData(data, miner);

  const standardizedWorkers = standardizeWorkers(standardizedData, miner);
  const standardizedAlgorithms = standardizeAlgorithm(standardizedData, miner);

  const rtdata = {
    ...standardizedData,
    workers: standardizedWorkers,
    algorithms: standardizedAlgorithms,
  };

  const partialsData: partials = await standardizePartials(rtdata, miner);
  rtdata.partials = partialsData;

  // Return standardized data
  Logger.Info("All data standardized returning to client.")
  return rtdata;
}
