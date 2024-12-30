import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const VerticalBarChart = ({ data, options, labelColor }) => {
    // Calculate step size based on the total range of sales
    const totalSales = data.datasets.reduce((acc, dataset) => acc + Math.max(...dataset.data), 0);
    const stepSize = options.scales.y.stepSize; // Divide the total sales range into 5 equal parts

    // Merge the provided options with the default options
    const mergedOptions = {
        maintainAspectRatio: false, // To allow chart to fill its parent container
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                color: labelColor,
                ...options.scales?.y, // Merge y-axis options
                stepSize: stepSize // Set the step size for y-axis ticks
            }
        },
        ...options // Merge other options
    };

    return (
        <div className='h-[250px]'>
            <Bar
                data={data}
                options={mergedOptions}
            />
        </div>
    );
};

export default VerticalBarChart;
