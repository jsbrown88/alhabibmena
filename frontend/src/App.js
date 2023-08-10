import React, { useState } from 'react';
import UploadButton from './components/UploadButton';
import DocumentPreview from './components/DocumentPreview';
import OutputDisplay from './components/OutputDisplay';
import LogoPlaceholder from './components/LogoPlaceholder';
import './styles/App.css';

function App() {
  // State to hold the uploaded document
  const [document, setDocument] = useState(null);

  // State to hold the translated text
  const [translatedText, setTranslatedText] = useState('');

  // Function to handle document upload
  const handleUpload = (uploadedDocument) => {
    setDocument(uploadedDocument);
    // TODO: Call backend API to process the document and get translated text
  };

  // Function to handle successful translation
  const handleTranslation = (translation) => {
    setTranslatedText(translation);
  };

  return (
    <div className="App">
      <header className="App-header">
        <LogoPlaceholder />
      </header>
      <main>
        <UploadButton onUpload={handleUpload} />
        {document && <DocumentPreview document={document} />}
        {translatedText && <OutputDisplay text={translatedText} />}
      </main>
    </div>
  );
}

export default App;