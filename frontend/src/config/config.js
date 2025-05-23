// Configuration file for the learner dashboard

export const config = {
  // S3 bucket URL for learner data
  s3BucketUrl: process.env.REACT_APP_S3_BUCKET_URL || 'https://learner-dashboard-data-123456789012-us-east-1.s3.amazonaws.com',
  
  // API endpoints
  apiEndpoints: {
    learningComponents: 'https://corndel.aptem.co.uk/api/MWS.LearningProgrammes/Components',
  },
  
  // Default request headers
  defaultHeaders: {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
  
  // UI settings
  ui: {
    autoHideAlerts: true,
    alertTimeout: 3000,
    maxTableRowsToShow: 100,
  },
};

export default config;