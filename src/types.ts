export interface CoinData {
    id:string;
    name:string;
    symbol:string;
    image:string;
    desc:string;
    price_change_percentage_24h:number;
    total_volume:number;
    current_price:number;
    market_cap:number;
    market_cap_change_percentage_24h: number;
    handleRemove: (id: string) => void;
    clickable:boolean;
}

export interface CoinAPIResponse{
    id:string;
    name:string;
    symbol:string;
    image:{large:string};
    description:{en:string};
    market_data:{
        price_change_percentage_24h: number;
        total_volume:{usd:number};
        current_price: { usd: number };
        market_cap: { usd: number };
        market_cap_change_percentage_24h_in_currency: { usd: number };
    };
}

export interface ChartData{
    labels?:string[];
    datasets?:object[];
}

export interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  market_cap_change_percentage_24h: number;
  desc:string;
  price_change_percentage_24h:number;
  handleRemove: (id: string) => void;
  clickable:boolean;
}