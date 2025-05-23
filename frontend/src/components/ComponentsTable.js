import React from 'react';

const ComponentsTable = ({ components, loading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'None';
    try {
      return new Date(dateString).toLocaleDateString('en-GB');
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return <div className="loading">Loading components...</div>;
  }

  if (components.length === 0) {
    return <div className="no-data">No components loaded. Select a learner and fetch data.</div>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <div className="components-summary">
        <p>Showing {components.length} components</p>
      </div>
      <table className="components-table">
        <thead>
          <tr>
            <th>📘 Name</th>
            <th>📅 Due Date</th>
            <th>✅ Status</th>
            <th>⚠️ Overdue?</th>
            <th>📎 Documents</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component, index) => (
            <tr key={index}>
              <td title={component.name}>
                {component.name?.length > 50 
                  ? `${component.name.substring(0, 50)}...` 
                  : component.name || 'N/A'}
              </td>
              <td>{formatDate(component.dueDate)}</td>
              <td className={`status-${component.status?.toLowerCase() || 'unknown'}`}>
                {component.status || 'Unknown'}
              </td>
              <td className={`overdue-${component.overdue?.toLowerCase() || 'na'}`}>
                {component.overdue}
              </td>
              <td title={component.documentsInfo}>
                {component.documentsInfo?.length > 30 
                  ? `${component.documentsInfo.substring(0, 30)}...` 
                  : component.documentsInfo}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentsTable;