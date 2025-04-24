import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [emotion, setEmotion] = useState('');
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Create a temporary URL for the video file for preview purposes
    if (file && file.type.startsWith('video/')) {
      setUploadedVideoUrl(URL.createObjectURL(file));
    } else {
      setUploadedVideoUrl(''); // Clear the video preview if not a video
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEmotion(response.data.emotion);
    } catch (error) {
      console.error('There was an error uploading the file!', error);
    }
  };

  return (
    <div>
      <header>
        <h1>AI Facial Emotion Recognition System</h1>
      </header>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="video/*" onChange={handleFileChange} />
          <button type="submit">Upload Video</button>
        </form>
        {uploadedVideoUrl && (
          <div>
            <h3>Uploaded Video Preview:</h3>
            <video width="400" controls>
              <source src={uploadedVideoUrl} type={selectedFile?.type} />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        {emotion && <p>Detected Emotion: {emotion}</p>}
      </div>
    </div>
  );
}

export default Home;