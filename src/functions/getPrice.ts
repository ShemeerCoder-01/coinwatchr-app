import axios from "axios"

export const getPrice = (id:string|undefined,days:number,priceType:string):Promise<number[][] | void>=>{
  return axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
    .then((response)=> response.data[priceType])
    .catch((err)=> console.log("Error :",err));
}