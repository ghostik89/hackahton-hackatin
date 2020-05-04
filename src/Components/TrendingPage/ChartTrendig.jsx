import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import {useAuth} from "../../Context/auth";

export const ChartTrendig = props => {
    const [data, setData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(88,27,152,0.58)',
                borderColor: '#581B98',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#581B98',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#581B98',
                pointHoverBorderColor: '#581B98',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    });
    const {authTokens} = useAuth()

    return (
        <div>
            <Line data={data} />
        </div>
    )
}

