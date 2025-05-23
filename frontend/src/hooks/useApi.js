import { useState, useCallback } from 'react';
import { fetchLearnerComponents } from '../utils/apiService';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (learnerId, authCookies) => {
    setLoading(true);
    setError('');
    setData(null);

    try {
      const result = await fetchLearnerComponents(learnerId, authCookies);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.response?.status 
        ? `Failed to fetch data: ${err.response.status}` 
        : `Failed to fetch data: ${err.message}`;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setError('');
    setData(null);
  }, []);

  return {
    loading,
    error,
    data,
    fetchData,
    clearError,
    reset,
  };
};

export default useApi;