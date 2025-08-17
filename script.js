const correctHerbs = ["凝血草", "靈參", "玄犛肝", "岩獐角", "圓魄草"];
let selectedHerbs = [];

const heatSlider = document.getElementById("heat");
const heatLabel = document.getElementById("heatLabel");
const brewBtn = document.getElementById("brew-btn");
const resultDiv = document.getElementById("result");
const fire = document.getElementById("fire");
const successImg = document.getElementById("success-img");
const failImg = document.getElementById("fail-img");
const brewSound = document.getElementById("brewSound");
const successSound = document.getElementById("successSound");
const failSound = document.getElementById("failSound");

const heatMap = {
  1: "低溫",
  2: "中溫",
  3: "高溫"
};

heatLabel.textContent = heatMap[heatSlider.value];
fire.style.display = "none";
successImg.style.display = "none";
failImg.style.display = "none";

heatSlider.addEventListener("input", () => {
  heatLabel.textContent = heatMap[heatSlider.value];
});

document.querySelectorAll(".herb-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const herb = btn.dataset.name;
    if (btn.classList.contains("selected")) {
      btn.classList.remove("selected");
      selectedHerbs = selectedHerbs.filter(h => h !== herb);
    } else {
      if (selectedHerbs.length < 8) {
        btn.classList.add("selected");
        selectedHerbs.push(herb);
      }
    }
  });
});

brewBtn.addEventListener("click", () => {
  if (selectedHerbs.length === 0) {
    alert("請至少選擇一種藥材！");
    return;
  }

  brewBtn.disabled = true;
  setHerbButtonsDisabled(true);
  fire.style.display = "block";
  brewSound.currentTime = 0;
  brewSound.play();
  resultDiv.textContent = "火候正旺！正在凝丹⋯⋯";

  setTimeout(() => {
    fire.style.display = "none";
    brewSound.pause();

    const heat = parseInt(heatSlider.value);
    const correctCount = correctHerbs.filter(h => selectedHerbs.includes(h)).length;

    let pills = 0;
    if (correctCount < 5) {
      pills = 0;
    } else if (heat === 3) {
      pills = Math.floor(Math.random() * 20) + 1;
    } else {
      pills = Math.floor(Math.random() * 5);
    }

    let message = `你煉出了 ${pills} 顆凝血丹。`;

    if (pills >= 5) {
      message += " ✅ 通過考核！";
      successSound.play();
      showFeedbackImage(successImg);
    } else {
      message += " ❌ 考核失敗。";
      failSound.play();
      showFeedbackImage(failImg);
    }

    resultDiv.textContent = message;
    resetSelection();
    brewBtn.disabled = false;
    setHerbButtonsDisabled(false);
  }, 8000);
});

function resetSelection() {
  selectedHerbs = [];
  document.querySelectorAll(".herb-btn").forEach(btn => btn.classList.remove("selected"));
}

function setHerbButtonsDisabled(state) {
  document.querySelectorAll(".herb-btn").forEach(btn => btn.disabled = state);
}

function showFeedbackImage(img) {
  img.style.display = "block";
  setTimeout(() => {
    img.style.display = "none";
  }, 2000);
}