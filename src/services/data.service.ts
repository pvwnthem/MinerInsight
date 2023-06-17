import axios, { AxiosResponse } from "axios";
import { Logger } from "../logging/Logger";
import { apilocation } from "../types/miner.types";


export function parseLocation ( location : string, data : string )
{
    const parsedData = JSON.parse(data);

    const fieldArr = location.split('.');
    let fieldValue = parsedData;

    for (const field of fieldArr) {
        fieldValue = fieldValue[field];
    }

    Logger.Dev(fieldValue + "parseLocation")
    return fieldValue;
}

export async function getField ( location : apilocation, baseUrl : string ): Promise<any>
{
    const response: AxiosResponse = await axios.get(baseUrl + location.location)
    const data: any = parseLocation(location.value, response.data)

    Logger.Dev(data + "getField")
    return data

}