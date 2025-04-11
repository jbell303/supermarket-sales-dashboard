import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/dataUtils';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <p className="label">{`${label}`}</p>
        <p style={{ color: payload[0].color }}>{`Sales: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

const BarChart = ({ data, dataKey, nameKey, color = '#4361ee' }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 20,
          right: 50,
          left: 50,
          bottom: 80,
        }}
        barSize={40}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey={nameKey} 
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={70}
          dy={10}
        />
        <YAxis 
          tickFormatter={(value) => formatCurrency(value)}
          tickLine={false}
          axisLine={false}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart; 