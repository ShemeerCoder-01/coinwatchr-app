import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, priceData1, priceData2,coin) => {
    
    if (priceData2) {
        setChartData({
            labels: priceData1.map((price) => convertDate(price[0])),
            datasets: [
                {
                    label: coin[0].charAt(0).toUpperCase()+coin[0].slice(1),
                    data: priceData1.map((price) => price[1]),
                    // borderWidth:2,
                    fill: false,
                    borderColor: '#3a80e9',
                    tension: 0.25,
                    pointRadius: 0,
                    yAxisID: 'y',
                },
                {
                    label: coin[1].charAt(0).toUpperCase()+coin[1].slice(1),
                    data: priceData2.map((price) => price[1]),
                    // borderWidth:2,
                    fill: false,
                    borderColor: '#61c96f',
                    tension: 0.25,
                    pointRadius: 0,
                    yAxisID: 'y1',
                }
            ]
        })

    }
    else {
        setChartData({
            labels: priceData1.map((price) => convertDate(price[0])),
            datasets: [{
                label: 'Selected Coin',
                data: priceData1.map((price) => price[1]),
                // borderWidth:2,
                fill: true,
                backgroundColor: "rgba(58,128,233,0.1)",
                borderColor: '#3a80e9',
                tension: 0.25,
                pointRadius: 0
            }]
        })
    }
}