"use client";

import React from 'react';
import VerticalBarChart from '@/components/Charts/VerticalBar';

const Page = () => {
    // Sales data for Gold, Silver, Diamond
    const goldSales = 25;
    const silverSales = 39;
    const diamondSales = 120;

    // Calculate the sum of all sales
    const totalSales = goldSales + silverSales + diamondSales;

    // Data for the chart
    const data = {
        labels: ['Gold', 'Silver', 'Diamond'],
        datasets: [
            {
                label: 'Amount Of Sales',
                data: [goldSales, silverSales, diamondSales],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)', // Gold
                    'rgba(54, 162, 235, 0.2)', // Silver
                    'rgba(255, 99, 132, 0.2)', // Diamond
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)', // Gold
                    'rgba(54, 162, 235, 1)', // Silver
                    'rgba(255, 99, 132, 1)', // Diamond
                ],
                borderWidth: 1,
            },
        ],
    };

    // Options for the chart
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                min: totalSales // Set the maximum value of y-axis to the sum of all sales
            }
        }
    };

    return (
        <div>
            <h1>Vertical Bar Chart Example</h1>
            <VerticalBarChart data={data} options={options} />
        </div>
    );
};

export default Page;
