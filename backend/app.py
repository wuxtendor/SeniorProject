from flask import Flask, render_template, request
from model import extract_audio, extract_frames, analyze_facial_emotions, analyze_speech_emotions
import os
from collections import Counter

app = Flask(__name__)
UPLOAD_FOLDER = "static/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def home():
    return render_template('index.html', result=None)

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return render_template('index.html', result={"error": "No video file provided"})

    video = request.files['video']
    video_path = os.path.join(app.config['UPLOAD_FOLDER'], "video_angry.mp4")
    video.save(video_path)

    print(f"Video uploaded and saved as {video_path}")

    # Process video
    audio_path = extract_audio(video_path)
    frame_paths = extract_frames(video_path, frame_interval=10)

    # Analyze emotions
    facial_emotions = analyze_facial_emotions(frame_paths)
    speech_emotions = analyze_speech_emotions(audio_path)  # Get all speech emotions

    # Debug: Print speech emotions
    print(f"Speech Emotions: {speech_emotions}")

    # Determine the most frequent facial emotion
    if facial_emotions:
        emotion_counts = Counter([emotion["emotion"] for emotion in facial_emotions])
        most_frequent_emotion = emotion_counts.most_common(1)[0][0]  # Get the most frequent emotion
    else:
        most_frequent_emotion = None

    # Combine results
    result = {
        "facial_emotion": most_frequent_emotion,
        "speech_emotions": speech_emotions  # Include all speech emotions
    }

    return render_template('index.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)