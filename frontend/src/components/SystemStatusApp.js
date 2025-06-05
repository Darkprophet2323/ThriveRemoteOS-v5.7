import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SystemStatusApp = () => {
  const [systemStats, setSystemStats] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [systemResponse, dashboardResponse] = await Promise.all([
          axios.get(`${API}/system/performance`),
          axios.get(`${API}/dashboard/live-stats`)
        ]);

        setSystemStats(systemResponse.data.performance);
        setDashboardStats(dashboardResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value, thresholds = { good: 50, warning: 80 }) => {
    if (value < thresholds.good) return '#27AE60';
    if (value < thresholds.warning) return '#F39C12';
    return '#E74C3C';
  };

  if (loading) {
    return (
      <div style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #2C3E50, #34495E)',
        color: '#fff',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⚙️</div>
          <p>Loading system status...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #2C3E50, #34495E)',
      color: '#fff',
      height: '100%',
      overflow: 'auto'
    }}>
      <h3 style={{ color: '#D4AF37', marginBottom: '20px', textAlign: 'center' }}>
        📊 ThriveOS System Status
      </h3>

      {/* System Performance */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '15px',
        marginBottom: '15px'
      }}>
        <h4 style={{ color: '#D4AF37', marginBottom: '15px' }}>System Performance</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '15px'
        }}>
          <StatCard
            label="CPU Usage"
            value={`${systemStats?.cpu_usage || 0}%`}
            color={getStatusColor(systemStats?.cpu_usage || 0)}
            icon="🖥️"
          />
          <StatCard
            label="Memory"
            value={`${systemStats?.memory_usage || 0}%`}
            color={getStatusColor(systemStats?.memory_usage || 0)}
            icon="💾"
          />
          <StatCard
            label="Disk Usage"
            value={`${systemStats?.disk_usage || 0}%`}
            color={getStatusColor(systemStats?.disk_usage || 0)}
            icon="💿"
          />
          <StatCard
            label="Network"
            value={systemStats?.database_status || 'Unknown'}
            color="#27AE60"
            icon="🌐"
          />
        </div>
      </div>

      {/* Platform Statistics */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '15px',
        marginBottom: '15px'
      }}>
        <h4 style={{ color: '#D4AF37', marginBottom: '15px' }}>Platform Statistics</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '15px'
        }}>
          <StatCard
            label="Arizona Connections"
            value={dashboardStats?.arizona_connections || 0}
            color="#3498DB"
            icon="🔗"
          />
          <StatCard
            label="Peak District Nodes"
            value={dashboardStats?.peak_district_nodes || 0}
            color="#9B59B6"
            icon="🏔️"
          />
          <StatCard
            label="Remote Opportunities"
            value={dashboardStats?.remote_opportunities || 0}
            color="#E67E22"
            icon="💼"
          />
          <StatCard
            label="Active Users"
            value={dashboardStats?.active_users || 0}
            color="#1ABC9C"
            icon="👥"
          />
        </div>
      </div>

      {/* Real-time Metrics */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '12px',
        padding: '15px'
      }}>
        <h4 style={{ color: '#D4AF37', marginBottom: '15px' }}>Real-time Metrics</h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '15px'
        }}>
          <MetricItem
            label="API Response Time"
            value={systemStats?.api_response_time || '0ms'}
            trend="stable"
          />
          <MetricItem
            label="Total Requests Today"
            value={systemStats?.total_requests_today || 0}
            trend="up"
          />
          <MetricItem
            label="Error Rate"
            value={systemStats?.error_rate || '0%'}
            trend="down"
          />
          <MetricItem
            label="Cache Hit Ratio"
            value={systemStats?.cache_hit_ratio || '0%'}
            trend="up"
          />
          <MetricItem
            label="System Uptime"
            value={`${Math.round(systemStats?.system_uptime_hours || 0)}h`}
            trend="stable"
          />
          <MetricItem
            label="Security Level"
            value={dashboardStats?.security_level || 'UNKNOWN'}
            trend="stable"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, color, icon }) => (
  <div style={{
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '8px',
    padding: '12px',
    textAlign: 'center',
    border: `2px solid ${color}20`
  }}>
    <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{icon}</div>
    <div style={{
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: color,
      marginBottom: '3px'
    }}>
      {value}
    </div>
    <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{label}</div>
  </div>
);

const MetricItem = ({ label, value, trend }) => (
  <div style={{
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <div>
      <div style={{ fontSize: '0.8rem', color: '#ccc' }}>{label}</div>
      <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#D4AF37' }}>
        {value}
      </div>
    </div>
    <div style={{ fontSize: '1.2rem' }}>
      {trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️'}
    </div>
  </div>
);

export default SystemStatusApp;