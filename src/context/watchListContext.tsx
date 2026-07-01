import React, { createContext, useEffect, useState } from "react";

interface WatchListContextType{
    watchlistedCoins:string[],
    addCoin:(id:string) => void;
    removeCoin:(id:string) => void;
    isWatchListed:(id:string) => boolean;
}

export const WatchListContext = createContext<WatchListContextType | undefined>(undefined);

interface WatchListProviderProps{
    children:React.ReactNode;
}

export const WatchListProvider: React.FC<WatchListProviderProps> = ({children}) => {
    const [watchListedCoins, setWatchListedCoins] = useState<string[]>(() => {
        const coinsStr = localStorage.getItem("watchlist");
        return coinsStr ? JSON.parse(coinsStr) :[];
    });

    const saveToStorage = (coins: string[])=> {
        setWatchListedCoins(coins);
        localStorage.setItem('watchlist', JSON.stringify(coins));
    }

    const addCoin = (id:string) => {
        if(!watchListedCoins.includes(id)){
            const updated = [...watchListedCoins,id];
            saveToStorage(updated);
        }
    }

    const removeCoin = (id: string) => {
    const updated = watchListedCoins.filter(coin => coin !== id);
    saveToStorage(updated);
  };

  const isWatchListed = (id:string) => {
    if(!id) return false;
    return watchListedCoins.includes(id);
  }
    
    return(
        <WatchListContext.Provider value={{watchListedCoins,addCoin,removeCoin,isWatchListed}}>
            {children}
        </WatchListContext.Provider>
    )
}