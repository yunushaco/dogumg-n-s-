const heroes = document.querySelectorAll(".hero");
const musicURL = "SÖZ (instrumental)  Hüzün.mp3";
let musicActivated = false;

heroes.forEach((hero) => {
  hero.addEventListener("click", () => {
    // Müzik daha önce aktive edilmediyse aktive et
    if (!musicActivated) {
      playMusic();
      musicActivated = true;
    }
    removeActiveClasses();
    hero.classList.add("active");
  });
});

function removeActiveClasses() {
  heroes.forEach((hero) => {
    hero.classList.remove("active");
  });
}

function playMusic() {
  const audio = new Audio(musicURL);
  audio.volume = 0.2; // Ses düzeyini 0 ile 1 arasında bir değere ayarlayın
  audio.play();
}
