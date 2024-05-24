const video = document.getElementById('myVideo');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressFilled = document.querySelector('.progress__filled');
const volumeSlider = document.getElementById('volumeSlider');
const playbackSpeed = document.getElementById('playbackSpeed');
const rewind10Btn = document.getElementById('rewind10');
const forward25Btn = document.getElementById('forward25');

function updatePlayPauseIcon() {
  if (video.paused) {
    playPauseBtn.textContent = '►';
  } else {
    playPauseBtn.textContent = '❚ ❚';
  }
}

function updateProgress() {
  const progress = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${progress}%`;
}

playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  updatePlayPauseIcon();
});

video.addEventListener('play', updatePlayPauseIcon);
video.addEventListener('pause', updatePlayPauseIcon);
video.addEventListener('timeupdate', updateProgress);

volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
});

playbackSpeed.addEventListener('input', () => {
  video.playbackRate = playbackSpeed.value;
});

rewind10Btn.addEventListener('click', () => {
  video.currentTime -= 10; // rewind 10 seconds
});

forward25Btn.addEventListener('click', () => {
  video.currentTime += 25; // skip forward 25 seconds
});