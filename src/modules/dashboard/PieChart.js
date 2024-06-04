import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
// Importing required modules from Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering the ArcElement for the Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 20,
          font: {
            size: 14,
            family: 'Helvetica Neue',
            style: 'bold',
          },
          color: '#333333',
        },
      },
      title: {
        display: true,
        text: '',
        font: {
          size: 18,
          family: 'Helvetica Neue',
          weight: 'bold',
        },
        color: '#333333',
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 16,
          family: 'Helvetica Neue',
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
          family: 'Helvetica Neue',
        },
        cornerRadius: 4,
        displayColors: true,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          '#FF4000 ',
          '#36A2EB',
          '#FFCE56',
         
        ],
        hoverOffset: 4,
        cutout: '50%', // This creates the donut hole
      },
    ],
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          Product Categories
        </Typography>
        <div style={{ height: '300px' }}>
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
