import React from 'react';
import useData from './hooks/useData';
import KPICard from './components/KPICard';
import ChartCard from './components/ChartCard';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import ProgressBar from './components/ProgressBar';
import { formatCurrency } from './utils/dataUtils';

// Simple icons for KPI cards
const DollarIcon = () => <span>💰</span>;
const UserIcon = () => <span>👥</span>;
const StarIcon = () => <span>⭐</span>;
const CartIcon = () => <span>🛒</span>;

function App() {
  const { processedData, loading, error } = useData();

  if (loading) return <div className="dashboard">Loading dashboard data...</div>;
  if (error) return <div className="dashboard">Error loading data: {error.message}</div>;

  const { 
    salesByCategory, 
    salesByGender, 
    salesByPaymentMethod,
    salesByBranch,
    salesTrend,
    topRatedProducts,
    totalRevenue,
    averageRating,
    totalCustomers,
    averageTransaction
  } = processedData;

  return (
    <div className="dashboard">
      <header className="header">
        <h1 className="title">Supermarket Sales Dashboard</h1>
      </header>

      {/* KPI Row */}
      <div className="grid">
        <KPICard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<DollarIcon />}
          color="#4361ee"
        />
        <KPICard
          title="Total Customers"
          value={totalCustomers}
          icon={<UserIcon />}
          color="#f72585"
        />
        <KPICard
          title="Average Rating"
          value={averageRating.toFixed(1)}
          icon={<StarIcon />}
          color="#ffa62b"
        />
        <KPICard
          title="Avg. Transaction"
          value={formatCurrency(averageTransaction)}
          icon={<CartIcon />}
          color="#10b981"
        />
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <ChartCard title="Sales Trend" height={350}>
          <LineChart 
            data={salesTrend} 
            dataKey="sales" 
            nameKey="date" 
          />
        </ChartCard>
        <ChartCard title="Sales by Gender" height={350}>
          <PieChart 
            data={salesByGender} 
            dataKey="sales" 
            nameKey="gender" 
          />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <ChartCard title="Sales by Product Category" height={350}>
          <BarChart 
            data={salesByCategory} 
            dataKey="sales" 
            nameKey="category" 
            color="#4361ee"
          />
        </ChartCard>
        <ChartCard title="Sales by Branch" height={350}>
          <BarChart 
            data={salesByBranch} 
            dataKey="sales" 
            nameKey="branch" 
            color="#f72585"
          />
        </ChartCard>
      </div>

      {/* Charts Row 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <ChartCard title="Sales by Payment Method" height={350}>
          <PieChart 
            data={salesByPaymentMethod} 
            dataKey="sales" 
            nameKey="method" 
          />
        </ChartCard>
        <ChartCard title="Top Rated Products" height={350}>
          <div style={{ padding: '20px 0' }}>
            {topRatedProducts.map((product, index) => (
              <ProgressBar 
                key={index}
                label={product.category}
                value={product.rating}
                color={index === 0 ? '#4361ee' : '#6c757d'}
              />
            ))}
          </div>
        </ChartCard>
      </div>
    </div>
  );
}

export default App; 