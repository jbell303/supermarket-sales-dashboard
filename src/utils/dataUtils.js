import Papa from 'papaparse';

export const loadData = async () => {
  try {
    const response = await fetch('/supermarket_sales.csv');
    const csvText = await response.text();
    
    const { data } = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });
    
    return data;
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const groupByCategory = (data, category) => {
  return data.reduce((acc, item) => {
    const key = item[category];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
};

export const getSalesByCategory = (data) => {
  const grouped = groupByCategory(data, 'Product line');
  
  return Object.entries(grouped).map(([category, items]) => {
    const totalSales = items.reduce((sum, item) => sum + item.Total, 0);
    return {
      category,
      sales: totalSales,
      count: items.length
    };
  }).sort((a, b) => b.sales - a.sales);
};

export const getSalesByGender = (data) => {
  const grouped = groupByCategory(data, 'Gender');
  
  return Object.entries(grouped).map(([gender, items]) => {
    const totalSales = items.reduce((sum, item) => sum + item.Total, 0);
    return {
      gender,
      sales: totalSales,
      count: items.length
    };
  });
};

export const getSalesByPaymentMethod = (data) => {
  const grouped = groupByCategory(data, 'Payment');
  
  return Object.entries(grouped).map(([method, items]) => {
    const totalSales = items.reduce((sum, item) => sum + item.Total, 0);
    return {
      method,
      sales: totalSales,
      count: items.length
    };
  });
};

export const getSalesByBranch = (data) => {
  const grouped = groupByCategory(data, 'Branch');
  
  return Object.entries(grouped).map(([branch, items]) => {
    const totalSales = items.reduce((sum, item) => sum + item.Total, 0);
    return {
      branch,
      sales: totalSales,
      count: items.length
    };
  });
};

export const getSalesTrend = (data) => {
  // Add date parsing
  const processedData = data.map(item => ({
    ...item,
    parsedDate: new Date(item.Date)
  }));
  
  // Sort by date
  processedData.sort((a, b) => a.parsedDate - b.parsedDate);
  
  // Group by date
  const salesByDate = processedData.reduce((acc, item) => {
    const dateStr = item.Date;
    if (!acc[dateStr]) {
      acc[dateStr] = 0;
    }
    acc[dateStr] += item.Total;
    return acc;
  }, {});
  
  return Object.entries(salesByDate).map(([date, total]) => ({
    date,
    sales: total
  }));
};

export const getTopRatedProducts = (data) => {
  const grouped = groupByCategory(data, 'Product line');
  
  return Object.entries(grouped).map(([category, items]) => {
    const avgRating = items.reduce((sum, item) => sum + item.Rating, 0) / items.length;
    return {
      category,
      rating: avgRating
    };
  }).sort((a, b) => b.rating - a.rating);
};

export const getTotalRevenue = (data) => {
  return data.reduce((sum, item) => sum + item.Total, 0);
};

export const getAverageRating = (data) => {
  return data.reduce((sum, item) => sum + item.Rating, 0) / data.length;
};

export const getTotalCustomers = (data) => {
  return data.length;
};

export const getAverageTransaction = (data) => {
  const total = getTotalRevenue(data);
  return total / data.length;
}; 