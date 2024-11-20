Open the index.html file in your browser to use the application.
📝 Code Overview
HTML (Structure)
html
Copy code
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
CSS (Styling)
css
Copy code
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
JavaScript (Functionality)
