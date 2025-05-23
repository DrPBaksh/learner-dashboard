import React from 'react';

const AuthSection = ({ authCookies, onAuthChange }) => {
  return (
    <div className="auth-section">
      <h2>🔐 Authentication</h2>
      <div className="form-group">
        <label htmlFor="authCookies">
          Paste your authentication cookies (ai_user, ASP.NET_SessionId, AUTHTOKEN):
        </label>
        <textarea
          id="authCookies"
          value={authCookies}
          onChange={(e) => onAuthChange(e.target.value)}
          placeholder="ai_user=DYsJV|2024-11-13T08:33:13.199Z; ASP.NET_SessionId=hbcepp0a5cfgwqhfpajqa0hu; AUTHTOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        />
      </div>
      <div className="auth-help">
        <p><strong>How to get your cookies:</strong></p>
        <ol>
          <li>Log in to the Corndel Aptem platform</li>
          <li>Open browser developer tools (F12)</li>
          <li>Go to Application/Storage → Cookies</li>
          <li>Copy the values for ai_user, ASP.NET_SessionId, and AUTHTOKEN</li>
          <li>Paste them in the format shown above</li>
        </ol>
      </div>
    </div>
  );
};

export default AuthSection;