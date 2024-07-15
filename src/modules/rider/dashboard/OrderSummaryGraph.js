import React from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const OrderSummaryGraph = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Number of Orders',
        data: data.orders,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Summary Over Time',
      },
    },
  };

  return (
    <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" component="div">
      Order Summary Graph
      </Typography>
      <div style={{ height: '300px' }}>
      <Line data={chartData} options={options} />
      </div>
    </CardContent>
    </Card>

  );
};

export default OrderSummaryGraph;