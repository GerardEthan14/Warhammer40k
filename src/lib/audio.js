let waaaghAudio = null;

function getAudio() {
  if (!waaaghAudio) {
    waaaghAudio = new Audio('./sounds/waaagh.mp3');
    waaaghAudio.preload = 'auto';
  }
  return waaaghAudio;
}

export function playWaaagh() {
  const a = getAudio();
  a.currentTime = 0;
  a.play().catch(() => {});
}

export function stopWaaagh() {
  if (!waaaghAudio) return;
  waaaghAudio.pause();
  waaaghAudio.currentTime = 0;
}
