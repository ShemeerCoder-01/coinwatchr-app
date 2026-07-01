
export const addToWatchList = (id:string)=>{
   
    if(localStorage.getItem('watchlist')){
        const coinsStr = localStorage.getItem('watchlist');
        const coinsData: string[] = coinsStr? JSON.parse(coinsStr):[];
        if(!coinsData.includes(id)){
            coinsData.push(id);
            localStorage.setItem('watchlist',JSON.stringify(coinsData));
        }
        
    }else{
        const watchlist = [];
        watchlist.push(id);
        const coinsData = JSON.stringify(watchlist);
        localStorage.setItem("watchlist", coinsData);
    }
    // toast.success(
    //     `${id.slice(0, 1).toUpperCase() + id.slice(1)} - Added To The Watchlist!`
    // );
}