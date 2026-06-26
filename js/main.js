const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(opened));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const current = location.pathname.split("/").pop() || "index.html";
const activePage = current === "machine.html" ? "machines.html" : current;
document.querySelectorAll(".site-nav a").forEach(link => {
  if (link.getAttribute("href") === activePage) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

const searchInput = document.querySelector("#machineSearch");
const machineGrid = document.querySelector("#machineGrid");
const machineCards = document.querySelectorAll(".machine-card");
const filterButtons = document.querySelectorAll(".type-filter button");
let activeMachineFilter = "all";


const urlParams = new URLSearchParams(window.location.search);
const companyParam = urlParams.get('company');
if (companyParam && machineCards.length) {
  // 按公司筛选：支持 sega / bemani / other
  machineCards.forEach(card => {
    const company = (card.dataset.company || 'other').toLowerCase();
    const match = company === companyParam.toLowerCase();
    card.classList.toggle('is-hidden', !match);
    card.hidden = !match;
  });
}

// 如果在 company.html 页面，设置页面标题与引导文字
if (location.pathname.split('/').pop() === 'company.html' && companyParam) {
  const titleMap = { sega: 'SEGA 系', bemani: 'BEMANI 系', other: '其他系' };
  const display = titleMap[companyParam.toLowerCase()] || companyParam;
  const heroTitle = document.getElementById('companyTitle');
  const heroIntro = document.getElementById('companyIntro');
  const backBtn = document.getElementById('backToCategories');
  if (heroTitle) heroTitle.textContent = `${display} 机台一览`;
const heroIntroMap = {
  sega: `
    SEGA 自 20 世纪末进入街机音乐游戏领域，逐渐形成以触摸、滑动和体感交互为核心的产品路线。代表作品包括 <strong>maimai</strong>、<strong>CHUNITHM</strong> 与 <strong>Ongeki</strong>，强调炫目的灯光反馈、角色演出和身体动作，比传统按键音游更具舞台感与观赏性，也成为近年来最具代表性的街机音游体系之一。
  `,
  bemani: `
    BEMANI 是 Konami 旗下的音乐游戏品牌，也是现代街机音游的重要起点。自 beatmania 诞生以来，陆续推出 IIDX、Sound Voltex、pop'n music、DDR 等经典作品，奠定了按键、转盘、旋钮等操作体系，更偏向技术性、竞技性与高难度谱面文化。
  `,
  other: `
    除 SEGA 与 BEMANI 外，还有 Bandai Namco、Marvelous、TAITO 等厂商推出了各具特色的街机音游，如太鼓达人、WACCA、jubeat 等。这些机台拥有更加多样的控制方式与美术风格，共同构成了街机音游丰富的发展生态。
  `
};

if (heroIntro) {
    heroIntro.innerHTML = heroIntroMap[companyParam.toLowerCase()];
}
  
  if (backBtn) backBtn.href = 'categories.html';
}


function refreshMachineCards() {
  if (!machineCards.length) return;

  const value = searchInput ? searchInput.value.trim().toLowerCase() : "";
  let visibleCount = 0;

  machineCards.forEach(card => {
    const groups = (card.dataset.group || "").split(/\s+/);
    const filterMatched = activeMachineFilter === "all" || groups.includes(activeMachineFilter);
    const text = `${card.innerText} ${card.dataset.keywords || ""}`.toLowerCase();
    const searchMatched = !value || text.includes(value);
    const matched = filterMatched && searchMatched;

    card.classList.toggle("is-hidden", !matched);
    card.hidden = !matched;
    if (matched) visibleCount += 1;
  });

  const empty = machineGrid ? machineGrid.querySelector(".search-empty") : null;
  if (empty) empty.hidden = visibleCount !== 0;
}

if (searchInput && machineCards.length && machineGrid) {
  const empty = document.createElement("div");
  empty.className = "search-empty";
  empty.textContent = "没有找到对应机台，可以试试输入玩法关键词：触摸、旋钮、踏板、鼓、矩阵。";
  empty.hidden = true;
  machineGrid.appendChild(empty);

  searchInput.addEventListener("input", refreshMachineCards);
}

const typeCards = document.querySelectorAll(".type-card");

if (filterButtons.length && typeCards.length) {
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeMachineFilter = button.dataset.filter;

      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      refreshMachineCards();
    });
  });
}

