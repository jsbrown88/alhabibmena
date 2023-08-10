import React, { useState, useEffect } from 'react';

// OutputDisplay component
const OutputDisplay = ({ documentId }) => {
  // State to hold the translated text
  const [translatedText, setTranslatedText] = useState('');

  // Function to fetch translated text from the backend
  const fetchTranslatedText = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}`);
      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error('Failed to fetch translated text:', error);
    }
  };

  // Use useEffect to fetch the translated text when the component mounts
  useEffect(() => {
    fetchTranslatedText();
  }, []);

  return (
    <div id="outputDisplay">
      <h2>Translated Text</h2>
      <p>{translatedText}</p>
    </div>
  );
};

export default OutputDisplay;