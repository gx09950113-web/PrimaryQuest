const correctHerbs = ["凝血草", "靈參", "玄犛肝", "岩獐角", "圓魄草"];
let selectedHerbs = [];

const heatSlider = document.getElementById("heat");
const heatLabel = document.getElementById("heatLabel");
const brewBtn = document.getElementById("brew-btn");
const resultDiv = document.getElementById("result");
const fire = document.getElementById("fire");
const brewSound = document.getElementById("brewSound");
const successSound = document.getElementById("successSound");
const failSound = document.getElementById("failSound");
const resultOverlay = document.getElementById("result-overlay");

const heatMap = {
  1: "低溫",
  2: "中溫",
  3: "高溫"
};

// 初始化
heatLabel.textContent = heatMap[heatSlider.value];
fire.style.display = "none";

// 火候顯示
heatSlider.addEventListener("input", () => {
  heatLabel.textContent = heatMap[heatSlider.value];
});

// 選藥材
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

// 開始煉丹
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
      successSound.play();
      showResultEffect("success");
    } else {
      message += " ❌ 考核失敗。";
      failSound.play();
      showResultEffect("fail");
    }

    resultDiv.textContent = message;
    resetSelection();
    brewBtn.disabled = false;
    setHerbButtonsDisabled(false);
  }, 15000);
});

function resetSelection() {
  selectedHerbs = [];
  document.querySelectorAll(".herb-btn").forEach(btn => btn.classList.remove("selected"));
}

function setHerbButtonsDisabled(state) {
  document.querySelectorAll(".herb-btn").forEach(btn => btn.disabled = state);
}

// ✅ 顯示成功／失敗動畫 2 秒
function showResultEffect(type) {
  const img = document.createElement("img");
  img.classList.add("result-gif");

  if (type === "success") {
    img.src = "assets/images/lighting.gif";
  } else if (type === "fail") {
    img.src = "assets/images/X.png";
  }

  resultOverlay.appendChild(img);

  setTimeout(() => {
    resultOverlay.removeChild(img);
  }, 2000);
}
