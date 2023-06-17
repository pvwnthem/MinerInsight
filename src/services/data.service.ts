import { Logger } from "../logging/Logger";


export function parseLocation ( location : string, data : string )
{
    const parsedData = JSON.parse(data);

    const fieldArr = location.split('.');
    let fieldValue = parsedData;

    for (const field of fieldArr) {
        fieldValue = fieldValue[field];
    }

    Logger.Dev(fieldValue)
    return fieldValue;
}
