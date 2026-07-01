import { useContext } from "react";
import { WatchListContext } from "../context/watchListContext";

interface WatchListContextType{
    watchListedCoins:string[],
    addCoin:(id:string) => void;
    removeCoin:(id:string) => void;
    isWatchListed:(id:string) => boolean;
}

export const useWatchListedCoins = () : WatchListContextType => {
    const context = useContext(WatchListContext);
    if (context === undefined) {
    throw new Error('useWatchList must be used within a WatchListProvider');
    }
    return context;
}