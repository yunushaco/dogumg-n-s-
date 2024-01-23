const countdownEls = document.querySelectorAll(".countdown")
countdownEls.forEach(countdownEl => createCountdown(countdownEl))

function createCountdown(countdownEl){
  const target = new Date(new Date(countdownEl.dataset.targetDate).toLocaleString('en', ))
  const parts = {
    days: {text: ["Gün","day"], dots: 30},
    hours: {text: ["Saat","hour"], dots: 24},
    minutes: {text: ["Dakika","minute"], dots: 60},
    seconds: {text: ["Saniye","second"], dots: 60},
  }

  Object.entries(parts).forEach(([key, value])=>{
    const partEl = document.createElement("div");
    partEl.classList.add("part", key);
    partEl.style.setProperty("--dots", value.dots);
    value.element = partEl;

    const remainingEl = document.createElement("div");
    remainingEl.classList.add("remaining");
    remainingEl.innerHTML = `
      <span class="number"></span>
      <span class="text"></span>
    `
    partEl.append(remainingEl);
    for(let i = 0; i < value.dots; i++){
      const dotContainerEl = document.createElement("div");
      dotContainerEl.style.setProperty("--dot-idx", i);
      dotContainerEl.classList.add("dot-container")
      const dotEl = document.createElement("div");
      dotEl.classList.add("dot")
      dotContainerEl.append(dotEl);
      partEl.append(dotContainerEl);
    }
    countdownEl.append(partEl);
  })
  getRemainingTime(target, parts)
}

function getRemainingTime(target, parts, first=true){
  const now = new Date()
  if(first) console.log({target, now})
  const remaining = {}
  let seconds = Math.floor((target - (now))/1000);
  let minutes = Math.floor(seconds/60);
  let hours = Math.floor(minutes/60);
  let days = Math.floor(hours/24);
  hours = hours-(days*24);
  minutes = minutes-(days*24*60)-(hours*60);
  seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);
  Object.entries({days, hours, minutes, seconds}).forEach(([key, value])=>{
    const remaining = parts[key].element.querySelector(".number");
    const text = parts[key].element.querySelector(".text");
    remaining.innerText = value;
    text.innerText = parts[key].text[Number(value==1)]
    const dots = parts[key].element.querySelectorAll(".dot")
    dots.forEach((dot, idx)=>{
      dot.dataset.active = idx <= value;
      dot.dataset.lastactive = idx == value;
    })
  })
  if(now <= target){
    window.requestAnimationFrame(()=>{
      getRemainingTime(target, parts, false)
    });
  }
}
/*----------------------------------------------------------------------------------------------------------------------------------*/
var currentCommand = "";

function appendToCommand(button, letters) {
  currentCommand += letters;
  button.classList.add("clicked");
  playClickSound();
  startBackgroundMusic();
}

function handleCommand() {
  var messageElement = document.getElementById("message");

  if (currentCommand === "AH01B00E") {
    messageElement.innerText = "Başarılı giriş! Yönlendiriliyor...";
    // Burada istediğiniz sayfaya yönlendirme işlemini gerçekleştirebilirsiniz.
    messageElement.style.color = "white";
    setTimeout(function () {
        redirectToNewPage();
      }, 2000);
  } else {
    messageElement.innerText = "Hatalı şifre! Lütfen tekrar deneyin.";
    messageElement.style.color = "white";
  }

  // Şifreyi temizle
  currentCommand = "";

  // Butonlardan geçiş sınıfını kaldır
  resetButtonState();
}

// Butonlardan geçiş sınıfını kaldırmak için
function resetButtonState() {
  var buttons = document.getElementsByClassName("btn");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("clicked"); // Değişiklik: btn-active yerine clicked sınıfını kaldırıyoruz
  }}

  function redirectToNewPage() {
    // Yönlendirmek istediğiniz sayfanın adını ve yolu ile değiştirin
    var newPageURL = "loadingpage.html";
  
    // Yönlendirme yap
    window.location.href = newPageURL;
  }
  /*----------------------------------------------------------------------------------------------------------------------------------*/

  function playClickSound() {
    const clickSound = document.getElementById("clickSound");
    clickSound.currentTime = 0; // Sesin başlangıcına geri dön
    clickSound.play();
  }
  function startBackgroundMusic() {
    const backgroundMusic = document.getElementById("backgroundMusic");
    backgroundMusic.play()
      .then(() => {
        // Müzik başlatıldıktan sonra başarılı bir şekilde tamamlandıysa işlemleri yapabilirsiniz.
      })
      .catch(error => {
        console.error("Müzik başlatma hatası:", error);
      });

    // Ses dinleme bitimini kontrol et ve döngüye al
    backgroundMusic.addEventListener("ended", function () {
      backgroundMusic.play();
    });
  }

  
/*----------------------------------------------------------------------------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function () {
    startFlickerEffect(); // Git-gel efektini başlat
  });

  function startFlickerEffect() {
    // Git-gel efektini belirli aralıklarla (milisaniye cinsinden) çıkarmak için setInterval kullanın
    const intervalId = setInterval(applyFlickerEffect, 7000); // İnterval'ı ihtiyaca göre ayarlayın (örneğin, 5000 milisaniye veya 5 saniye)

    // İsteğe bağlı olarak, git-gel efektini belirli bir süre sonra durdurabilirsiniz
    // Aşağıdaki satırın yorumunu kaldırın ve süreyi (milisaniye cinsinden) ihtiyacınıza göre ayarlayın
    // setTimeout(() => clearInterval(intervalId), 60000); // 60 saniye sonra durdur
  }

  function applyFlickerEffect() {
    const terminalElement = document.getElementById("terminal");
    terminalElement.classList.add("flicker-effect");

    // Belirli bir süre sonra git-gel efektini kaldırın
    setTimeout(() => {
      terminalElement.classList.remove("flicker-effect");
    }, 500); // 0.5 saniye sonra git-gel efektini kaldır
  }
 
  document.addEventListener("DOMContentLoaded", function () {
    setInterval(startFadeInOutEffect, 5000); // 5 saniyede bir efekti başlat
  });

  function startFadeInOutEffect() {
    const element = document.querySelector(".sayac");

    // Her çağrıda efekti tekrar başlat
    element.classList.add("fade-in-out");

    // Belirli bir süre sonra efekti kaldırmak için setTimeout kullanın
    setTimeout(() => {
      element.classList.remove("fade-in-out");
    }, 2000); // 1 saniye sonra efekti kaldır
  }