import React from 'react';

const LearnerSelector = ({ learners, selectedLearner, onLearnerChange, loading }) => {
  return (
    <div className="learner-section">
      <h2>👤 Select Learner</h2>
      <div className="form-group">
        <label htmlFor="learnerSelect">Choose a learner:</label>
        <select
          id="learnerSelect"
          value={selectedLearner}
          onChange={(e) => onLearnerChange(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Select a learner --</option>
          {learners.map((learner) => (
            <option key={learner.id} value={learner.id}>
              {learner.name} (ID: {learner.id})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LearnerSelector;