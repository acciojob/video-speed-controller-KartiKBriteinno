// Get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackRateSlider = player.querySelector('input[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');

// Functions
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

volumeSlider.addEventListener('change', handleRangeUpdate);
volumeSlider.addEventListener('mousemove', handleRangeUpdate);

playbackRateSlider.addEventListener('change', handleRangeUpdate);
playbackRateSlider.addEventListener('mousemove', handleRangeUpdate);

skipButtons.forEach(button => button.addEventListener('click', skip));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => e.buttons && scrub(e));
