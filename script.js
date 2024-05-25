// script.js
const video = document.querySelector('video');
const progress = document.querySelector('.speed-bar');
const playButton = document.querySelector('.player__button');
const volumeInput = document.querySelector('input[name="volume"]');
const playbackSpeedInput = document.querySelector('input[name="playbackRate"]');
const rewindButton = document.querySelector('.rewind');
const skipButton = document.querySelector('.skip');

function togglePlay() {
  if (video.paused) {
    video.play();
    playButton.textContent = '❚ ❚';
  } else {
    video.pause();
    playButton.textContent = '►';
  }
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progress.style.width = `${percent}%`;
}

function handleVolumeChange() {
  video.volume = volumeInput.value;
}

function handlePlaybackSpeedChange() {
  video.playbackRate = playbackSpeedInput.value;
}

function skip() {
  video.currentTime += parseFloat(skipButton.dataset.skip);
}

function rewind() {
  video.currentTime -= 10;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', () => (playButton.textContent = '❚ ❚'));
video.addEventListener('pause', () => (playButton.textContent = '►'));
video.addEventListener('timeupdate', handleProgress);

playButton.addEventListener('click', togglePlay);
volumeInput.addEventListener('input', handleVolumeChange);
playbackSpeedInput.addEventListener('input', handlePlaybackSpeedChange);
rewindButton.addEventListener('click', rewind);
skipButton.addEventListener('click', skip);