import React from 'react';

const ChartCard = ({ title, children, height = 300 }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div style={{ height: `${height}px`, padding: '10px 0' }}>
        {children}
      </div>
    </div>
  );
};

export default ChartCard; 