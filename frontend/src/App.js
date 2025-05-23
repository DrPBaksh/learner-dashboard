import React, { useState, useEffect } from 'react';
import AuthSection from './components/AuthSection';
import LearnerSelector from './components/LearnerSelector';
import ComponentsTable from './components/ComponentsTable';
import { loadLearnersFromS3, fetchLearnerComponents } from './utils/apiService';

function App() {
  const [learners, setLearners] = useState([]);
  const [selectedLearner, setSelectedLearner] = useState('');
  const [authCookies, setAuthCookies] = useState('');
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load learners from S3 on component mount
  useEffect(() => {
    loadLearners();
  }, []);

  const loadLearners = async () => {
    try {
      // Use the S3 bucket URL from environment or default
      const bucketUrl = process.env.REACT_APP_S3_BUCKET_URL || 'https://learner-dashboard-data-338971307797-eu-west-2.s3.amazonaws.com';
      const learnerData = await loadLearnersFromS3(bucketUrl);
      
      setLearners(learnerData);
      setSuccess('Learners loaded successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to load learners. Please check your S3 configuration.');
      console.error('Error loading learners:', err);
    }
  };

  const handleFetchComponents = async () => {
    if (!selectedLearner || !authCookies) {
      setError('Please select a learner and provide authentication cookies.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const componentsWithStatus = await fetchLearnerComponents(selectedLearner, authCookies);
      setComponents(componentsWithStatus);
      setSuccess(`Loaded ${componentsWithStatus.length} components successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(`Failed to fetch data: ${err.response?.status || err.message}`);
      console.error('Error fetching components:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError('');
  const clearSuccess = () => setSuccess('');

  return (
    <div className="container">
      <div className="header">
        <h1>📚 Learner Dashboard</h1>
        <p>Track learning progress and component status</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button className="alert-close" onClick={clearError}>×</button>
        </div>
      )}
      
      {success && (
        <div className="alert alert-success">
          {success}
          <button className="alert-close" onClick={clearSuccess}>×</button>
        </div>
      )}

      <AuthSection 
        authCookies={authCookies} 
        onAuthChange={setAuthCookies} 
      />

      <LearnerSelector 
        learners={learners}
        selectedLearner={selectedLearner}
        onLearnerChange={setSelectedLearner}
        loading={loading}
      />

      <div className="fetch-section">
        <button 
          onClick={handleFetchComponents} 
          disabled={loading || !selectedLearner || !authCookies}
          className="fetch-button"
        >
          {loading ? '⏳ Loading...' : '🔄 Fetch Components'}
        </button>
        
        {selectedLearner && learners.length > 0 && (
          <p className="selected-learner-info">
            Selected: <strong>{learners.find(l => l.id === selectedLearner)?.name}</strong> (ID: {selectedLearner})
          </p>
        )}
      </div>

      <div className="components-section">
        <h2>📋 Learning Components</h2>
        <ComponentsTable 
          components={components} 
          loading={loading} 
        />
      </div>
    </div>
  );
}

export default App;