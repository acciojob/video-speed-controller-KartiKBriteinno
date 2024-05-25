const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volume = player.querySelector('[name="volume"]');
const playbackRate = player.querySelector('[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');
let isPlaying = false;

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
volume.addEventListener('change', handleRangeUpdate);
volume.addEventListener('mousemove', handleRangeUpdate);
playbackRate.addEventListener('change', handleRangeUpdate);
playbackRate.addEventListener('mousemove', handleRangeUpdate);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

skipButtons.forEach(button => button.addEventListener('click', skip));



describe('Custom Video Player', () => {
  it('should load the video player and control elements', () => {
    cy.visit('index.html');
    cy.get('.viewer').should('have.prop', 'paused', true);
    cy.get('.toggle').should('contain', '►');
  });

  it('should play and pause the video', () => {
    cy.get('.toggle').click();
    cy.get('.viewer').should('have.prop', 'paused', false);
    cy.get('.toggle').should('contain', '❚ ❚');
    cy.get('.toggle').click();
    cy.get('.viewer').should('have.prop', 'paused', true);
    cy.get('.toggle').should('contain', '►');
  });

  it('should change the volume and playback rate', () => {
    cy.get('[name="volume"]').invoke('val', 0.5).trigger('change');
    cy.get('.viewer').should('have.prop', 'volume', 0.5);
    cy.get('[name="playbackRate"]').invoke('val', 1.5).trigger('change');
    cy.get('.viewer').should('have.prop', 'playbackRate', 1.5);
  });

  it('should skip forward and backward', () => {
    cy.get('.viewer').invoke('prop', 'currentTime', 50);
    cy.get('[data-skip="-10"]').click();
    cy.get('.viewer').should('have.prop', 'currentTime', 40);
    cy.get('[data-skip="25"]').click();
    cy.get('.viewer').should('have.prop', 'currentTime', 65);
  });

  it('should update the progress bar as the video plays', () => {
    cy.get('.viewer').invoke('prop', 'currentTime', 50);
    cy.get('.viewer').invoke('prop', 'duration', 100);
    cy.get('.progress__filled').should('have.css', 'flex-basis', '50%');
  });
});
