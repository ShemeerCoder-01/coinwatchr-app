import React, { useEffect, useState } from "react";
import SelectCrypto from "../components/Compare/SelectCrypto";
import SelectRange from "../components/Coins/SelectDate";
import { getPrice } from "../functions/getPrice";
import { getCoinData } from "../functions/getCoinData";
import List from "../components/DashBoard/List";
import { coinObject } from "../functions/currCoinObject.";
import CoinInfo from "../components/Coins/CoinInfo";
import { settingChartData } from "../functions/settingChartData";
import LineChart from "../components/Coins/LineChart";
import ToggleType from "../components/Coins/ToggleType";
import Layout from "../components/Layout";
import { CoinData } from "../types";
import { SelectChangeEvent } from "@mui/material";

const ComparePage: React.FC = () => {
  const [crypto1, setCrypto1] = useState<string>("");
  const [crypto2, setCrypto2] = useState<string>("");
  const [currCrypto1, setCurrCrypto1] = useState<CoinData | null>({});
  const [currCrypto2, setCurrCrypto2] = useState<CoinData | null>({});
  const [days, setDays] = useState<number>(30);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState<string>("prices");

  useEffect(() => {
    if (crypto1 && crypto2) {
      getData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crypto1, crypto2]);

  const handlePriceTypeChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    newType: string,
  ) => {
    setPriceType(newType);
    try {
      const newPriceData1 = await getPrice(crypto1, days, newType);
      const newPriceData2 = await getPrice(crypto2, days, newType);
      settingChartData(setChartData, newPriceData1, newPriceData2);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDaysChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const newPriceData1 = await getPrice(
        crypto1,
        Number(e.target.value),
        priceType,
      );
      const newPriceData2 = await getPrice(
        crypto2,
        Number(e.target.value),
        priceType,
      );
      settingChartData(setChartData, newPriceData1, newPriceData2);
      setDays(Number(e.target.value));
    } catch (error) {
      console.error(error);
    }
  };

  async function getData() {
    try {
      const coin1Data = await getCoinData(crypto1);
      const coin2Data = await getCoinData(crypto2);
      coinObject(setCurrCrypto2, coin2Data);
      coinObject(setCurrCrypto1, coin1Data);
      const priceData1 = await getPrice(crypto1, days, "prices");
      const priceData2 = await getPrice(crypto2, days, "prices");
      const coins = [crypto1, crypto2];
      settingChartData(setChartData, priceData1, priceData2, coins);
    } catch (error) {
      console.error(error);
    }
  }

  const handleCoinsChange = async (
    e: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent,
    isSecond: boolean,
  ) => {
    try {
      if (isSecond) {
        setCrypto2(e.target.value);
        const coin2Data = await getCoinData(e.target.value);
        coinObject(setCurrCrypto2, coin2Data);
        const priceData1 = await getPrice(crypto1, days, "prices");
        const priceData2 = await getPrice(e.target.value, days, "prices");
        const coins = [crypto1, e.target.value];
        settingChartData(setChartData, priceData1, priceData2, coins);
      } else {
        setCrypto1(e.target.value);
        const coin1Data = await getCoinData(e.target.value);
        coinObject(setCurrCrypto1, coin1Data);
        const priceData1 = await getPrice(e.target.value, days, "prices");
        const priceData2 = await getPrice(crypto2, days, "prices");
        const coins = [e.target.value, crypto2];
        settingChartData(setChartData, priceData1, priceData2, coins);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="compare">
        <div className="comparePage">
          <div className="compareSelect">
            <SelectCrypto
              crypto1={crypto1}
              crypto2={crypto2}
              handleCoinsChange={handleCoinsChange}
            />
            <SelectRange
              days={days}
              handleDaysChange={handleDaysChange}
              isCompare
            />
          </div>
          <div>
            {crypto1 && crypto2 && (
              <>
                <div className="comparePageTab">
                  <List coin={currCrypto1} clickable={false} />
                </div>
                <div className="comparePageTab">
                  <List coin={currCrypto2} clickable={false} />
                </div>
                <div className="comparePageTab">
                  <ToggleType
                    priceType={priceType}
                    handlePriceTypeChange={handlePriceTypeChange}
                  />
                  <LineChart
                    chartData={chartData}
                    priceType={priceType}
                    multiAxis
                  />
                </div>
                <div className="comparePageTab">
                  <CoinInfo
                    Name={currCrypto1?.name}
                    Description={currCrypto1?.desc}
                  />
                </div>
                <div className="comparePageTab">
                  <CoinInfo
                    Name={currCrypto2?.name}
                    Description={currCrypto2?.desc}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComparePage;
