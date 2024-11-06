const express = require('express');
const multer = require('multer');
const app = express();
const port = 5000;

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), (req, res) => {
  // Here we will process the file and detect the emotion
  // For demonstration, we'll just return a dummy emotion
  res.json({ emotion: 'Happy' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});