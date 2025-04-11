import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/dataUtils';

const COLORS = ['#4361ee', '#3f37c9', '#4895ef', '#4cc9f0', '#560bad', '#f72585', '#7209b7', '#3a0ca3'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
        <p className="label">{`${payload[0].name}`}</p>
        <p style={{ color: payload[0].color }}>{`Sales: ${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

const PieChart = ({ data, dataKey, nameKey }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={40}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

export default PieChart; 