const galleryLoop = document.querySelector("[data-gallery-loop]");

if (galleryLoop) {
  const originalSlots = Array.from(galleryLoop.querySelectorAll(".pin-slot"));
  const slotData = originalSlots.map(slot => ({
    className: slot.className,
    src: slot.querySelector('img') ? slot.querySelector('img').src : '',
  })).filter(item => item.src);

  galleryLoop.innerHTML = '';

  function appendSlot(data) {
    const slot = document.createElement('div');
    slot.className = data.className;
    const img = document.createElement('img');
    img.src = data.src;
    img.alt = '';
    slot.appendChild(img);
    galleryLoop.appendChild(slot);
    return slot;
  }

  function appendRound() {
    const round = slotData.slice().sort(() => Math.random() - 0.5);
    round.forEach(data => appendSlot(data));
  }

  appendRound();
  let slots = Array.from(galleryLoop.querySelectorAll('.pin-slot'));

  let activeSlot = 0;
  if (slots.length) {
    slots[activeSlot].classList.add('is-live');

    window.setInterval(() => {
      slots[activeSlot].classList.remove('is-live');
      slots = Array.from(galleryLoop.querySelectorAll('.pin-slot'));
      activeSlot = (activeSlot + 1) % slots.length;
      slots[activeSlot].classList.add('is-live');
    }, 1300);
  }

  const sentinel = document.createElement('div');
  sentinel.className = 'gallery-sentinel';
  galleryLoop.after(sentinel);

  let loadingMore = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || loadingMore) return;
      loadingMore = true;
      observer.unobserve(sentinel);

      appendRound();
      slots = Array.from(galleryLoop.querySelectorAll('.pin-slot'));

      window.requestAnimationFrame(() => {
        loadingMore = false;
        observer.observe(sentinel);
      });
    });
  }, {
    rootMargin: '100px',
    threshold: 0.1,
  });

  observer.observe(sentinel);
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}

const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)");

