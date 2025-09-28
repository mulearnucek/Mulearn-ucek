import React, { useState } from 'react';
import { useTeamMembers } from '../hooks/useTeamMembers';

const DebugGoogleSheets: React.FC = () => {
  const { teamMembers, loading, error, refetch } = useTeamMembers();
  const [showRawData, setShowRawData] = useState(false);

  const testDirectFetch = async () => {
    const SHEET_ID = '1acu2AnsIu-4I76I-Pkg0xwTQV_mSQMlrft-oZ8fpJmA';
    const SHEET_GID = '1970990031';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
    
    try {
      console.log('Fetching from:', csvUrl);
      const response = await fetch(csvUrl);
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (response.ok) {
        const csvText = await response.text();
        console.log('Raw CSV data:');
        console.log(csvText);
        alert('Check console for CSV data!');
      } else {
        alert(`Failed to fetch: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Error - check console');
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px', borderRadius: '8px' }}>
      <h2>Google Sheets Debug Panel</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {loading ? 'Loading...' : 'Ready'}
      </div>
      
      {error && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Team Members Found:</strong> {teamMembers.length}
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={testDirectFetch} style={{ marginRight: '10px' }}>
          Test Direct Fetch
        </button>
        <button onClick={() => refetch()}>
          Refetch Data
        </button>
        <button onClick={() => setShowRawData(!showRawData)}>
          {showRawData ? 'Hide' : 'Show'} Raw Data
        </button>
      </div>
      
      {showRawData && (
        <div style={{ background: '#fff', padding: '10px', borderRadius: '4px', maxHeight: '400px', overflow: 'auto' }}>
          <h3>Raw Team Data:</h3>
          <pre>{JSON.stringify(teamMembers, null, 2)}</pre>
        </div>
      )}
      
      {teamMembers.length > 0 && (
        <div>
          <h3>All Team Member IDs (for LinkTree URLs):</h3>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{ marginBottom: '5px' }}>
                <strong>ID:</strong> <code>{member.id}</code> → <strong>Name:</strong> {member.name}
                <br />
                <small>URL: /team/{member.id}</small>
              </div>
            ))}
          </div>
          
          <h3>Sample Member Details:</h3>
          <div style={{ background: '#fff', padding: '10px', borderRadius: '4px' }}>
            <strong>Name:</strong> {teamMembers[0].name}<br/>
            <strong>ID:</strong> {teamMembers[0].id}<br/>
            <strong>Role:</strong> {teamMembers[0].role}<br/>
            <strong>Team:</strong> {teamMembers[0].team}<br/>
            <strong>Email:</strong> {teamMembers[0].email}<br/>
            <strong>Photo URL:</strong> <a href={teamMembers[0].image} target="_blank" rel="noopener noreferrer">{teamMembers[0].image}</a><br/>
            <strong>Social Links:</strong> {teamMembers[0].socialLinks?.length || 0} links
            {teamMembers[0].socialLinks && teamMembers[0].socialLinks.length > 0 && (
              <div style={{ marginLeft: '20px', marginTop: '5px' }}>
                {teamMembers[0].socialLinks.map((social, index) => (
                  <div key={index} style={{ fontSize: '12px', marginBottom: '2px' }}>
                    • {social.name}: <a href={social.url} target="_blank" rel="noopener noreferrer">{social.url}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugGoogleSheets;