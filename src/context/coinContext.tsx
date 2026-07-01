import { createContext, useEffect, useState } from "react";
import { Coin } from "../types";
import { getFullCoins } from "../functions/getFullCoins";

interface CoinsContextType {
  coins: Coin[];
  isLoading: boolean;
  refetchCoins: () => void;
}

export const CoinsContext = createContext<CoinsContextType | undefined>(
  undefined,
);

interface CoinsProviderProps {
  children: React.ReactNode;
}

export const CoinsProvider: React.FC<CoinsProviderProps> = ({ children }) => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCoins = async () => {
    setIsLoading(true);
    try {
      const data = await getFullCoins();
      setCoins(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <CoinsContext.Provider
      value={{ coins, isLoading, refetchCoins: fetchCoins }}
    >
      {children}
    </CoinsContext.Provider>
  );
};
