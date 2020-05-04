import React from 'react';
import {Bar} from 'react-chartjs-2';

export const ChartTrendig = props => {
    const data = {
        labels: props.statistic.map(elem => elem["userName"]),
        datasets: [
            {
                label: 'Количество coins',
                backgroundColor: 'rgba(88,27,152,0.58)',
                borderColor: '#581B98',
                borderWidth: 1,
                hoverBackgroundColor: '#581B98',
                hoverBorderColor: '#581B98',
                data: props.statistic.map(elem => elem["points"])
            }
        ]
    };


    return (
        <div>
            <Bar
                data={data}
                width={'100%'}
                height={300}
                options={{
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}

