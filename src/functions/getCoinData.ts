import axios from "axios";
import {CoinAPIResponse} from "../types";

export const getCoinData = (id:string):Promise<CoinAPIResponse|void> =>{
    return axios.get<CoinAPIResponse>(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response)=> response.data)
    .catch((error)=>console.log("Error :",error));
}