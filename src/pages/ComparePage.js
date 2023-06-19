import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header';
import SelectCrypto from '../components/Compare/SelectCrypto';
import SelectRange from '../components/Coins/SelectDate';
import { getPrice } from '../functions/getPrice';
import { getCoinData } from '../functions/getCoinData';
import LoaderComponent from '../components/Common/Loader';
import List from "../components/DashBoard/List";
import { coinObject } from '../functions/currCoinObject.';
import CoinInfo from '../components/Coins/CoinInfo';
import { settingChartData } from '../functions/settingChartData';
import LineChart from '../components/Coins/LineChart';
import ToggleType from '../components/Coins/ToggleType';
import Footer from '../components/Common/Footer';


function ComparePage() {

    const [crypto1, setCrypto1] = useState('bitcoin');
    const [crypto2, setCrypto2] = useState('ethereum');
    const [currCrypto1, setCurrCrypto1] = useState({});
    const [currCrypto2, setCurrCrypto2] = useState({});
    const [days, setDays] = useState(30);
    const [isLoading, setIsLoading] = useState(true);
    const [chartData,setChartData] = useState({});
    const [priceType,setPriceType] = useState("prices");

    console.log("hi i am crypto1", currCrypto1);
    console.log("hi i am crypto2", currCrypto2);

    useEffect(() => {
        getData();
    },[]);

    

    const handlePriceTypeChange = async(event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const newPriceData1 = await getPrice(crypto1,days,newType);
        const newPriceData2 = await getPrice(crypto2,days,newType);
        settingChartData(setChartData,newPriceData1,newPriceData2);
        setIsLoading(false);

    };

    const handleDaysChange = async(e)=>{
        setIsLoading(true);
        const newPriceData1 = await getPrice(crypto1,e.target.value,priceType);
        const newPriceData2 = await getPrice(crypto2,e.target.value,priceType);
        settingChartData(setChartData,newPriceData1,newPriceData2);
        setDays(e.target.value);
        setIsLoading(false);

    }

    async function getData() {
        const coin1Data = await getCoinData(crypto1);
        const coin2Data = await getCoinData(crypto2);
        coinObject(setCurrCrypto2, coin2Data);
        coinObject(setCurrCrypto1, coin1Data);
        const priceData1 = await getPrice(crypto1, days, "prices");
        const priceData2 = await getPrice(crypto2, days, "prices");
        console.log(priceData1,priceData2);
        settingChartData(setChartData,priceData1,priceData2);
        setIsLoading(false);

    }


    const handleCoinsChange = async (e, isSecond) => {
        setIsLoading(true);
        if (isSecond) {
            setCrypto2(e.target.value);
            const coin2Data = await getCoinData(e.target.value);
            coinObject(setCurrCrypto2, coin2Data);
            const priceData1 = await getPrice(crypto1, days, "prices");
            const priceData2 = await getPrice(e.target.value, days, "prices");
            settingChartData(setChartData,priceData1,priceData2);
            

        } else {
            setCrypto1(e.target.value);
            const coin1Data = await getCoinData(e.target.value);
            coinObject(setCurrCrypto1, coin1Data);
            const priceData1 = await getPrice(e.target.value, days, "prices");
            const priceData2 = await getPrice(crypto2, days, "prices");
            settingChartData(setChartData,priceData1,priceData2);
            

        }
        
        setIsLoading(false);
    }




    return (
        <div className='compare'>
            <Header />
            {isLoading ? (<LoaderComponent />) : (
                <div className='comparePage'>
                    <div className='compareSelect'>
                        <SelectCrypto
                            crypto1={crypto1}
                            crypto2={crypto2}
                            handleCoinsChange={handleCoinsChange}
                        />
                        <SelectRange days={days} handleDaysChange={handleDaysChange} isCompare />
                    </div>
                    <div className='comparePageTab'>
                        <List coin={currCrypto1} />
                    </div>
                    <div className='comparePageTab'>
                        <List coin={currCrypto2} />
                    </div>
                    <div className='comparePageTab'>
                        <ToggleType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
                        <LineChart chartData={chartData} priceType={priceType} multiAxis />
                    </div>
                    <div className='comparePageTab'>
                        <CoinInfo Name={currCrypto1.name} Description={currCrypto1.desc}/>
                    </div>
                    <div className='comparePageTab'>
                        <CoinInfo Name={currCrypto2.name} Description={currCrypto2.desc}/>
                    </div>
                    <Footer/>
                </div>)}
           
        </div>
    )
}

export default ComparePage;