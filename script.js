let mediaRecorder;
let screenStream;
let audioStream;
let recordedChunks = [];

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const downloadButton = document.getElementById('download');
const videoElement = document.getElementById('recording');

// Disable the stop and download buttons initially
stopButton.disabled = true;
downloadButton.disabled = true;

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
downloadButton.addEventListener('click', downloadRecording);

async function startRecording() {
  startButton.disabled = true;
  stopButton.disabled = false;
  recordedChunks = [];

  // Capture video from screen
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  } catch (err) {
    console.error('Error accessing screen:', err);
    return;
  }

  // Capture audio from desktop (system audio)
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: { mediaSource: 'audioCapture' } });
  } catch (err) {
    console.error('Error accessing audio:', err);
    return;
  }

  // Capture audio from the microphone
  try {
    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioStream.addTrack(micStream.getAudioTracks()[0]);
  } catch (err) {
    console.error('Error accessing microphone:', err);
    return;
  }

  // Combine the video, desktop audio, and microphone audio streams
  const combinedStream = new MediaStream([...screenStream.getTracks(), ...audioStream.getTracks()]);

  mediaRecorder = new MediaRecorder(combinedStream);

  mediaRecorder.ondataavailable = function(event) {
    if (event.data.size > 0) {
      recordedChunks.push(event.data);
    }
  };

  mediaRecorder.onstop = function() {
    startButton.disabled = false;
    stopButton.disabled = true;
    downloadButton.disabled = false;

    const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
    videoElement.src = URL.createObjectURL(videoBlob);

    // Stop all streams
    screenStream.getTracks().forEach(track => track.stop());
    audioStream.getTracks().forEach(track => track.stop());
  };

  mediaRecorder.start();
}

function stopRecording() {
  startButton.disabled = false;
  stopButton.disabled = true;
  downloadButton.disabled = false;

  mediaRecorder.stop();
}

function downloadRecording() {
  const currentDate = new Date();
  const dateString = currentDate.toISOString().replace(/:/g, "-").split(".")[0];
  const fileName = `recordscreen.me-${dateString}.webm`;

  const blob = new Blob(recordedChunks, { type: 'video/webm' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
