import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [emotion, setEmotion] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Facial Emotion Recognition System</h1>
      </header>
      <main className="App-main">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload Photo</button>
        </form>
        {emotion && <p>Detected Emotion: {emotion}</p>}
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 AI app. By Seniors group 54.</p>
      </footer>
    </div>
  );
}

export default App;