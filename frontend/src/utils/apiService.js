import axios from 'axios';

export const loadLearnersFromS3 = async (bucketUrl) => {
  try {
    const response = await axios.get(`${bucketUrl}/learners.csv`);
    
    // Parse CSV data
    const lines = response.data.split('\n');
    const learnerData = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',');
        learnerData.push({
          name: values[0]?.trim(),
          id: values[1]?.trim()
        });
      }
    }
    
    return learnerData;
  } catch (error) {
    throw new Error('Failed to load learners from S3: ' + error.message);
  }
};

export const parseCookies = (cookieString) => {
  const cookies = {};
  const pairs = cookieString.split(';');
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=').map(s => s.trim());
    if (key && value) {
      cookies[key] = value;
    }
  });
  
  return cookies;
};

export const fetchLearnerComponents = async (learnerId, authCookies) => {
  const url = `https://corndel.aptem.co.uk/api/MWS.LearningProgrammes/Components?userId=${learnerId}&programmeId=null`;
  
  const headers = {
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0',
    'Cookie': authCookies
  };

  const response = await axios.get(url, { headers });
  
  if (response.status !== 200) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  const componentData = response.data;
  
  // Sort components by due date (nulls last)
  const sortedComponents = componentData.sort((a, b) => {
    const getDueDate = (component) => {
      const dueStr = component.dueDate;
      try {
        return dueStr ? new Date(dueStr) : new Date('9999-12-31');
      } catch {
        return new Date('9999-12-31');
      }
    };
    
    return getDueDate(a) - getDueDate(b);
  });

  // Add overdue status to each component
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const componentsWithStatus = sortedComponents.map(component => {
    let overdue = 'N/A';
    if (component.dueDate) {
      try {
        const dueDate = new Date(component.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        overdue = component.status !== 'Completed' && dueDate < today ? 'YES' : 'NO';
      } catch {
        overdue = 'Invalid date';
      }
    }
    
    return {
      ...component,
      overdue,
      documentsInfo: component.documents && component.documents.length > 0 
        ? component.documents.map(d => `${d.id} (${d.name})`).join(', ')
        : '-'
    };
  });

  return componentsWithStatus;
};