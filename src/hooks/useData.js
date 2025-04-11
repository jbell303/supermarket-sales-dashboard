import { useState, useEffect } from 'react';
import { 
  loadData, 
  getSalesByCategory, 
  getSalesByGender, 
  getSalesByPaymentMethod,
  getSalesByBranch,
  getSalesTrend,
  getTopRatedProducts,
  getTotalRevenue,
  getAverageRating,
  getTotalCustomers,
  getAverageTransaction
} from '../utils/dataUtils';

const useData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processedData, setProcessedData] = useState({
    salesByCategory: [],
    salesByGender: [],
    salesByPaymentMethod: [],
    salesByBranch: [],
    salesTrend: [],
    topRatedProducts: [],
    totalRevenue: 0,
    averageRating: 0,
    totalCustomers: 0,
    averageTransaction: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await loadData();
        setData(result);
        
        // Process the data for different charts
        setProcessedData({
          salesByCategory: getSalesByCategory(result),
          salesByGender: getSalesByGender(result),
          salesByPaymentMethod: getSalesByPaymentMethod(result),
          salesByBranch: getSalesByBranch(result),
          salesTrend: getSalesTrend(result),
          topRatedProducts: getTopRatedProducts(result),
          totalRevenue: getTotalRevenue(result),
          averageRating: getAverageRating(result),
          totalCustomers: getTotalCustomers(result),
          averageTransaction: getAverageTransaction(result)
        });
        
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, processedData, loading, error };
};

export default useData; 