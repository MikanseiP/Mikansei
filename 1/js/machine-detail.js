/* ===================================================
   街机音游档案馆 - 核心动态数据解析与渲染引擎 (统一视觉画廊防崩溃版)
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const machineId = params.get('id') ? params.get('id').toLowerCase().trim() : '';
    
    const container = document.querySelector('[data-machine-detail]');
    if (!container) return;

    // 档案馆全机台绝密核心数据库
    const machineDatabase = {
        "wacca": { title: "WACCA", badge: "Touch 01", folder: "wacca", tags: ["圆形触控", "360°面板", "霓虹LED", "Marvelous"], intro: "WACCA 是由大厂 Marvelous 倾力打造的街机全方位触控音乐游戏。机台正中心镶嵌着一块全高清圆形显示屏，四周环绕着一圈 360 度的圆环形触控面板。极具科技感的炫彩 LED 灯光随着乐曲节奏疯狂闪烁旋转，给玩家带来全方位的指尖跃动和极强的视觉包裹与浸润感。", history: "于 2019 年正式进驻各大街机厅，凭借与大量知名电音制作人、虚拟主播（如 Hololive）以及高人气二次元动漫曲目的深度联动，在极短时间内风靡全球。经历了 WACCA S、WACCA Lily 以及最终版本 WACCA Reverse 的全版本迭代迭代。虽然官方网络服务已于 2022 年底完美收官转为单机版，但其独特的操作手感依然使其成为各大机厅不可磨灭的经典常驻风景线。", gameplay: "核心输入通过敲击或滑动周围的 360° 触控圆环完成。基础音符包含点击（Tap）、长按（Hold）、向前推击（Snap）以及顺着圆环方向的左右滑动（Slide）。游戏画面中音符从圆心向四周扩散，玩家需要在乐曲节拍触及圆环判定的刹那完成对应手法。低难度轻松上手感受流动音浪，高难度则极其考验双手的爆发力、多指微操以及极高密度的划圈与切手判定。" },
        "chunithm": { title: "CHUNITHM", badge: "Touch 02", folder: "chunithm", tags: ["长条触摸", "AIR抬手", "发光轨道", "二次元舞台感"], intro: "CHUNITHM（中二节奏）是世嘉（SEGA）开发的一款划时代的触控式街机音游。机台前方配置了一条由高灵敏度电容感应器组成的长条状水平发光触摸板（GROUND STAGE），同时在机台两侧垂直方向安装了先进的红外线空间位置感应器。其绚丽迷幻的曲面视觉效果，像是在屏幕前为您平铺开了一条正在演奏的发光音乐轨道。", history: "自 2015 年在日本首发以来，CHUNITHM 凭借现象级的二次元卡牌收集系统、庞大到不可思议的核心与原创曲库、以及极其硬核独特的玩法迅速统治街机厅。从初代一路进化到大获成功的 CHUNITHM NEW 以及现行的 SUN / LUMINOUS 世代，并推出了大屏幕的国际版机台，是公认的现代街机触控音游的标杆之作。", gameplay: "基础输入包括在底盘触摸板上进行精准的点击、左右连滑、长条按压。其灵魂设计在于红外线感应带来的『AIR（抬手）』动作：当绿色音符飞来时，玩家必须将双手悬空抬起，划过空气去拦截无形的音浪，并跟随着光柱在空中进行上下摆动与判定。这种将物理触控与空间立体手势完美融合的绝妙设计，在高级谱面中会演化成令人叹为观止的交替手序和空中判定，舞台感彻底拉满。" },
        "maimai": { title: "maimai", badge: "Touch 03", folder: "maimai", tags: ["圆形屏幕", "实体按键", "屏幕滑动", "『洗衣机』"], intro: "maimai 是世嘉（SEGA）推出的极具标志性的音乐节奏游戏。由于其独特的圆形大屏幕以及外圈等距排列的 8 颗物理大按键，外观酷似滚筒洗衣机，被广大玩家亲切地尊称为『洗衣机』。屏幕本身支持全区域多点触控，完美支持高强度击打与丝滑滑动，是触摸滑动型音游界不可动摇的重要里程碑式代表作。", history: "初代于 2012 年惊艳问世，彻底颠覆了传统音游的固有形态。随后的 maimai ORANGE、PiNK、MiLK 等版本不断强化其元气少女和二次元电音风格。2019 年机台迎来翻天覆地的彻底重构，升级为 maimai DX（豪华版），屏幕判定大幅优化，引入了全新的双人同机并排游玩机制，成为了现今街机厅人气最高的排队王机种之一。", gameplay: "核心玩法采取按键与触屏双重并轨制。圆环音符从中心向外圈辐射，当到达边缘时，玩家可以精准拍击外圈的 8 个物理实体大按键，也可以直接猛烈敲击屏幕对应的边缘触控区。除了常规点击和长按，其最核心的特色是『SLIDE（滑动）』音符：拍击完初始点后，屏幕上会出现梦幻的星形光轨引导线，玩家需要戴着专用手套在屏幕上划出流畅优美的抛物线、闪电线或大圆弧，极度考验手臂协调性与全谱面大范围读谱能力。" },
        "iidx": { title: "beatmania IIDX", badge: "Keys 01 / Knob 02", folder: "iidx", tags: ["七键转盘", "打碟DJ", "BEMANI经典", "纯正硬核"], intro: "beatmania IIDX 是科乐美（KONAMI）旗下 BEMANI 家族最负盛名的国宝级硬核街机音游。机台完美模拟了专业 DJ 现场打碟的工作台布局，配备了 7 个黑白相间、回弹极其清脆的机械实体按键，以及一个可以无限无阻力旋转的标志性感应式黑胶大转盘。配合顶级低音炮踏板和极高素质的专业街机音响，旨在为玩家带来最硬派、最纯正的俱乐部 DJ 模拟与代入体验。", history: "作为现代音乐游戏的开山鼻祖系列，初代早在 1999 年就已震撼面世。它见证了二十多年来全球电子音乐和街机音游文化起伏演变的全过程。截止当前，游戏已稳定迭代至 31 代甚至更新版本。其原创曲目孵化出了无数电音界宗师级人物（如 dj TAKA, Bemani Sound Team 等），其硬核血统在音游玩家心中拥有无可比拟的至高无上地位。", gameplay: "音游界公认的顶级修罗场。乐谱采用最传统的垂直瀑布流式下落，玩家左/右手需要同时掌管 7 个实体琴键进行极高密度的多指弹奏，同时另一只手必须随时抽离出来，去疯狂前后切抹、旋转那个模拟打碟的胶片大转盘（Scratch 音符）。高难度谱面（如 ANOTHER 12级）蕴含着极其恐怖的纵连、楼梯、海量盘子与复杂的切音楼梯，对玩家的指力、手眼极限协调度、拆谱肌肉记忆有着近乎变态的极致要求。" },
        "popn": { title: "pop'n music", badge: "Keys 02", folder: "popn", tags: ["九键大按键", "多彩萌系", "高阶反差", "角色视觉"], intro: "pop'n music（流行音乐）同样是 KONAMI 旗下一款色彩斑斓、具有超高辨识度的长寿音乐街机。其控制面板极为震撼地平铺着 9 个巨大的半球形多彩发光物理大按键。虽然游戏整体视觉美术和角色设计极其可爱、治愈且富有极强的亲和力，但千万不要被它软萌的外表所迷惑——这是一款隐藏在萌系糖衣之下的超级硬核弹奏巨兽。", history: "诞生于 1998 年，至今已有超过 20 年的辉煌更新历史，版本跨越至 UniLab 等现代世代。游戏摒弃了大部分音游常用的实景 MV 或真人画面，而是为几千首不同风格的歌曲全部设计了专属的 2D 卡通原创萌系角色，拥有极度庞大且忠诚的粉丝群体与世界观生态。", gameplay: "由于 9 个大按键排列成上下两层，且按键跨度极大，玩家无法像弹钢琴那样固守琴键，必须运用一整只手掌、手腕甚至整个手臂在极为宽广的面版上进行大范围的飞跃与击打。音符落下时需要精准拍击对应颜色的大球。高级别谱面中，音符下落速度极快、读谱密度犹如狂风暴雨，玩家往往需要施展高超的『跨手』、『揉键』技术，上半身高频晃动，形成极其热烈的观赏与游玩氛围。" },
        "sdvx": { title: "SOUND VOLTEX", badge: "Knob 01", folder: "sdvx", tags: ["双旋钮", "激光电音", "霓虹视效", "暴风式电竞"], intro: "SOUND VOLTEX（SDVX / 狂热音轨）是 KONAMI 专为新世代玩家量身定制的高速极燃街机音游。机台控制台由 4 个白色大按键（BT）、2 个黑色长条按键（FX）以及上方两侧的一红一蓝标志性高精度无限连续旋钮（VOL）共同构成。配合纵向倾斜延展的超大屏幕，能完美模拟出极具冲击力的战斗机舱式激光电音穿梭视效。", history: "2012 年首发问世，通过破天荒地允许第三方民间音乐制作者和画师投稿（公募系统），迅速吸纳了海量高品质的东方 Project 翻弹、Vocaloid 电音及硬核超高 Bpm 原创曲，瞬间成为二次元电音圣地。第六代 SOUND VOLTEX EXCEED GEAR 更是引入了 120Hz 顶级电竞电抗高刷屏，将其推向了顶级竞技电音游的巅峰。", gameplay: "游玩时，玩家需要双手完美兼顾下方 6 个按键的交替高频弹奏，同时当画面中泼洒出红蓝两色的『LASER（激光）』线段时，必须迅速抽出一只手去疯狂扭动对应的红蓝旋钮，使激光光束严丝合缝地咬合轨道。旋钮转动时，整个游戏画面会发生极其炫酷的3D大幅度倾斜、旋转与强烈的视角震颤，配以极高密度的瀑布流读谱，带给游玩者和围观者无与伦比的极速视听肾上腺素狂飙。" },
        "ddr": { title: "Dance Dance Revolution", badge: "Body 01", folder: "ddr", tags: ["跳舞毯", "四向踏板", "全身有氧", "硬核斗舞"], intro: "Dance Dance Revolution（DDR / 跳舞机）是风靡全球、真正让音乐游戏打破次元壁走向大众的划时代体感巨作。机台放弃了所有传统手部控制器，转而在玩家脚下铺设了一块拥有『上、下、左、右』四个方向、内置高刚性高敏重力感应钢板的重型金属跳舞踏板，并在后方配有标志性的安全不锈钢扶手，让玩家可以用整个身体去践行节奏的律动。", history: "初代于 1998 年问世，瞬间引爆了全球范围内的街机跳舞机狂潮，成为了整整一代人对街机厅最深刻的黄金青春记忆。经历了 DDR X, Ace 等无数个经典大版本的洗礼，现今的最新版机台不仅音质全面封神，更成为了各大国际性电子竞技大赛（如 BEMANI Master Academy, KAC）中最具观赏性和身体对抗强度的有氧电竞项目。", gameplay: "音符（箭头）从屏幕底部不断向上滚动，当其与顶部的固定判定箭头重合的瞬间，玩家必须用双脚精准踩击地面对应方向的金属踏板。从基础的单脚踏步，到高难度的双脚频繁交替、180度侧身大转体、连贯乱打，甚至需要高频借助后方扶手进行离地双踩。高阶谱面是一场纯粹的技术、爆发力与恐怖有氧耐力的极限双重考验，能轻松将音游变成全场瞩目的个人华丽舞池秀。" },
        "taiko": { title: "太鼓达人", badge: "Drum 01", folder: "taigu", tags: ["实体太鼓", "红蓝音符", "国民级", "老少皆宜"], intro: "《太鼓达人》是由万代南梦宫（BANDAI NAMCO）打造的真正具备国民级统治力的乐器打击类音游。机台最瞩目的核心就是两个完全等比例精细还原的传统日本大太鼓实体控制器。玩家手持两根专属的木质鼓棒（蜂），通过直接而纯粹的肉体敲击动作，享受最原始、最解压、最痛快的节拍正向反馈。", history: "自 2001 年面世以来，凭借其憨态可掬的原创主角『和田咚』与『和田咔』、极度直观毫无门槛的规则、以及涵盖了国民级流行动漫、经典古典乐和各大神级游戏 Vgm 的惊人曲库，迅速火遍全球，真正做到了从三岁孩童到八十岁老者皆能同台竞技的惊人普及度。如今新版彩色大框体不仅全面支持云端联网排名，判定和打击手感更达到了登峰造极的境地。", gameplay: "规则极为纯粹：传送带式的谱面从右向左横向滚动。飞来红色音符（咚）时，玩家用鼓棒全力敲击大鼓的『正中心鼓面』；飞来蓝色音符（咔）时，则敲击大鼓的『外圈塑料鼓边』。此外还包含气球连打、大音符双敲以及长条连打。虽然规则一分钟即可完全理解，但高难度下（如 ★10 鬼难度），极高 Bpm 的连打、变速读谱（Scroll）和复杂混音节奏型会化作密不透风的鼓点城墙，极其考验玩家的双手手速转换、腕力爆发与绝对节奏核心稳定性。" },
        "jubeat": { title: "jubeat", badge: "Matrix 01", folder: "jubeat", tags: ["4x4方格", "矩阵触控", "空间读谱", "跳动灯墙"], intro: "jubeat（乐动魔方）是 KONAMI 推出的一款视觉极具未来科幻感的矩阵空间触控式音乐游戏。机台正面极为大胆地嵌入了一整面由 16 个（4×4 排列）正方形高透光亚克力实体按键组成的巨大魔方灯墙。每一个透明按键下方都紧密贴合着独立的液晶显示画面，能将绚丽迷幻的判定特效直接在按键内部绽放开来，视觉极度震撼。", history: "2008 年一经推出便凭借颠覆性的『空间位置读谱法』在亚洲街机市场掀起惊天狂潮，成为无数传统老玩家和新玩家的挚爱。历经了 jubeat ripples, copious, saucer, prop, festo 等多个标志性大版本的十年沉淀，它独特的工业美学设计依然让其在任何街机厅中都散发着璀璨夺目的霓虹科技光芒。", gameplay: "打破了传统下落式音游的固有逻辑，jubeat 采用前所未有的『空间就地判定』。16 个格子上会直接冒出各种千奇百怪的炫丽动画（如线圈收缩、泡沫破裂、激光聚拢），在动画收缩到与格子边缘完美重合的绝对瞬间，玩家必须用手指直接拍击该格子按键。游戏极度考验人类的视网膜全景空间读谱能力和极快的手臂反应。高难度谱面中，方格会如同狂暴的闪电般在 16 格内不规则疯狂跳动，玩家需要运用行云流水般的双手大跨度『织网』手法和手指交叉微操才能通关。" },
        "gitadora": { title: "GITADORA", badge: "Instrument 01 / Drum 02", folder: "gitadora", tags: ["乐器模拟", "实体吉他/电子鼓", "乐队联合", "摇滚狂热"], intro: "GITADORA 是 KONAMI 旗下最负盛名的专业摇滚乐器模拟系列机台的统称，它由两台可以跨机联动合奏的独立机台共同组成：配备了五音拨片实体仿真吉他的 GuitarFreaks（吉他高手）以及配备了极为硬核的专业多面高弹电子鼓组与重低音双踩踏板的 DrumMania（青春鼓王）。旨在让玩家在街机厅内就能亲身体验到真正摇滚乐队现场演出的极致高燃代入感。", history: "其前身 GF 和 DM 系列早在 1999 年就已并肩问世，是全球乐器类音游的殿堂级泰山北斗。经过长达二十年的技术积累，如今的 GITADORA 融合了极其硬派的重金属、前卫摇滚以及 J-Rock 原创曲库，是街机厅里声音最响亮、气场最强大的绝对摇滚核心震撼区。", gameplay: "【吉他版】要求玩家左手按住琴颈上红、蓝、绿、黄、紫五个颜色的实体品阶键，右手配合谱面瀑布流下落时机精准拨动下方物理拨片，还要随时根据提示做出幅度夸张的摇琴（Wailing）加分动作。【鼓王版】则完全是一台真正的硬核电子鼓试炼场，玩家双手需要高速挥舞真鼓棒精准敲击军鼓、三个通通鼓、擦片、高架镲，同时双脚还必须高频踩击速度极快的低音大鼓踏板和左侧控制踏板。对玩家真实的音乐乐理乐感、四肢完全解离协调性提出了极其专业的极高要求。" },
        "ongeki": { title: "Ongeki", badge: "Keys 03", folder: "ongeki", tags: ["三色琴键", "摇杆走位", "卡牌收集", "弹幕音游"], intro: "Ongeki（音击）是世嘉（SEGA）于近期推出的一款将传统按键音游与极其硬核的二次元 3D 弹幕射击（STG）玩法进行鬼才般完美融合的新世代街机节奏游戏。机台精美配置了左中右三组宽大的红、绿、蓝发光琴键，正中央镶嵌着一个极其灵敏的物理控制摇杆，两侧还带有标志性的外侧侧键（WALL BUTTON）。整体视觉极为绚丽多彩，充满了元气满满的 3D 舞台声光电美学。", history: "于 2018 年隆重登场，作为世嘉继 CHUNITHM 和 maimai 之后的第三大主力音游王牌，它一问世便凭借惊艳全场的精美 3D 萌系少女建模、极度庞大且自带实体物理打印功能的二次元卡牌抽选系统、以及前所未见的弹幕音游玩法瞬间引爆年轻代玩家圈，目前正处于极度火热的现役运营和全线更新之中。", gameplay: "开创了音游玩法的崭新维度。游玩时，玩家不仅需要用双手去高频弹奏下落的红、绿、蓝三色琴键与两侧侧键，同时左手还必须随时紧握正中央的物理摇杆，精准控制屏幕上属于自己的 3D 游戏角色进行左右走位。你需要在完美的音乐节奏中，一边弹奏琴键，一边操控角色在发光的轨道上灵活扭动，去完美拾取金币并极限擦弹躲避满屏飞来的疯狂敌方紫色弹幕。极高难度谱面融合了极致的手指乱打和极度高压的生死走位，惊险刺激程度在整个音游界无出其右。" }
    };

    const currentMachine = machineDatabase[machineId];
    if (!currentMachine) {
        container.innerHTML = `
            <div class="detail-error">
                <p>⚠️ 抱歉，档案馆的核心中央数据库中暂未查收到编号为 <strong>"${machineId || '未知'}"</strong> 的机台档案。</p>
                <p style="margin-top: 15px;"><a class="back-link" href="machines.html">← 返回具体机台总览</a></p>
            </div>
        `;
        return;
    }

    const renderedHtml = `
        <div class="detail-paper-container">
            <header class="detail-header">
                <div class="machine-title-row">
                    <h1 class="machine-title">${currentMachine.title}</h1>
                    <span class="machine-id-badge">${currentMachine.badge}</span>
                </div>
                <div class="machine-tags">
                    ${currentMachine.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </header>

            <div class="detail-grid-layout">
                
                <section class="detail-card profile-card">
                    <div class="card-text-block">
                        <span class="eyebrow">PROFILE</span>
                        <h2>机台简介</h2>
                        <p>${currentMachine.intro}</p>
                    </div>
                    <div class="card-image-box">
                        <img class="dynamic-img" data-type="machine" data-folder="${currentMachine.folder}" src="assets/images/machines/${currentMachine.folder}/machine.jpg" alt="${currentMachine.title} 机台外观">
                    </div>
                </section>

                <section class="detail-card history-card">
                    <div class="card-text-block">
                        <span class="eyebrow">CHRONICLE / HISTORY</span>
                        <h2>机台发展历史</h2>
                        <p>${currentMachine.history}</p>
                    </div>
                </section>

                <section class="detail-card gameplay-card">
                    <div class="card-text-block">
                        <span class="eyebrow">HOW TO PLAY</span>
                        <h2>核心玩法与视觉档案</h2>
                        <p>${currentMachine.gameplay}</p>
                    </div>
                    
                    <!-- 统一视觉档案画廊区：所有除了machine之外的图都会来这里 -->
                    <div class="unified-visual-gallery" style="display: none;">
                         <img class="dynamic-img" data-type="art" data-folder="${currentMachine.folder}" src="assets/images/machines/${currentMachine.folder}/art.jpg" alt="宣传原画">
                         <img class="dynamic-img" data-type="ui" data-folder="${currentMachine.folder}" src="assets/images/machines/${currentMachine.folder}/ui.jpg" alt="游戏界面">
                         <img class="dynamic-img" data-type="ui2" data-folder="${currentMachine.folder}" src="assets/images/machines/${currentMachine.folder}/ui2.jpg" alt="UI细节2">
                         <img class="dynamic-img" data-type="ui3" data-folder="${currentMachine.folder}" src="assets/images/machines/${currentMachine.folder}/ui3.jpg" alt="UI细节3">
                    </div>
                </section>

            </div>

            <div class="detail-footer-nav">
                <a class="back-link" href="machines.html">← 返回具体机台总览</a>
                <a class="back-link" href="categories.html">去往发展与谱系 →</a>
            </div>
        </div>
    `;

    container.innerHTML = renderedHtml;

    const imgs = container.querySelectorAll('.dynamic-img');
    const unifiedGallery = container.querySelector('.unified-visual-gallery');

    imgs.forEach(img => {
        // 初始状态下把画廊里的图隐藏，防止闪过破图图标
        if (img.dataset.type !== 'machine') {
            img.style.display = 'none';
        }

        img.addEventListener('error', function() {
            const currentSrc = this.getAttribute('src');
            // 智能回退格式探测
            if (currentSrc.endsWith('.jpg')) {
                this.setAttribute('src', currentSrc.replace('.jpg', '.png'));
            } else if (currentSrc.endsWith('.png')) {
                this.setAttribute('src', currentSrc.replace('.png', '.jpeg'));
            } else {
                // 如果实在没找到这张图
                if (this.dataset.type !== 'machine') {
                    this.remove(); // 统一画廊里的图找不到就直接移除，不占空间
                } else {
                    const fallback = document.createElement('div');
                    fallback.className = 'visual-fallback-box';
                    fallback.innerHTML = `<span>🎮 暂无图片: [machines/${this.dataset.folder}/${this.dataset.type}]</span>`;
                    this.replaceWith(fallback);
                }
            }
        });
        
        img.addEventListener('load', function() {
            // 如果成功加载的是画廊图
            if (this.dataset.type !== 'machine') {
                this.style.display = 'block'; 
                if (unifiedGallery) {
                    unifiedGallery.style.display = 'grid'; // 只要有一张画廊图加载成功，就显示画廊容器
                }
            }
        });
    });
});
