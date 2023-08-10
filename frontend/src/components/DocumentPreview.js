import React, { useState, useEffect } from 'react';
import axios from 'axios';

// DocumentPreview component
const DocumentPreview = () => {
  const [documentData, setDocumentData] = useState(null);

  // Fetch document data when component mounts
  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const response = await axios.get('/api/document');
        setDocumentData(response.data);
      } catch (error) {
        console.error('Error fetching document data:', error);
      }
    };

    fetchDocumentData();
  }, []);

  // Render document preview or loading message
  return (
    <div id="documentPreview">
      {documentData ? (
        <div>
          <h2>Document Preview</h2>
          <p>{documentData.text}</p>
        </div>
      ) : (
        <p>Loading document...</p>
      )}
    </div>
  );
};

export default DocumentPreview;