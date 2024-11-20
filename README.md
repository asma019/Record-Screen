
# Record Screen

![Record Screen](https://recordscreen.me/favicon.ico)

**Record Screen** is a free and open-source online screen recording tool. It allows users to capture and share their screens effortlessly without requiring any software installation. With its user-friendly interface and high-quality output, it's ideal for tutorials, presentations, and more.

## 🌐 Demo

Try it live at: [https://recordscreen.me](https://recordscreen.me)

---

## 📄 Features

- **No Installation Required**: Works directly in your browser.
- **User-Friendly**: Simple controls to start, stop, and download recordings.
- **High-Quality Output**: Outputs crisp and clear screen recordings.
- **Privacy-Friendly**: No data is uploaded or stored on the server.
- **Free Forever**: Enjoy all features without any cost.

---

## 📖 Documentation

### 🛠 How It Works

1. Click **Start Recording** to begin capturing your screen.
2. Use the **Stop Recording** button to end the recording.
3. Save your recording by clicking **Download**.

### ⚙️ Technical Details

- **Frontend**:
  - HTML for structure
  - CSS for styling
  - JavaScript for recording functionality

- **Browser Support**:
  - Requires a modern browser that supports `navigator.mediaDevices.getDisplayMedia`.

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### Prerequisites

Ensure you have a modern browser installed.

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/asma019/Record-Screen.git
   cd Record-Screen
   ```

2. Open the `index.html` file in your browser to use the application.

---

## 📝 Code Overview

### HTML (Structure)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Record Screen - Capture and Share Your Screen</title>
    <meta name="description" content="Record your screen for free with our online screen recorder. Capture and share your screen easily.">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Free Record Screen</h1>
        </header>
        <div class="video-container">
            <video id="recording" controls></video>
            <div class="controls">
                <button id="start" class="record-btn">Start Recording</button>
                <button id="stop" class="record-btn" disabled>Stop Recording</button>
                <button id="download" class="download-btn" disabled>Download</button>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### CSS (Styling)

```css
body {
    font-family: 'Roboto', Arial, sans-serif;
    background-color: #f8f8f8;
    margin: 0;
    padding: 0;
    color: #333;
}

.container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}
```

### JavaScript (Functionality)

```javascript
let mediaRecorder;
let screenStream;
let recordedChunks = [];

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const downloadButton = document.getElementById('download');
const videoElement = document.getElementById('recording');

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
downloadButton.addEventListener('click', downloadRecording);

function startRecording() {
  startButton.disabled = true;
  stopButton.disabled = false;
  recordedChunks = [];
  navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
    .then(stream => {
      screenStream = stream;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        videoElement.src = URL.createObjectURL(blob);
        stopButton.disabled = true;
        downloadButton.disabled = false;
        screenStream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
    })
    .catch(console.error);
}

function stopRecording() {
  mediaRecorder.stop();
}

function downloadRecording() {
  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `recordscreen-${new Date().toISOString()}.webm`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
```

---

## 🛡 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

---

## 📧 Contact

For questions or feedback, email us at [support@recordscreen.me](mailto:support@recordscreen.me).

---

Start recording your screen today with **Record Screen**!
