import { lolminer } from "../constants/miners";
import { getField } from "./data.service";

export async function test () 
{
    return getField(lolminer.api.workers, lolminer.baseUrl)
}