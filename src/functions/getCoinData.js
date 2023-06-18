import axios from "axios";

export const getCoinData = (id)=>{
    const coinData = axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response)=> response.data)
    .catch((error)=>console.log("Error :",error));

    return coinData;
}