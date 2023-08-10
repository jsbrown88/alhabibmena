import React, { useState } from 'react';

// This component is responsible for handling the document upload functionality
const UploadButton = () => {
  // State to hold the uploaded file
  const [file, setFile] = useState(null);

  // Function to handle file upload
  const handleUpload = (event) => {
    const uploadedFile = event.target.files[0];

    // Validate the file type (PDF or DOCX)
    if (uploadedFile && (uploadedFile.type === 'application/pdf' || uploadedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setFile(uploadedFile);
    } else {
      alert('Please upload a PDF or DOCX file.');
    }
  };

  // Function to handle file submission
  const handleSubmit = async () => {
    if (!file) {
      alert('Please upload a file before submitting.');
      return;
    }

    // Create a FormData object to hold the file data
    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the server
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully.');
      } else {
        alert('Failed to upload file.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <div id="uploadButton">
      <input type="file" onChange={handleUpload} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default UploadButton;