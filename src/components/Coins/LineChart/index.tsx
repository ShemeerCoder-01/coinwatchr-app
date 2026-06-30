import React from 'react'
import { Line } from 'react-chartjs-2';
import { convertNumber } from '../../../functions/convertNumber';
import {ChartData as MyChartData} from "../../../types"
import LoaderComponent from '../../Common/Loader';

interface LineChartProps{
    chartData:MyChartData;
    priceType:string;
    multiAxis:boolean;
}


const LineChart: React.FC<LineChartProps> = ({chartData,priceType,multiAxis}) => {

    if (!chartData.datasets || chartData.datasets.length === 0) {
        return null;
    }

    const options: ChartOptions<"line"> = {
        plugins:{
            legend:{
                display:multiAxis?true:false,
            },
        },
        responsive:true,
        interaction:{
            mode:"index",
            intersect:false,
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value) {
                        if(priceType === "prices") return '$' + value;
                        else{
                            return '$' + convertNumber(value);
                        }
                        
                    }
                }
            },
            y1: {
                type: 'linear',
                display:multiAxis? true:false,
                position: 'right',
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value) {
                        if(priceType === "prices") return '$' + value;
                        else{
                            return '$' + convertNumber(value);
                        }
                        
                    }
                }
            }
        }
    };

  return <Line key={JSON.stringify(chartData.labels)} data={chartData as any} options={options}/>;
}

export default LineChart;