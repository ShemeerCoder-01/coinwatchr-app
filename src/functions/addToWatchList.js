import { toast } from "react-toastify";
export const addToWatchList = (id)=>{
   
    if(localStorage.getItem('watchlist')){
        const coinsData = JSON.parse(localStorage.getItem('watchlist'));
        console.log(coinsData);
        if(!coinsData.includes(id)){
            coinsData.push(id);
            localStorage.setItem('watchlist',JSON.stringify(coinsData));
        }
        
    }else{
        const watchlist = [];
        watchlist.push(id);
        const coinsData = JSON.stringify(watchlist);
        console.log(coinsData);
        localStorage.setItem("watchlist", coinsData);
    }
    toast.success(
        `${id.slice(0, 1).toUpperCase() + id.slice(1)} - Added To The Watchlist!`
    );
}