document.querySelectorAll(".tilt-card").forEach(card => {
  card.addEventListener("pointermove", event => {
    if (!canTilt.matches) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translate3d(${x * 5}px, ${y * 5 - 4}px, 0) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const sparkleContainer = (() => {
  const existing = document.querySelector("#sparkle-container");
  if (existing) return existing;

  const node = document.createElement("div");
  node.id = "sparkle-container";
  document.body.appendChild(node);
  return node;
})();

let sparkleThrottled = false;

document.addEventListener("mousemove", event => {
  if (sparkleThrottled || reducedMotion.matches) return;

  sparkleThrottled = true;
  window.setTimeout(() => {
    sparkleThrottled = false;
  }, 55);

  const sparkle = document.createElement("span");
  sparkle.className = "sparkle";

  const colors = ["#ff69b4", "#87ceeb", "#b8ef65", "#fff36d", "#dda0dd"];
  const offsetX = (Math.random() - 0.5) * 22;
  const offsetY = (Math.random() - 0.5) * 22;

  sparkle.style.left = `${event.pageX + offsetX}px`;
  sparkle.style.top = `${event.pageY + offsetY}px`;
  sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

  sparkleContainer.appendChild(sparkle);

  window.setTimeout(() => {
    sparkle.remove();
  }, 900);
});
// 监听全局鼠标点击事件，爆开黑、粉、黄三色交织的像素颗粒
document.addEventListener('click', function(e) {
  // 定义爆开的像素碎屑颜色池（符合全站黑、粉、黄配色）
  const colors = ['#ff007f', '#1a1a24', '#ffcc00', '#ffffff'];
  // 每次点击生成 6-8 个像素方块
  const particleCount = 8; 

  for (let i = 0; i < particleCount; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'click-pixel';
    
    // 随机选择一个主题色
    pixel.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    // 定位到鼠标点击的精确坐标
    pixel.style.left = e.pageX - 3 + 'px';
    pixel.style.top = e.pageY - 3 + 'px';
    
    // 随机计算爆发的 X 轴和 Y 轴像素偏移量（模仿 8-bit 游戏打击特效）
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 30 + 20; // 扩散半径
    const dx = Math.cos(angle) * speed + 'px';
    const dy = (Math.sin(angle) * speed + 15) + 'px'; // 稍微加一点重力下坠感
    
    // 将随机值传给 CSS 变量
    pixel.style.setProperty('--dx', dx);
    pixel.style.setProperty('--dy', dy);
    
    document.body.appendChild(pixel);
    
    // 动画播放完毕后自动移除节点，防止网页卡顿
    setTimeout(() => {
      pixel.remove();
    }, 450);
  }
});
// ==========================================
// 1. 背景音乐 (BGM) 控制逻辑
// ==========================================
const bgm = document.getElementById('bgm-audio');
const musicBtn = document.getElementById('music-btn');
const musicStatus = document.getElementById('music-status');

if (musicBtn && bgm) {
  // 设置背景音乐音量，别太大声（0.3 = 30% 音量）
  bgm.volume = 0.3;

  musicBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // 防止触发点击像素点特效
    
    if (bgm.paused) {
      bgm.play();
      musicStatus.innerText = "ON 🕹️";
      musicBtn.classList.add('playing');
    } else {
      bgm.pause();
      musicStatus.innerText = "OFF";
      musicBtn.classList.remove('playing');
    }
  });
}

// ==========================================
// 2. 纯代码合成：8-Bit 街机点击音效
// ==========================================
function playPixelSound() {
  // 创建音频上下文
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();
  
  // 创建振荡器（发声核心）
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  // 使用 square (方波) 或 sawtooth (锯齿波)，这是 8-bit 音乐的标志性复古波形
  osc.type = 'square'; 
  
  // 模拟街机金币声/打击声：频率在极短时间内快速上升
  osc.frequency.setValueAtTime(400, ctx.currentTime); // 起始音高
  osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08); // 骤增音高
  
  // 音量迅速衰减（避免爆音，做出清脆的啪嗒声）
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  osc.start();
  osc.stop(ctx.currentTime + 0.1); // 0.1秒后立刻停止，干净利落
}

// ==========================================
// 3. 将音效融合进你之前的“点击像素爆开”函数中
// ==========================================
document.addEventListener('click', function(e) {
  // [此处保留你之前写的生成 click-pixel 颗粒的代码] ...
  
  // 触发点击事件时，调用上面写好的复古发声器
  playPixelSound();
});
// ==========================================
// 动态像素声波流体背景生成器
// ==========================================
const canvas = document.getElementById('pixel-flow-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let animationFrameId;

  // 让画布分辨率完美对齐浏览器窗口
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let tick = 0;
  
  // 粒子的间距：12px 一个像素点，完美对齐复古感
  const dotSpacing = 12; 
  
  function drawPixelFlow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tick += 0.005; // 控制流体波动的速度

    // 双重循环在屏幕上排满点阵
    for (let x = 0; x < canvas.width; x += dotSpacing) {
      for (let y = 0; y < canvas.height; y += dotSpacing) {
        
        // 核心数学公式：利用噪声波模拟出图片中复杂的流体曲线
        const noise1 = Math.sin(x * 0.003 + tick) * Math.cos(y * 0.002 + tick);
        const noise2 = Math.sin(y * 0.005 - tick * 1.5) * Math.sin(x * 0.002);
        const wave = noise1 + noise2;

        // 只有符合波峰波谷波纹特征的地方才渲染成大像素点，还原图片中的条纹断层感
        if (Math.abs(wave) > 0.4 && Math.abs(wave) < 0.7) {
          // 交替使用粉色和深色点
          ctx.fillStyle = (x + y) % 2 === 0 ? '#ff007f' : '#1a1a24';
          
          // 画出一个个 3x3 绝对直角的像素颗粒点
          ctx.fillRect(x, y, 3, 3);
        }
      }
    }
    
    animationFrameId = requestAnimationFrame(drawPixelFlow);
  }

  drawPixelFlow();
}
