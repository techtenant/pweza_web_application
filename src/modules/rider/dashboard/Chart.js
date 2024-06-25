import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
// Importing required modules from Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the scales and elements for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        grid: {
          display: true,
          drawBorder: false,
          color: '#eaeaea',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
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
        displayColors: false,
      },
    },
    animation: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      },
    },
  };
  
  // Apply these options to your <Bar data={chartData} options={options} />
  

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'This Year',
        data: data.thisYear,
        backgroundColor: 'rgba(255, 64, 0, 0.5)',
        borderColor: 'rgba(255, 64, 0, 1)',
        borderWidth: 1,
      },
      {
        label: 'Last Year',
        data: data.lastYear,
        backgroundColor: 'rgba(33, 150, 243, 0.5)',
        borderColor: 'rgba(33, 150, 243, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div">
        Earnings Summary Graph:
        </Typography>
        <div style={{ height: '300px' }}>
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
