import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CompactSleekLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing ThriveRemoteOS v5.5...');
  const [liveData, setLiveData] = useState({
    systemMetrics: { cpu: 0, memory: 0, network: 'Connecting' },
    aiTools: 0,
    jobs: 0
  });

  useEffect(() => {
    // Fetch live data
    const fetchLiveData = async () => {
      try {
        const [systemResponse, aiToolsResponse, jobsResponse] = await Promise.all([
          axios.get(`${API}/system/performance`).catch(() => ({ data: { performance: { cpu_usage: 15, memory_usage: 32 } } })),
          axios.get(`${API}/content/ai-tools`).catch(() => ({ data: { total_tools: 120 } })),
          axios.get(`${API}/jobs/live`).catch(() => ({ data: { total: 250 } }))
        ]);

        setLiveData({
          systemMetrics: {
            cpu: systemResponse.data.performance?.cpu_usage || Math.floor(Math.random() * 30) + 10,
            memory: systemResponse.data.performance?.memory_usage || Math.floor(Math.random() * 40) + 20,
            network: 'Connected'
          },
          aiTools: aiToolsResponse.data.total_tools || 120,
          jobs: jobsResponse.data.total || 250
        });
      } catch (error) {
        console.log('Using fallback data for loading screen');
      }
    };

    fetchLiveData();

    const bootSequence = [
      { progress: 20, status: 'Loading AI job entertainment services...', delay: 500 },
      { progress: 50, status: 'Initializing sleek interface...', delay: 400 },
      { progress: 80, status: 'Preparing compact workspace...', delay: 300 },
      { progress: 100, status: 'ThriveRemoteOS v5.5 Ready', delay: 200 }
    ];

    const runBootSequence = async () => {
      for (const step of bootSequence) {
        await new Promise(resolve => setTimeout(resolve, step.delay));
        setProgress(step.progress);
        setStatus(step.status);
      }
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
    };

    runBootSequence();
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f1f3f4 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      zIndex: 10000
    }}>
      
      {/* Triangular Accents */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: 0,
        height: 0,
        borderLeft: '20px solid transparent',
        borderRight: '20px solid transparent',
        borderBottom: '35px solid #dee2e6',
        opacity: 0.3,
        animation: 'floatTriangle 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '15%',
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '25px solid #ced4da',
        opacity: 0.4,
        animation: 'floatTriangle 8s ease-in-out infinite reverse'
      }} />

      {/* Compact Main Container */}
      <div style={{
        textAlign: 'center',
        maxWidth: '320px',
        width: '90%'
      }}>

        {/* Compact Title */}
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: '300',
          color: '#212529',
          marginBottom: '8px',
          letterSpacing: '1px'
        }}>
          ThriveRemoteOS
        </h1>

        <p style={{
          fontSize: '0.8rem',
          color: '#495057',
          marginBottom: '30px',
          fontWeight: '400',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          AI Job Platform v5.5
        </p>

        {/* Compact Progress Bar */}
        <div style={{
          marginBottom: '20px'
        }}>
          <div style={{
            width: '100%',
            height: '2px',
            background: '#e9ecef',
            borderRadius: '1px',
            overflow: 'hidden',
            marginBottom: '8px'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #495057, #212529)',
              borderRadius: '1px',
              transition: 'width 0.4s ease'
            }} />
          </div>
          <div style={{
            fontSize: '0.65rem',
            color: '#495057',
            textAlign: 'right'
          }}>
            {progress}%
          </div>
        </div>

        {/* Compact Status */}
        <p style={{
          fontSize: '0.75rem',
          color: '#212529',
          marginBottom: '20px',
          height: '15px'
        }}>
          {status}
        </p>

        {/* Compact Live Data */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.65rem',
          color: '#495057',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <span>CPU {liveData.systemMetrics.cpu}%</span>
          <span>RAM {liveData.systemMetrics.memory}%</span>
          <span>{liveData.aiTools}+ Tools</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatTriangle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-10px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default CompactSleekLoader;