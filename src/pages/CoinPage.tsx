import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from "../components/DashBoard/List";
import { coinObject } from "../functions/currCoinObject.";
import CoinInfo from "../components/Coins/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getPrice } from "../functions/getPrice";
import LineChart from "../components/Coins/LineChart";
import SelectRange from "../components/Coins/SelectDate";
import { settingChartData } from "../functions/settingChartData";
import ToggleType from "../components/Coins/ToggleType";
import { CoinData, ChartData } from "../types";
import Layout from "../components/Layout";

const CoinPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currCoin, setCurrCoin] = useState<CoinData | null>(null);
  const [days, setDays] = useState<number>(30);
  const [chartData, setChartData] = useState<ChartData>({});
  const [priceType, setPriceType] = useState<String>("prices");

  useEffect(() => {
    getData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDaysChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const newPriceData = await getPrice(id, e.target.value, priceType);
      settingChartData(setChartData, newPriceData);
      setDays(e.target.value);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    setPriceType((prevState) => (newType !== null ? newType : prevState));
    try {
      if (newType === null) {
        const newPriceData = await getPrice(id, days, priceType);
        settingChartData(setChartData, newPriceData);
      } else {
        const newPriceData = await getPrice(id, days, newType);
        settingChartData(setChartData, newPriceData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function getData(id: string) {
    try {
      const coinData = await getCoinData(id);
      if (coinData) {
        coinObject(setCurrCoin, coinData);
        const priceData = await getPrice(id, days, priceType);
        if (priceData) {
          settingChartData(setChartData, priceData);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Layout>
      <div>
        <div>
          <div className="currCoinTab">
            <List coin={currCoin} clickable={false} />
          </div>
          <div className="currCoinTab">
            <SelectRange days={days} handleDaysChange={handleDaysChange} />
            <ToggleType
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart
              chartData={chartData}
              priceType={priceType}
              multiAxis={false}
            />
          </div>
          <div className="currCoinTab">
            <CoinInfo Name={currCoin?.name} Description={currCoin?.desc} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CoinPage;
