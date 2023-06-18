import axios from "axios"

export const getPrice = (id,days,priceType)=>{
   const priceData = axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
    .then((response)=> response.data[priceType])
    .catch((err)=> console.log("Error :",err));

    return priceData;
}