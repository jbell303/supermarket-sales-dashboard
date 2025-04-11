import React from 'react';

const KPICard = ({ title, value, icon, color }) => {
  return (
    <div className="card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <div style={{ color, fontSize: '24px' }}>{icon}</div>
      </div>
      <div style={{ fontSize: '28px', fontWeight: '600' }}>{value}</div>
    </div>
  );
};

export default KPICard; 