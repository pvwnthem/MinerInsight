import axios, { AxiosResponse } from "axios";
import { Logger } from "../logging/Logger";
import { apilocation, miner } from "../types/miner.types";


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