const correctHerbs = ["凝血草", "靈參", "玄犛肝", "岩獐角", "圓魄草"];
let selectedHerbs = [];

const heatSlider = document.getElementById("heat");
const heatLabel = document.getElementById("heatLabel");
const brewBtn = document.getElementById("brew-btn");
const resultDiv = document.getElementById("result");
const fire = document.getElementById("fire");
const brewSound = document.getElementById("brewSound");

const heatMap = {
  1: "低溫",
  2: "中溫",
  3: "高溫"
};

heatSlider.addEventListener("input", () => {
  heatLabel.textContent = heatMap[heatSlider.value];
});

// 藥材點選邏輯
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

// 煉丹邏輯
brewBtn.addEventListener("click", () => {
  if (selectedHerbs.length === 0) {
    alert("請至少選擇一種藥材！");
    return;
  }

  brewBtn.disabled = true;
  fire.style.display = "block";
  brewSound.currentTime = 0;
  brewSound.play();
  resultDiv.textContent = "煉丹中...";

  setTimeout(() => {
    fire.style.display = "none";
    brewSound.pause();

    const heat = parseInt(heatSlider.value);
    const correctCount = correctHerbs.filter(h => selectedHerbs.includes(h)).length;

    let pills = 0;

    if (correctCount < 5) {
      pills = 0;
    } else if (heat === 3) {
      pills = Math.floor(Math.random() * 20) + 1; // 1~20
    } else {
      pills = Math.floor(Math.random() * 5); // 0~4
    }

    let message = `你煉出了 ${pills} 顆凝血丹。`;

    if (pills >= 5) {
      message += " ✅ 通過考核！";
    } else {
      message += " ❌ 考核失敗。";
    }

    resultDiv.textContent = message;
    resetSelection();
    brewBtn.disabled = false;
  }, 15000);
});

function resetSelection() {
  selectedHerbs = [];
  document.querySelectorAll(".herb-btn").forEach(btn => btn.classList.remove("selected"));
}
