import { useContext } from "react";
import { Coin } from "../types"
import { CoinsContext } from "../context/coinContext";

interface CoinsContextType{
    coins:Coin[],
    isLoading:boolean;
    refetchCoins: () => void;
}
export const useCoins = (): CoinsContextType => {
    const context = useContext(CoinsContext);
    if (context === undefined) {
    throw new Error('useCoins must be used within a CoinsProvider');
  }
  return context;
}