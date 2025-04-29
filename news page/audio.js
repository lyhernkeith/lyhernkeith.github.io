const audio = document.getElementById("bg-audio");
const audioBtn = document.getElementById("audio-btn");
let isPlaying = false;

audio.volume = 0.1; // Start with lower volume (10%)

audioBtn.addEventListener("click", () => {
  if (!isPlaying) {
    fadeInAudio();
    audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    isPlaying = true;
  } else {
    audio.pause();
    audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    isPlaying = false;
  }
});

// Fade-in function
function fadeInAudio() {
  audio.volume = 0; // Start completely silent
  audio.play();

  let targetVolume = 0.2; // Final volume after fade-in
  let fadeSpeed = 0.01; // How much volume increases per step
  let intervalTime = 100; // 100ms per step (smooth)

  let fadeAudio = setInterval(() => {
    if (audio.volume < targetVolume) {
      audio.volume = Math.min(audio.volume + fadeSpeed, targetVolume);
    } else {
      clearInterval(fadeAudio);
    }
  }, intervalTime);
}
