import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import './dashboard.css'
import { Chart, registerables } from 'chart.js'; 

Chart.register(...registerables);


const Dashboard = () => {
  const [sessionsData, setSessionsData] = useState([]);

  useEffect(() => {
    // Fetch sessions data for all users
    axios.get('http://localhost:3000/sessions')
      .then(response => {
        setSessionsData(response.data);
      })
      .catch(error => {
        console.error('Error fetching sessions data:', error);
      });
  }, []);

  // Analyze sessions data
  const analyzeSessionsData = () => {
    const queryFrequency = {};
    sessionsData.forEach(session => {
      const query = session.query;
      queryFrequency[query] = (queryFrequency[query] || 0) + 1;
    });
    return queryFrequency;
  };

    // Calculate most active users
    const calculateMostActiveUsers = () => {
        const userSessionsCount = {};
        sessionsData.forEach(session => {
            const userId = session.user_id;
            userSessionsCount[userId] = (userSessionsCount[userId] || 0) + 1;
        });
        const sortedUsers = Object.keys(userSessionsCount).sort((a, b) => userSessionsCount[b] - userSessionsCount[a]);
        return sortedUsers.slice(0, 5); // Get top 5 most active users
    };

  // Prepare data for chart
  const prepareChartData = () => {
    const queryFrequency = analyzeSessionsData();
    const labels = Object.keys(queryFrequency);
    const data = Object.values(queryFrequency);
    return { labels, data };
  };

  // Display insights on the dashboard
  const displayInsights = () => {
    const { labels, data } = prepareChartData();

    // Chart data
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Query Frequency',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: data,
        },
      ],
    };

    // Chart options
    const chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    return (
      <div className="chart-container">
        <h2>Query Insights</h2>
        <div className="chart">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    );
  };

     // Display most active users
  const displayMostActiveUsers = () => {
    const mostActiveUsers = calculateMostActiveUsers()

    return (
      <div>
        <h2>Most Active Users</h2>
        <ul>
          {mostActiveUsers.map(userId => (
            <li key={userId}>{userId}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      {displayInsights()}
      {displayMostActiveUsers()}
    </div>
  );
};

export default Dashboard;
