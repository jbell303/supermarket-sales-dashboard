import React from 'react';

const ProgressBar = ({ value, maxValue = 10, label, color = '#4361ee' }) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '14px' }}>{label}</span>
        <span style={{ fontSize: '14px', fontWeight: '500' }}>{value.toFixed(1)}</span>
      </div>
      <div style={{ height: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: color,
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar; 