document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const videoInput = document.getElementById('video');
    if (!videoInput.files.length) {
        alert('Please upload a video file.');
        return;
    }

    const formData = new FormData();
    formData.append('video', videoInput.files[0]);

    try {
        const response = await fetch('http://127.0.0.1:5000/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload video');
        }

        const result = await response.json();
        displayResult(result);
    } catch (error) {
        console.error(error);
        alert('An error occurred while processing the video.');
    }
});

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    if (result.facial_emotions && result.facial_emotions.length > 0) {
        result.facial_emotions.forEach((emotionData, index) => {
            const frameInfo = document.createElement('p');
            frameInfo.textContent = `Frame ${index + 1}: ${emotionData.emotion} (Confidence: ${emotionData.score.toFixed(2)})`;
            resultDiv.appendChild(frameInfo);
        });
    } else {
        resultDiv.innerHTML = '<p>No facial emotions detected.</p>';
    }

    if (result.speech_emotion) {
        const speechInfo = document.createElement('p');
        speechInfo.textContent = `Speech Emotion: ${result.speech_emotion.emotion} (Confidence: ${result.speech_emotion.score.toFixed(2)})`;
        resultDiv.appendChild(speechInfo);
    }
}