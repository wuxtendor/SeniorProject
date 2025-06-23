# Facial Emotion Recognition Application

This project is a Facial Emotion Recognition application that utilizes a Flask backend and a simple frontend interface. Users can upload video files, which are processed by an AI model to recognize and display the emotion depicted in the video.

## Project Structure

```
facial-emotion-recognition-app
├── backend
│   ├── app.py               # Main entry point for the Flask application
│   ├── model.py             # AI model logic for facial emotion recognition
│   ├── requirements.txt      # Dependencies for the backend
│   └── static
│       └── uploads          # Directory for temporarily storing uploaded videos
├── frontend
│   ├── index.html           # Main HTML page for the frontend
│   ├── styles
│   │   └── style.css        # CSS styles for the frontend
│   └── scripts
│       └── app.js           # JavaScript code for handling frontend logic
└── README.md                # Documentation for the project
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd facial-emotion-recognition-app
   ```

2. **Install backend dependencies:**
   Navigate to the `backend` directory and install the required packages:
   ```
   cd backend
   pip install -r requirements.txt
   ```

3. **Run the Flask application:**
   Start the Flask server:
   ```
   python app.py
   ```

4. **Access the frontend:**
   Open your web browser and go to `http://127.0.0.1:5000` to access the application.

## Usage

- Use the provided interface to upload a video file.
- After uploading, the application will process the video and display the recognized emotion.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.