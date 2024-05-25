const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
const player = document.querySelector('.flex');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.speed-bar');
const playerButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackRateSlider = document.querySelector('input[name="playbackRate"]');
const skipButtons = document.querySelectorAll('.player__button[data-skip]');
const progressFilled = document.querySelector('.progress__filled');

function togglePlay() {
  if (player.paused) {
    player.play();
    playerButton.textContent = '❚ ❚';
  } else {
    player.pause();
    playerButton.textContent = '►';
  }
}

function handleProgress() {
  const percent = (player.currentTime / player.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
  player.currentTime = scrubTime;
}

function handleVolume() {
  player.volume = volumeSlider.value;
}

function handlePlaybackRate() {
  player.playbackRate = playbackRateSlider.value;
  progressBar.textContent = `${player.playbackRate.toFixed(1)}×`;
}

function skip() {
  player.currentTime += parseFloat(this.dataset.skip);
}

player.addEventListener('click', togglePlay);
playerButton.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', handleProgress);
progress.addEventListener('click', scrub);
volumeSlider.addEventListener('input', handleVolume);
playbackRateSlider.addEventListener('input', handlePlaybackRate);
skipButtons.forEach(button => button.addEventListener('click', skip));