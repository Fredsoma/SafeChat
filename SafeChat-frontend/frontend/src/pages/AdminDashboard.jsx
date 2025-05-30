import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './AdminDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics')
      .then(res => setStats(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!stats) {
    return <p className="admin-loading">Loading analytics...</p>;
  }

  // Prepare data for bar chart
  const labels = Object.keys(stats.dailyIncidents).sort();
  const dataValues = labels.map(day => stats.dailyIncidents[day]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Incidents per Day (Last 7 Days)',
        data: dataValues,
        backgroundColor: 'rgba(127, 0, 255, 0.7)'
      }
    ]
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      <div className="admin-summary">
        <div className="summary-card incidents-card">
          <h3>Incidents (Last 7 Days)</h3>
          <p className="summary-number">{stats.recentIncidentsCount}</p>
        </div>
        <div className="summary-card checkin-card">
          <h3>Check-Ins Started</h3>
          <p className="summary-number">{stats.totalStarted}</p>
        </div>
        <div className="summary-card missed-card">
          <h3>Missed Check-Ins</h3>
          <p className="summary-number">{stats.totalMissed}</p>
        </div>
      </div>

      <div className="chart-container">
        <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </div>
    </div>
  );
}
