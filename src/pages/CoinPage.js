import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import LoaderComponent from '../components/Common/Loader';
import List from '../components/DashBoard/List';
import Header from '../components/Common/Header';
import { coinObject } from '../functions/currCoinObject.';
import CoinInfo from '../components/Coins/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getPrice } from '../functions/getPrice';
import LineChart from '../components/Coins/LineChart';
import { convertDate } from '../functions/convertDate';
import SelectRange from '../components/Coins/SelectDate';
import { settingChartData } from '../functions/settingChartData';
import ToggleType from '../components/Coins/ToggleType';
import Footer from '../components/Common/Footer'

function CoinPage() {
    
    const {id} = useParams();
    const [currCoin,setCurrCoin] = useState();
    const [isLoading,setIsLoading] = useState(true);
    const [days,setDays] = useState(30);
    const [chartData,setChartData] = useState({});
    const [priceType, setPriceType] = useState('prices');

    
    useEffect(()=>{
        getData(id);
    },[id]);

    const handleDaysChange = async(e)=>{
        setIsLoading(true);
        const newPriceData = await getPrice(id,e.target.value,priceType);
        settingChartData(setChartData,newPriceData);
        setDays(e.target.value);
        setIsLoading(false);

    }

    const handlePriceTypeChange = async(event, newType) => {
        setIsLoading(true);
        setPriceType(newType);
        const newPriceData = await getPrice(id,days,newType);
        settingChartData(setChartData,newPriceData);
        setIsLoading(false);

    };

    async function getData(id){
        setIsLoading(true);
       const coinData = await getCoinData(id);
       if(coinData){
        coinObject(setCurrCoin,coinData);
        const priceData = await getPrice(id,days,priceType);
        if(priceData){
            settingChartData(setChartData,priceData);
            setIsLoading(false);
        }
       
       }
    }
  return (
    <div>
        <Header/>
        {isLoading?(<LoaderComponent/>):
        <div>
            <div className='currCoinTab'>
                <List coin={currCoin}/>
            </div>
            <div className='currCoinTab'>
                <SelectRange days={days} handleDaysChange={handleDaysChange}/>
                <ToggleType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
                <LineChart chartData={chartData} priceType={priceType} multiAxis={false} />
            </div>
            <div className='currCoinTab'>
                <CoinInfo Name={currCoin.name} Description={currCoin.desc}/>
            </div>
            <Footer/>
        </div>
        
        
        }
    </div>
  )
}

export default CoinPage;