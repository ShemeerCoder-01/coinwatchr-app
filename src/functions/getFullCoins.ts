import axios from "axios";

export const getFullCoins = ()=>{
 const fullCoinsData =   axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
    .then((response)=>  response.data )
    .catch((error)=>{
      console.log("Error :",error); });

      return fullCoinsData;
}
