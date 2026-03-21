const STAGE = {
  width: 1280,
  height: 720,
  groundY: 604,
  floorY: 616,
  leftWall: 120,
  rightWall: 1160,
};

const FIXED_STEP_MS = 1000 / 60;
const FIXED_STEP_SECONDS = 1 / 60;
const MAX_ROUNDS_TO_WIN = 2;
const ROUND_INTRO_SECONDS = 2.1;
const ROUND_END_SECONDS = 2.4;
const FIREBALL_COMMAND_WINDOW = 18;
const FIREBALL_PROJECTILE = {
  radius: 28,
  speed: 10.2,
  damage: 10,
  hitstun: 18,
  blockstun: 12,
  pushback: 8.4,
  guardPushback: 5.2,
  offsetX: 112,
  offsetY: 118,
  life: 82,
  cooldown: 112,
};

const BGM_PATTERNS = {
  menu: {
    stepSeconds: 0.24,
    steps: [
      { bass: 43, lead: [67], counter: [74] },
      { bass: 43, pad: [62, 67] },
      { bass: 46, lead: [69, 72], accent: true },
      { bass: 46, counter: [76] },
      { bass: 50, lead: [71], counter: [78] },
      { bass: 50, pad: [66, 71] },
      { bass: 48, lead: [74, 76], accent: true },
      { bass: 48, counter: [79] },
      { bass: 43, lead: [67], counter: [74] },
      { bass: 43, pad: [62, 67] },
      { bass: 46, lead: [69, 72], accent: true },
      { bass: 46, counter: [74] },
      { bass: 41, lead: [66], counter: [72] },
      { bass: 41, pad: [60, 65] },
      { bass: 43, lead: [67, 71], accent: true },
      { bass: 43, counter: [74], noiseVolume: 0.005 },
    ],
  },
  battle: {
    stepSeconds: 0.18,
    steps: [
      { bass: 38, subBass: 50, lead: [69, 74], counter: [81], accent: true, noiseFrequency: 1900 },
      { bass: 38, pad: [62, 67], counter: [77] },
      { bass: 45, subBass: 57, lead: [72], counter: [79], accent: true },
      { bass: 45, lead: [74], noiseVolume: 0.006 },
      { bass: 41, subBass: 53, lead: [76, 79], counter: [84], accent: true, noiseFrequency: 2100 },
      { bass: 41, pad: [65, 69], counter: [77] },
      { bass: 48, subBass: 60, lead: [74], counter: [81], accent: true },
      { bass: 48, lead: [72], noiseVolume: 0.006 },
      { bass: 38, subBass: 50, lead: [69, 74], counter: [81], accent: true, noiseFrequency: 1900 },
      { bass: 38, pad: [62, 67], counter: [77] },
      { bass: 46, subBass: 58, lead: [71, 76], counter: [83], accent: true },
      { bass: 46, lead: [74], noiseVolume: 0.006 },
      { bass: 43, subBass: 55, lead: [72, 78], counter: [84], accent: true, noiseFrequency: 2050 },
      { bass: 43, pad: [67, 72], counter: [79] },
      { bass: 45, subBass: 57, lead: [76, 79], counter: [83], accent: true },
      { bass: 45, lead: [72], noiseVolume: 0.007, noiseFrequency: 2300 },
    ],
  },
};

const JUMP_TUNING = {
  launchVy: -18.4,
  launchVx: 7.1,
  airDriftSpeed: 3.5,
  airDriftDelta: 0.18,
  airAttackDriftDelta: 0.14,
};

const SPRITE_GRID = {
  columnStarts: [1, 190, 379, 568, 757],
  rowStarts: [1, 229, 456, 684, 911],
  frameWidth: 187,
  frameHeights: [227, 226, 227, 226, 225],
  rowIndex: {
    idle: 0,
    walk: 1,
    jump: 2,
    punch: 3,
    kick: 4,
  },
};

const SPECIAL_ROW_INDEX = {
  crouch: 0,
  crouchPunch: 1,
  crouchKick: 2,
  standGuard: 3,
  crouchGuard: 4,
};

const ATTACK_DEFS = {
  punch: {
    id: "punch",
    guardProfile: "high",
    damage: 10,
    startup: 6,
    active: 3,
    recovery: 9,
    hitstun: 14,
    blockstun: 10,
    pushback: 7.6,
    guardPushback: 4.8,
    box: { width: 88, height: 46, offsetX: 94, offsetY: 124 },
  },
  kick: {
    id: "kick",
    guardProfile: "high",
    damage: 15,
    startup: 8,
    active: 4,
    recovery: 11,
    hitstun: 18,
    blockstun: 12,
    pushback: 9.5,
    guardPushback: 5.8,
    box: { width: 102, height: 52, offsetX: 104, offsetY: 108 },
  },
  crouchPunch: {
    id: "crouchPunch",
    guardProfile: "high",
    damage: 8,
    startup: 5,
    active: 3,
    recovery: 8,
    hitstun: 12,
    blockstun: 9,
    pushback: 6.4,
    guardPushback: 4.2,
    box: { width: 84, height: 34, offsetX: 88, offsetY: 86 },
  },
  crouchKick: {
    id: "crouchKick",
    guardProfile: "low",
    damage: 12,
    startup: 7,
    active: 4,
    recovery: 11,
    hitstun: 16,
    blockstun: 11,
    pushback: 8.6,
    guardPushback: 5.2,
    box: { width: 116, height: 32, offsetX: 96, offsetY: 52 },
  },
  fireball: {
    id: "fireball",
    guardProfile: "high",
    damage: 0,
    startup: 13,
    active: 0,
    recovery: 28,
    hitstun: 0,
    blockstun: 0,
    pushback: 0,
    guardPushback: 0,
    box: null,
  },
};

const CPU_LEVELS = [
  {
    id: "easy",
    name: "やさしい",
    accent: "#7ddf92",
    summary: "反応はゆっくり。守りも甘めです。",
    reactionMin: 16,
    reactionMax: 26,
    guardChance: 0.42,
    pressureChance: 0.42,
    jumpChance: 0.34,
    jumpPatience: 0.84,
    neutralJumpBias: 0.82,
    airAttackChance: 0.48,
    lateAirKickChance: 0.38,
    lowAttackChance: 0.22,
    projectileChance: 0.08,
    retreatChance: 0.22,
    keepawayChance: 0.3,
    zoningChance: 0.44,
    punishChance: 0.42,
    whiffJumpChance: 0.18,
    confirmPressureChance: 0.28,
    preferredDistanceMin: 176,
    preferredDistanceMax: 284,
  },
  {
    id: "normal",
    name: "ふつう",
    accent: "#ffd36b",
    summary: "攻めと守りの標準設定です。",
    reactionMin: 9,
    reactionMax: 16,
    guardChance: 0.66,
    pressureChance: 0.68,
    jumpChance: 0.54,
    jumpPatience: 0.74,
    neutralJumpBias: 0.62,
    airAttackChance: 0.72,
    lateAirKickChance: 0.58,
    lowAttackChance: 0.4,
    projectileChance: 0.14,
    retreatChance: 0.34,
    keepawayChance: 0.5,
    zoningChance: 0.72,
    punishChance: 0.68,
    whiffJumpChance: 0.34,
    confirmPressureChance: 0.46,
    preferredDistanceMin: 188,
    preferredDistanceMax: 306,
  },
  {
    id: "ultimate",
    name: "最強",
    accent: "#ff7a7a",
    summary: "反応が鋭く、反撃と攻め継続が強い強敵です。",
    reactionMin: 2,
    reactionMax: 4,
    guardChance: 0.86,
    groundGuardChance: 0.82,
    groundGuardRange: 196,
    projectileGuardRange: 236,
    pressureChance: 0.92,
    jumpChance: 0.44,
    jumpPatience: 0.52,
    neutralJumpBias: 0.24,
    airAttackChance: 0.82,
    lateAirKickChance: 0.76,
    lowAttackChance: 0.48,
    projectileChance: 0.18,
    retreatChance: 0.42,
    keepawayChance: 0.68,
    zoningChance: 0.92,
    punishChance: 0.84,
    whiffJumpChance: 0.34,
    confirmPressureChance: 0.64,
    preferredDistanceMin: 196,
    preferredDistanceMax: 332,
  },
];

const DEFAULT_CPU_LEVEL_INDEX = 1;
const SELECTION_GRID_COLUMNS = 2;

const CHARACTER_ASSET_URLS = import.meta.glob("../キャラクター/*.png", {
  eager: true,
  import: "default",
});

function resolveCharacterAsset(fileName) {
  const normalizedTarget = fileName.normalize("NFC");

  for (const [assetPath, assetUrl] of Object.entries(CHARACTER_ASSET_URLS)) {
    const assetName = assetPath.split("/").pop();
    if (assetName && assetName.normalize("NFC") === normalizedTarget) {
      return assetUrl;
    }
  }

  throw new Error(`キャラクター素材が見つかりません: ${fileName}`);
}

const CHARACTER_DEFS = [
  {
    id: "yayuta",
    name: "うゆうた",
    accent: "#e66450",
    specialFrameScale: 0.8,
    crouchAttackScaleMultiplier: 1,
    selectionPortraitScale: 1.2,
    selectionPortraitFocusY: 0,
    portraitSrc: resolveCharacterAsset("やゆうた.png"),
    spriteSrc: resolveCharacterAsset("やゆうた_スプライト.png"),
    specialSpriteSrc: resolveCharacterAsset("やゆうた_しゃがみ_ガード.png"),
  },
  {
    id: "shimomo",
    name: "シモモ",
    accent: "#4bd9ec",
    specialFrameScale: 0.8,
    crouchAttackScaleMultiplier: 1.2,
    guardScaleMultiplier: 1.2,
    selectionPortraitScale: 1,
    selectionPortraitFocusY: 1,
    portraitSrc: resolveCharacterAsset("シモモ_立ち絵.png"),
    spriteSrc: resolveCharacterAsset("シモモ_スプライト.png"),
    specialSpriteSrc: resolveCharacterAsset("シモモ_しゃがみ_ガード.png"),
  },
  {
    id: "shigei",
    name: "シーゲイ",
    accent: "#79d77e",
    specialFrameScale: 1,
    crouchAttackScaleMultiplier: 1,
    selectionPortraitScale: 1,
    selectionPortraitFocusY: 1,
    portraitSrc: resolveCharacterAsset("シーゲイ_立ち絵.png"),
    spriteSrc: resolveCharacterAsset("シーゲイ_スプライト.png"),
    specialSpriteSrc: resolveCharacterAsset("シーゲイ_しゃがみ_ガード.png"),
  },
  {
    id: "motsumato",
    name: "モツマト",
    accent: "#ffb347",
    specialFrameScale: 1,
    crouchAttackScaleMultiplier: 1,
    selectionPortraitScale: 1,
    selectionPortraitFocusY: 1,
    portraitSrc: resolveCharacterAsset("モツマト_立ち絵.png"),
    spriteSrc: resolveCharacterAsset("モツマト_スプライト.png"),
    specialSpriteSrc: resolveCharacterAsset("モツマト_しゃがみ_ガード.png"),
  },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function approach(value, target, delta) {
  if (value < target) return Math.min(value + delta, target);
  if (value > target) return Math.max(value - delta, target);
  return value;
}

function rectsIntersect(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function roundValue(value) {
  return Math.round(value * 10) / 10;
}

function midiToFrequency(note) {
  return 440 * 2 ** ((note - 69) / 12);
}

function totalAttackFrames(attack) {
  return attack.startup + attack.active + attack.recovery;
}

function frameIndexFromCycle(counter, rate = 10) {
  return Math.floor(counter / rate) % 5;
}

function isCrouchAttack(kind) {
  return kind === "crouchPunch" || kind === "crouchKick";
}

function isStandingSpecial(kind) {
  return kind === "fireball";
}

function getCpuLevel(index) {
  return CPU_LEVELS[clamp(index ?? DEFAULT_CPU_LEVEL_INDEX, 0, CPU_LEVELS.length - 1)];
}

function getCpuDecisionFrames(level) {
  return level.reactionMin + Math.floor(Math.random() * (level.reactionMax - level.reactionMin + 1));
}

function chooseCpuGroundAttack(intent, level, distance, options = {}) {
  const { preferHeavy = false, preferLow = false } = options;
  const lowChance = level.lowAttackChance ?? 0.3;
  const pressureChance = level.pressureChance ?? 0.5;

  if ((preferLow || Math.random() < lowChance) && distance < 136) {
    intent.down = true;
    intent.kickPressed = true;
    return;
  }

  if (preferHeavy || distance > 110 || Math.random() < pressureChance) {
    intent.kickPressed = true;
    return;
  }

  intent.punchPressed = true;
}

function getAttackGuardProfile(attack) {
  if (!attack) return "high";
  if (attack.guardProfile) return attack.guardProfile;
  if (attack.airborne) return "mid";
  return ATTACK_DEFS[attack.kind]?.guardProfile ?? "high";
}

function getGuardTypeForAttack(attack) {
  return getAttackGuardProfile(attack) === "low" ? "crouch" : "stand";
}

function canGuardAttack(guardType, attack) {
  const profile = getAttackGuardProfile(attack);
  if (profile === "high") return guardType === "stand" || guardType === "crouch";
  if (profile === "low") return guardType === "crouch";
  return guardType === "stand";
}

function isCrouchProfile(fighter) {
  return (
    fighter.crouching ||
    fighter.guardType === "crouch" ||
    isCrouchAttack(fighter.attack?.kind) ||
    fighter.state === "crouch" ||
    fighter.state === "crouch-guard"
  );
}

function drawRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function isBackgroundLike(data, index) {
  if (data[index + 3] === 0) return false;

  const r = data[index];
  const g = data[index + 1];
  const b = data[index + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const brightness = (r + g + b) / 3;

  // Sprite sheets include white cells and gray divider lines.
  return brightness >= 92 && max - min <= 34;
}

function isPortraitBackgroundLike(data, index) {
  if (data[index + 3] === 0) return false;

  const r = data[index];
  const g = data[index + 1];
  const b = data[index + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const brightness = (r + g + b) / 3;

  return brightness >= 214 && max - min <= 26;
}

function averageColorSamples(samples) {
  let totalR = 0;
  let totalG = 0;
  let totalB = 0;

  samples.forEach((sample) => {
    totalR += sample.r;
    totalG += sample.g;
    totalB += sample.b;
  });

  return {
    r: totalR / samples.length,
    g: totalG / samples.length,
    b: totalB / samples.length,
  };
}

function sampleEdgeBackgroundColor(imageData, width, height, sampleMatcher = null, options = {}) {
  const { preferBrightest = false, brightnessWindow = 10 } = options;
  const { data } = imageData;
  const samples = [];

  function sample(x, y) {
    const pixel = (y * width + x) * 4;
    if (data[pixel + 3] === 0) return;
    if (sampleMatcher && !sampleMatcher(data, pixel)) return;
    samples.push({
      r: data[pixel],
      g: data[pixel + 1],
      b: data[pixel + 2],
      brightness: (data[pixel] + data[pixel + 1] + data[pixel + 2]) / 3,
    });
  }

  for (let x = 0; x < width; x += 1) {
    sample(x, 0);
    sample(x, height - 1);
  }

  for (let y = 1; y < height - 1; y += 1) {
    sample(0, y);
    sample(width - 1, y);
  }

  if (!samples.length) {
    if (sampleMatcher) return sampleEdgeBackgroundColor(imageData, width, height, null, options);
    return { r: 255, g: 255, b: 255 };
  }

  if (!preferBrightest) return averageColorSamples(samples);

  const brightest = Math.max(...samples.map((sample) => sample.brightness));
  const preferredSamples = samples.filter(
    (sample) => sample.brightness >= brightest - brightnessWindow
  );
  return averageColorSamples(preferredSamples.length ? preferredSamples : samples);
}

function createPortraitBackgroundMatcher(imageData, width, height) {
  const background = sampleEdgeBackgroundColor(imageData, width, height, isPortraitBackgroundLike, {
    preferBrightest: true,
    brightnessWindow: 14,
  });
  const backgroundBrightness = (background.r + background.g + background.b) / 3;
  return (data, index) => {
    if (data[index + 3] === 0) return false;

    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const brightness = (r + g + b) / 3;
    const dr = r - background.r;
    const dg = g - background.g;
    const db = b - background.b;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);
    const channelDelta = Math.max(Math.abs(dr), Math.abs(dg), Math.abs(db));

    // Some portraits reach the canvas edge, so bias toward the brightest,
    // lowest-saturation edge band and only flood-fill pixels that stay
    // close to that paper-white backdrop.
    return (
      brightness >= Math.max(214, backgroundBrightness - 18) &&
      distance <= 42 &&
      channelDelta <= 30 &&
      max - min <= 28
    );
  };
}

function createSpriteBackgroundMatcher(imageData, width, height) {
  const background = sampleEdgeBackgroundColor(imageData, width, height, isBackgroundLike, {
    preferBrightest: true,
    brightnessWindow: 10,
  });
  const backgroundBrightness = (background.r + background.g + background.b) / 3;
  return (data, index) => {
    if (data[index + 3] === 0) return false;

    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const brightness = (r + g + b) / 3;
    const dr = r - background.r;
    const dg = g - background.g;
    const db = b - background.b;
    const distance = Math.sqrt(dr * dr + dg * dg + db * db);
    const channelDelta = Math.max(Math.abs(dr), Math.abs(dg), Math.abs(db));

    // Battle sprites still use white backgrounds, but some sheets include
    // softer gray edges after resampling. Bias toward the brightest edge
    // samples so we remove the paper-white backdrop without eating interior whites.
    return (
      min >= Math.max(210, backgroundBrightness - 40) &&
      brightness >= Math.max(220, backgroundBrightness - 28) &&
      distance <= 46 &&
      channelDelta <= 34 &&
      max - min <= 24
    );
  };
}

function clearBackgroundFromEdges(imageData, width, height, matcher = isBackgroundLike) {
  const { data } = imageData;
  const visited = new Uint8Array(width * height);
  const queue = new Uint32Array(width * height);
  let head = 0;
  let tail = 0;

  function push(x, y) {
    const offset = y * width + x;
    if (visited[offset]) return;
    const pixel = offset * 4;
    if (!matcher(data, pixel)) return;
    visited[offset] = 1;
    queue[tail] = offset;
    tail += 1;
  }

  for (let x = 0; x < width; x += 1) {
    push(x, 0);
    push(x, height - 1);
  }

  for (let y = 0; y < height; y += 1) {
    push(0, y);
    push(width - 1, y);
  }

  while (head < tail) {
    const offset = queue[head];
    head += 1;
    const x = offset % width;
    const y = (offset - x) / width;
    const pixel = offset * 4;
    data[pixel + 3] = 0;

    if (x > 0) push(x - 1, y);
    if (x < width - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < height - 1) push(x, y + 1);
  }
}

function createProcessedCanvas(width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

async function loadPortrait(src) {
  const image = await loadImage(src);
  const canvas = createProcessedCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  clearBackgroundFromEdges(
    imageData,
    canvas.width,
    canvas.height,
    createPortraitBackgroundMatcher(imageData, canvas.width, canvas.height)
  );
  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

async function loadSpriteFrames(src) {
  const image = await loadImage(src);
  const frames = [];
  const sourceInset = 1;

  for (let row = 0; row < 5; row += 1) {
    const rowFrames = [];
    for (let column = 0; column < 5; column += 1) {
      const frame = createProcessedCanvas(SPRITE_GRID.frameWidth, SPRITE_GRID.frameHeights[row]);
      const ctx = frame.getContext("2d");
      const sourceWidth = Math.max(1, SPRITE_GRID.frameWidth - sourceInset * 2);
      const sourceHeight = Math.max(1, SPRITE_GRID.frameHeights[row] - sourceInset * 2);
      ctx.drawImage(
        image,
        SPRITE_GRID.columnStarts[column] + sourceInset,
        SPRITE_GRID.rowStarts[row] + sourceInset,
        sourceWidth,
        sourceHeight,
        0,
        0,
        SPRITE_GRID.frameWidth,
        SPRITE_GRID.frameHeights[row]
      );
      const imageData = ctx.getImageData(0, 0, frame.width, frame.height);
      clearBackgroundFromEdges(
        imageData,
        frame.width,
        frame.height,
        createSpriteBackgroundMatcher(imageData, frame.width, frame.height)
      );
      ctx.putImageData(imageData, 0, 0);
      rowFrames.push(frame);
    }
    frames.push(rowFrames);
  }

  return frames;
}

function createFighter(character, side, cpu, cpuLevel = getCpuLevel(DEFAULT_CPU_LEVEL_INDEX)) {
  return {
    id: side,
    character,
    cpu,
    x: side === "player" ? 364 : 916,
    y: STAGE.groundY,
    vx: 0,
    vy: 0,
    facing: side === "player" ? 1 : -1,
    health: 100,
    roundsWon: 0,
    state: "idle",
    attack: null,
    hitstunFrames: 0,
    guardFrames: 0,
    attackAnimationCounter: 0,
    animationCounter: 0,
    airControl: 0,
    airAttackUsed: false,
    fireballCooldownFrames: 0,
    crouching: false,
    downHeld: false,
    backHeld: false,
    guardType: null,
    cpuData: {
      level: cpu ? cpuLevel : null,
      decisionFrames: cpu ? getCpuDecisionFrames(cpuLevel) : 16,
    },
  };
}

function isGrounded(fighter) {
  return fighter.y >= STAGE.groundY - 0.1;
}

function getHurtBox(fighter) {
  if (isCrouchProfile(fighter)) {
    return {
      left: fighter.x - 44,
      right: fighter.x + 44,
      top: fighter.y - 154,
      bottom: fighter.y,
    };
  }

  return {
    left: fighter.x - 44,
    right: fighter.x + 44,
    top: fighter.y - 214,
    bottom: fighter.y,
  };
}

function getPushBox(fighter) {
  if (!isGrounded(fighter)) return null;
  if (isCrouchProfile(fighter)) {
    return {
      left: fighter.x - 40,
      right: fighter.x + 40,
      top: fighter.y - 146,
      bottom: fighter.y,
    };
  }

  return {
    left: fighter.x - 40,
    right: fighter.x + 40,
    top: fighter.y - 192,
    bottom: fighter.y,
  };
}

function getAttackBox(fighter) {
  if (!fighter.attack) return null;
  const move = ATTACK_DEFS[fighter.attack.kind];
  if (!move?.box) return null;
  if (fighter.attack.frame < move.startup || fighter.attack.frame >= move.startup + move.active) return null;

  const centerX = fighter.x + fighter.facing * move.box.offsetX;
  const centerY = fighter.y - move.box.offsetY;
  return {
    left: centerX - move.box.width / 2,
    right: centerX + move.box.width / 2,
    top: centerY - move.box.height / 2,
    bottom: centerY + move.box.height / 2,
  };
}

function getProjectileBox(projectile) {
  return {
    left: projectile.x - projectile.radius,
    right: projectile.x + projectile.radius,
    top: projectile.y - projectile.radius,
    bottom: projectile.y + projectile.radius,
  };
}

class InputManager {
  constructor() {
    this.current = new Set();
    this.previous = new Set();
    this.keyMap = {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowUp: "up",
      ArrowDown: "down",
      Enter: "enter",
      Space: "space",
      KeyZ: "punch",
      KeyX: "kick",
      KeyF: "fullscreen",
    };

    this.boundKeyDown = (event) => {
      const action = this.keyMap[event.code];
      if (!action) return;
      event.preventDefault();
      this.current.add(action);
    };

    this.boundKeyUp = (event) => {
      const action = this.keyMap[event.code];
      if (!action) return;
      event.preventDefault();
      this.current.delete(action);
    };

    window.addEventListener("keydown", this.boundKeyDown, { passive: false });
    window.addEventListener("keyup", this.boundKeyUp, { passive: false });
    window.addEventListener("blur", () => {
      this.current.clear();
      this.previous.clear();
    });
  }

  isDown(action) {
    return this.current.has(action);
  }

  wasPressed(action) {
    return this.current.has(action) && !this.previous.has(action);
  }

  commit() {
    this.previous = new Set(this.current);
  }
}

class SoundManager {
  constructor() {
    this.context = null;
    this.masterGain = null;
    this.bgmGain = null;
    this.noiseBuffer = null;
    this.ready = false;
    this.failed = false;
    this.enabled = true;
    this.recentEvents = [];
    this.maxRecentEvents = 24;
    this.requestedBgmMode = "silent";
    this.bgmMode = "silent";
    this.bgmStepIndex = 0;
    this.bgmNextNoteTime = 0;
    this.lastBgmLayers = [];
    this.boundUnlock = () => {
      this.ensureContext(true);
    };

    window.addEventListener("keydown", this.boundUnlock, { passive: true });
    window.addEventListener("pointerdown", this.boundUnlock, { passive: true });
    window.addEventListener("touchstart", this.boundUnlock, { passive: true });
  }

  ensureContext(resume = false) {
    if (this.failed) return null;

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) {
      this.failed = true;
      this.ready = false;
      return null;
    }

    if (!this.context) {
      this.context = new AudioContextCtor();
      this.masterGain = this.context.createGain();
      this.masterGain.gain.value = 0.22;
      this.bgmGain = this.context.createGain();
      this.bgmGain.gain.value = 0.72;
      this.bgmGain.connect(this.masterGain);
      this.masterGain.connect(this.context.destination);
      this.noiseBuffer = this.createNoiseBuffer(this.context);
      this.bgmNextNoteTime = this.context.currentTime + 0.02;
    }

    if (resume && this.context.state !== "running") {
      this.context.resume().catch(() => {});
    }

    this.ready = this.context.state === "running";
    return this.context;
  }

  createNoiseBuffer(context) {
    const length = Math.max(1, Math.floor(context.sampleRate * 0.28));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * (1 - index / length);
    }
    return buffer;
  }

  pushEvent(id) {
    this.recentEvents.push(id);
    if (this.recentEvents.length > this.maxRecentEvents) {
      this.recentEvents.splice(0, this.recentEvents.length - this.maxRecentEvents);
    }
  }

  clearRecentEvents() {
    this.recentEvents = [];
  }

  playTone({
    frequency,
    endFrequency = frequency,
    duration = 0.08,
    volume = 0.05,
    type = "square",
    when = 0,
    attack = 0.003,
    filterFrequency = null,
    destinationGain = this.masterGain,
  }) {
    if (!this.context || !destinationGain) return;

    const startTime = this.context.currentTime + when;
    const stopTime = startTime + duration;
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    let output = gainNode;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, endFrequency), stopTime);

    if (filterFrequency) {
      const filter = this.context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(filterFrequency, startTime);
      oscillator.connect(filter);
      filter.connect(gainNode);
    } else {
      oscillator.connect(gainNode);
    }

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + attack);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, stopTime);

    output.connect(destinationGain);
    oscillator.start(startTime);
    oscillator.stop(stopTime + 0.01);
  }

  playNoise({
    duration = 0.08,
    volume = 0.024,
    when = 0,
    frequency = 1200,
    filterType = "bandpass",
    q = 0.7,
    destinationGain = this.masterGain,
  }) {
    if (!this.context || !destinationGain || !this.noiseBuffer) return;

    const startTime = this.context.currentTime + when;
    const stopTime = startTime + duration;
    const source = this.context.createBufferSource();
    const filter = this.context.createBiquadFilter();
    const gainNode = this.context.createGain();

    source.buffer = this.noiseBuffer;
    filter.type = filterType;
    filter.frequency.setValueAtTime(frequency, startTime);
    filter.Q.value = q;

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.004);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, stopTime);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destinationGain);

    source.start(startTime);
    source.stop(stopTime + 0.01);
  }

  playJumpSe() {
    this.playTone({
      frequency: 210,
      endFrequency: 460,
      duration: 0.11,
      volume: 0.07,
      type: "triangle",
      attack: 0.004,
      filterFrequency: 2600,
    });
    this.playTone({
      frequency: 420,
      endFrequency: 690,
      duration: 0.07,
      volume: 0.03,
      type: "sine",
      when: 0.018,
      attack: 0.003,
    });
    this.playNoise({
      duration: 0.032,
      volume: 0.016,
      frequency: 1800,
      filterType: "highpass",
      q: 0.65,
      when: 0.008,
    });
  }

  playPunchSe() {
    this.playTone({
      frequency: 210,
      endFrequency: 108,
      duration: 0.055,
      volume: 0.078,
      type: "square",
      attack: 0.002,
      filterFrequency: 1400,
    });
    this.playNoise({
      duration: 0.04,
      volume: 0.022,
      frequency: 980,
      filterType: "bandpass",
      q: 0.9,
      when: 0.004,
    });
  }

  playKickSe() {
    this.playTone({
      frequency: 168,
      endFrequency: 82,
      duration: 0.095,
      volume: 0.088,
      type: "sawtooth",
      attack: 0.002,
      filterFrequency: 1250,
    });
    this.playTone({
      frequency: 112,
      endFrequency: 70,
      duration: 0.08,
      volume: 0.034,
      type: "triangle",
      when: 0.012,
      attack: 0.002,
      filterFrequency: 900,
    });
    this.playNoise({
      duration: 0.055,
      volume: 0.024,
      frequency: 860,
      filterType: "bandpass",
      q: 0.78,
      when: 0.01,
    });
  }

  playFireballSe() {
    this.playTone({
      frequency: 132,
      endFrequency: 610,
      duration: 0.2,
      volume: 0.078,
      type: "sawtooth",
      attack: 0.005,
      filterFrequency: 2000,
    });
    this.playTone({
      frequency: 372,
      endFrequency: 256,
      duration: 0.14,
      volume: 0.036,
      type: "triangle",
      when: 0.03,
      attack: 0.004,
      filterFrequency: 1500,
    });
    this.playNoise({
      duration: 0.1,
      volume: 0.024,
      frequency: 1400,
      filterType: "bandpass",
      q: 0.7,
      when: 0.018,
    });
  }

  playKick({ when = 0, volume = 0.085, destinationGain = this.bgmGain } = {}) {
    if (!this.context || !destinationGain) return;

    const startTime = this.context.currentTime + when;
    const stopTime = startTime + 0.22;
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(164, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(44, stopTime);

    gainNode.gain.setValueAtTime(0.0001, startTime);
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.004);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, stopTime);

    oscillator.connect(gainNode);
    gainNode.connect(destinationGain);
    oscillator.start(startTime);
    oscillator.stop(stopTime + 0.01);

    this.playNoise({
      duration: 0.018,
      volume: 0.012,
      when,
      frequency: 1600,
      filterType: "highpass",
      q: 0.5,
      destinationGain,
    });
  }

  playSnare({ when = 0, volume = 0.056, destinationGain = this.bgmGain } = {}) {
    if (!this.context || !destinationGain) return;

    this.playNoise({
      duration: 0.1,
      volume,
      when,
      frequency: 2300,
      filterType: "highpass",
      q: 0.9,
      destinationGain,
    });

    this.playTone({
      frequency: 210,
      endFrequency: 138,
      duration: 0.08,
      volume: 0.024,
      type: "triangle",
      attack: 0.002,
      when,
      filterFrequency: 1500,
      destinationGain,
    });
  }

  playHiHat({ when = 0, open = false, destinationGain = this.bgmGain } = {}) {
    if (!this.context || !destinationGain) return;

    this.playNoise({
      duration: open ? 0.11 : 0.035,
      volume: open ? 0.018 : 0.013,
      when,
      frequency: open ? 7600 : 9000,
      filterType: "highpass",
      q: 0.8,
      destinationGain,
    });
  }

  playCrash({ when = 0, destinationGain = this.bgmGain } = {}) {
    if (!this.context || !destinationGain) return;

    this.playNoise({
      duration: 0.22,
      volume: 0.02,
      when,
      frequency: 6200,
      filterType: "highpass",
      q: 0.55,
      destinationGain,
    });
  }

  playSynthVoice({
    notes,
    when = 0,
    duration = 0.16,
    volume = 0.04,
    type = "sawtooth",
    detunes = [0],
    attack = 0.008,
    sustainLevel = 0.58,
    filterStart = 2600,
    filterEnd = 1000,
    q = 0.8,
    pan = 0,
    destinationGain = this.bgmGain,
  }) {
    if (!this.context || !destinationGain || !Array.isArray(notes) || !notes.length) return;

    const startTime = this.context.currentTime + when;
    const stopTime = startTime + duration;
    const voiceGain = this.context.createGain();
    const filter = this.context.createBiquadFilter();
    let output = filter;

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(filterStart, startTime);
    filter.frequency.exponentialRampToValueAtTime(Math.max(180, filterEnd), stopTime);
    filter.Q.value = q;

    if (this.context.createStereoPanner) {
      const panner = this.context.createStereoPanner();
      panner.pan.setValueAtTime(pan, startTime);
      filter.connect(panner);
      output = panner;
    }

    voiceGain.gain.setValueAtTime(0.0001, startTime);
    voiceGain.gain.linearRampToValueAtTime(volume, startTime + attack);
    voiceGain.gain.linearRampToValueAtTime(volume * sustainLevel, startTime + duration * 0.46);
    voiceGain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

    notes.forEach((note) => {
      const frequency = midiToFrequency(note);
      detunes.forEach((detune) => {
        const oscillator = this.context.createOscillator();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.detune.setValueAtTime(detune, startTime);
        oscillator.connect(voiceGain);
        oscillator.start(startTime);
        oscillator.stop(stopTime + 0.01);
      });
    });

    voiceGain.connect(filter);
    output.connect(destinationGain);
  }

  playBassSynth(note, when = 0, accent = false) {
    this.playSynthVoice({
      notes: [note],
      when,
      duration: accent ? 0.18 : 0.14,
      volume: accent ? 0.07 : 0.058,
      type: "sawtooth",
      detunes: [0, 5],
      attack: 0.004,
      sustainLevel: 0.48,
      filterStart: 980,
      filterEnd: 320,
      q: 1.1,
      pan: -0.06,
      destinationGain: this.bgmGain,
    });
  }

  playSubBass(note, when = 0) {
    this.playSynthVoice({
      notes: [note],
      when,
      duration: 0.18,
      volume: 0.045,
      type: "triangle",
      detunes: [0],
      attack: 0.01,
      sustainLevel: 0.72,
      filterStart: 460,
      filterEnd: 180,
      q: 0.7,
      pan: 0,
      destinationGain: this.bgmGain,
    });
  }

  playChordStab(notes, when = 0, accent = false) {
    this.playSynthVoice({
      notes,
      when,
      duration: accent ? 0.22 : 0.18,
      volume: accent ? 0.034 : 0.026,
      type: "sawtooth",
      detunes: [-7, 7],
      attack: 0.01,
      sustainLevel: 0.42,
      filterStart: accent ? 3000 : 2200,
      filterEnd: 900,
      q: 0.9,
      pan: 0.04,
      destinationGain: this.bgmGain,
    });
  }

  playLeadSynth(note, when = 0, accent = false) {
    this.playSynthVoice({
      notes: [note],
      when,
      duration: accent ? 0.2 : 0.14,
      volume: accent ? 0.068 : 0.056,
      type: "sawtooth",
      detunes: [-9, 0, 9],
      attack: 0.005,
      sustainLevel: 0.38,
      filterStart: accent ? 4200 : 3400,
      filterEnd: 1200,
      q: 1,
      pan: 0.08,
      destinationGain: this.bgmGain,
    });
  }

  playCounterSynth(note, when = 0) {
    this.playSynthVoice({
      notes: [note],
      when,
      duration: 0.1,
      volume: 0.03,
      type: "square",
      detunes: [0],
      attack: 0.004,
      sustainLevel: 0.28,
      filterStart: 3200,
      filterEnd: 1600,
      q: 0.8,
      pan: 0.16,
      destinationGain: this.bgmGain,
    });
  }

  getTargetBgmMode(gameMode) {
    if (gameMode === "title" || gameMode === "select" || gameMode === "match-over") {
      return "menu";
    }

    if (gameMode === "intro" || gameMode === "fighting" || gameMode === "round-over") {
      return "battle";
    }

    return "silent";
  }

  playBgmStep(pattern, startTime) {
    if (!this.context || !this.bgmGain || !pattern) return;

    const step = pattern.steps[this.bgmStepIndex % pattern.steps.length];
    const when = Math.max(0, startTime - this.context.currentTime);
    const layers = [];
    const leadVolume = step.accent ? 0.084 : 0.072;
    const bassVolume = step.accent ? 0.066 : 0.056;
    const counterVolume = step.accent ? 0.045 : 0.036;

    if (step.bass) {
      const bassFrequency = midiToFrequency(step.bass);
      this.playTone({
        frequency: bassFrequency,
        endFrequency: bassFrequency * 0.995,
        duration: pattern.stepSeconds * 0.94,
        volume: bassVolume,
        type: "triangle",
        attack: 0.01,
        when,
        destinationGain: this.bgmGain,
      });
      layers.push("bass");
    }

    if (step.subBass) {
      const subBassFrequency = midiToFrequency(step.subBass);
      this.playTone({
        frequency: subBassFrequency,
        endFrequency: subBassFrequency * 0.996,
        duration: pattern.stepSeconds * 0.86,
        volume: 0.032,
        type: "sine",
        attack: 0.012,
        when,
        destinationGain: this.bgmGain,
      });
      layers.push("subBass");
    }

    if (Array.isArray(step.pad)) {
      step.pad.forEach((note, index) => {
        const padFrequency = midiToFrequency(note);
        this.playTone({
          frequency: padFrequency,
          endFrequency: padFrequency * 1.002,
          duration: pattern.stepSeconds * 0.92,
          volume: Math.max(0.016, 0.026 - index * 0.004),
          type: "triangle",
          attack: 0.018,
          when,
          filterFrequency: 1800,
          destinationGain: this.bgmGain,
        });
      });
      layers.push("pad");
    }

    if (Array.isArray(step.lead)) {
      step.lead.forEach((note, index) => {
        const leadFrequency = midiToFrequency(note);
        this.playTone({
          frequency: leadFrequency,
          endFrequency: leadFrequency * 1.004,
          duration: pattern.stepSeconds * 0.62,
          volume: Math.max(0.032, leadVolume - index * 0.012),
          type: "square",
          attack: 0.008,
          when: when + index * 0.012,
          filterFrequency: 2500,
          destinationGain: this.bgmGain,
        });
      });
      layers.push("lead");
    }

    if (Array.isArray(step.counter)) {
      step.counter.forEach((note, index) => {
        const counterFrequency = midiToFrequency(note);
        this.playTone({
          frequency: counterFrequency,
          endFrequency: counterFrequency * 0.998,
          duration: pattern.stepSeconds * 0.42,
          volume: Math.max(0.02, counterVolume - index * 0.008),
          type: "sine",
          attack: 0.006,
          when: when + pattern.stepSeconds * 0.34 + index * 0.01,
          filterFrequency: 2600,
          destinationGain: this.bgmGain,
        });
      });
      layers.push("counter");
    }

    if (step.accent || step.noiseVolume) {
      this.playNoise({
        duration: 0.026,
        volume: step.noiseVolume ?? 0.008,
        frequency: step.noiseFrequency ?? 2200,
        when,
        destinationGain: this.bgmGain,
      });
      layers.push("noise");
    }

    this.lastBgmLayers = layers;

    this.bgmStepIndex = (this.bgmStepIndex + 1) % pattern.steps.length;
  }

  syncBgm(gameMode) {
    const targetMode = this.getTargetBgmMode(gameMode);
    if (targetMode !== this.requestedBgmMode) {
      this.requestedBgmMode = targetMode;
      this.bgmMode = targetMode;
      this.bgmStepIndex = 0;
      this.bgmNextNoteTime = this.context ? this.context.currentTime + 0.02 : 0;
    }

    const context = this.ensureContext();
    if (!context || !this.masterGain || !this.enabled || context.state !== "running") {
      this.ready = Boolean(context) && context.state === "running";
      return;
    }

    if (targetMode === "silent") {
      this.bgmMode = "silent";
      this.lastBgmLayers = [];
      return;
    }

    const pattern = BGM_PATTERNS[targetMode];
    if (!pattern) return;

    const lookAhead = 0.16;
    if (this.bgmNextNoteTime < context.currentTime) {
      this.bgmNextNoteTime = context.currentTime + 0.02;
    }

    while (this.bgmNextNoteTime <= context.currentTime + lookAhead) {
      this.playBgmStep(pattern, this.bgmNextNoteTime);
      this.bgmNextNoteTime += pattern.stepSeconds;
    }
  }

  play(id) {
    this.pushEvent(id);

    const context = this.ensureContext();
    if (!context || !this.masterGain || !this.enabled || context.state !== "running") {
      this.ready = Boolean(context) && context.state === "running";
      return;
    }

    switch (id) {
      case "menuMove":
        this.playTone({ frequency: 620, endFrequency: 760, duration: 0.045, volume: 0.03, type: "square" });
        break;
      case "menuConfirm":
        this.playTone({ frequency: 420, endFrequency: 560, duration: 0.08, volume: 0.04, type: "triangle" });
        this.playTone({ frequency: 640, endFrequency: 860, duration: 0.1, volume: 0.028, type: "square", when: 0.03 });
        break;
      case "menuCancel":
        this.playTone({ frequency: 340, endFrequency: 190, duration: 0.09, volume: 0.045, type: "sawtooth" });
        break;
      case "roundStart":
        this.playTone({ frequency: 220, endFrequency: 230, duration: 0.11, volume: 0.045, type: "triangle" });
        this.playTone({ frequency: 280, endFrequency: 294, duration: 0.11, volume: 0.04, type: "triangle", when: 0.07 });
        this.playTone({ frequency: 360, endFrequency: 382, duration: 0.15, volume: 0.05, type: "triangle", when: 0.15 });
        break;
      case "jump":
        this.playJumpSe();
        break;
      case "punch":
        this.playPunchSe();
        break;
      case "kick":
        this.playKickSe();
        break;
      case "fireball":
        this.playFireballSe();
        break;
      case "guard":
        this.playTone({ frequency: 260, endFrequency: 210, duration: 0.06, volume: 0.04, type: "triangle" });
        this.playNoise({ duration: 0.04, volume: 0.016, frequency: 1500 });
        break;
      case "hit":
        this.playTone({ frequency: 140, endFrequency: 72, duration: 0.12, volume: 0.055, type: "square", filterFrequency: 1100 });
        this.playNoise({ duration: 0.08, volume: 0.02, frequency: 720, when: 0.008 });
        break;
      case "projectileClash":
        this.playTone({ frequency: 600, endFrequency: 240, duration: 0.12, volume: 0.042, type: "triangle" });
        this.playNoise({ duration: 0.07, volume: 0.02, frequency: 1800 });
        break;
      case "ko":
        this.playTone({ frequency: 260, endFrequency: 220, duration: 0.12, volume: 0.045, type: "sawtooth" });
        this.playTone({ frequency: 180, endFrequency: 120, duration: 0.16, volume: 0.05, type: "sawtooth", when: 0.11 });
        this.playTone({ frequency: 110, endFrequency: 70, duration: 0.22, volume: 0.055, type: "triangle", when: 0.26 });
        break;
      case "matchWin":
        this.playTone({ frequency: 330, endFrequency: 350, duration: 0.1, volume: 0.04, type: "triangle" });
        this.playTone({ frequency: 440, endFrequency: 470, duration: 0.12, volume: 0.04, type: "triangle", when: 0.09 });
        this.playTone({ frequency: 660, endFrequency: 700, duration: 0.18, volume: 0.05, type: "triangle", when: 0.2 });
        break;
      case "roundWin":
        this.playTone({ frequency: 280, endFrequency: 320, duration: 0.1, volume: 0.04, type: "triangle" });
        this.playTone({ frequency: 420, endFrequency: 470, duration: 0.14, volume: 0.04, type: "triangle", when: 0.08 });
        break;
      default:
        break;
    }

    this.ready = context.state === "running";
  }

  serialize() {
    this.ready = Boolean(this.context) && this.context.state === "running";
    return {
      ready: this.ready,
      bgmMode: this.requestedBgmMode,
      bgmActive: this.ready && this.requestedBgmMode !== "silent",
      bgmStep: this.bgmStepIndex,
      bgmLayers: this.lastBgmLayers,
      recent: this.recentEvents.slice(-8),
    };
  }
}

export class SuritreeFighterGame {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;
    this.canvas.tabIndex = 0;
    this.canvas.style.outline = "none";

    this.onStatusChange = options.onStatusChange ?? (() => {});
    this.input = new InputManager();
    this.sound = new SoundManager();

    this.mode = "loading";
    this.characters = [];
    this.selection = {
      phase: "player",
      cursor: 0,
      playerIndex: null,
      enemyIndex: null,
      difficultyCursor: DEFAULT_CPU_LEVEL_INDEX,
      cpuLevelIndex: DEFAULT_CPU_LEVEL_INDEX,
    };

    this.fighters = [];
    this.roundNumber = 1;
    this.roundTimer = 99;
    this.introTimer = 0;
    this.roundOverTimer = 0;
    this.hitstopFrames = 0;
    this.frameAccumulator = 0;
    this.lastFrameTime = 0;
    this.externalTimeControl = false;
    this.uiFrame = 0;
    this.effects = [];
    this.projectiles = [];
    this.playerCommandBuffer = [];
    this.lastPlayerCommandFrame = -FIREBALL_COMMAND_WINDOW;
    this.announcement = "素材を読み込み中";
    this.announcementSub = "しばらくお待ちください";
    this.lastError = null;

    this.loadAssets();
  }

  playSound(id) {
    this.sound.play(id);
  }

  async loadAssets() {
    try {
      const loaded = await Promise.all(
        CHARACTER_DEFS.map(async (character) => ({
          ...character,
          portrait: await loadPortrait(character.portraitSrc),
          spriteFrames: await loadSpriteFrames(character.spriteSrc),
          specialFrames: await loadSpriteFrames(character.specialSpriteSrc),
        }))
      );

      this.characters = loaded;
      this.resetMatch();
    } catch (error) {
      this.lastError = error;
      this.mode = "error";
      this.announcement = "素材の読み込みに失敗しました";
      this.announcementSub = String(error);
      this.refreshStatus();
      console.error(error);
    }
  }

  start() {
    const loop = (timestamp) => {
      if (!this.lastFrameTime) this.lastFrameTime = timestamp;
      const deltaMs = clamp(timestamp - this.lastFrameTime, 0, 80);
      this.lastFrameTime = timestamp;

      if (!this.externalTimeControl) {
        this.frameAccumulator += deltaMs;
        while (this.frameAccumulator >= FIXED_STEP_MS) {
          this.step();
          this.frameAccumulator -= FIXED_STEP_MS;
        }
      }

      this.render();
      window.requestAnimationFrame(loop);
    };

    window.requestAnimationFrame(loop);
  }

  advanceTime(ms) {
    this.externalTimeControl = true;
    const steps = Math.max(1, Math.round(ms / FIXED_STEP_MS));
    for (let index = 0; index < steps; index += 1) {
      this.step();
    }
    this.render();
    return Promise.resolve();
  }

  isMenuLikeMode() {
    return this.mode === "title" || this.mode === "select" || this.mode === "match-over";
  }

  resetMatch() {
    if (!this.characters.length) {
      this.mode = "loading";
      this.refreshStatus();
      return;
    }

    this.mode = "title";
    this.selection = {
      phase: "player",
      cursor: 0,
      playerIndex: null,
      enemyIndex: null,
      difficultyCursor: DEFAULT_CPU_LEVEL_INDEX,
      cpuLevelIndex: DEFAULT_CPU_LEVEL_INDEX,
    };
    this.fighters = [];
    this.roundNumber = 1;
    this.roundTimer = 99;
    this.hitstopFrames = 0;
    this.effects = [];
    this.projectiles = [];
    this.playerCommandBuffer = [];
    this.lastPlayerCommandFrame = -FIREBALL_COMMAND_WINDOW;
    this.announcement = "スリトリーファイター";
    this.announcementSub = "Enter または Z でスタート";
    this.refreshStatus();
    this.render();
  }

  openCharacterSelect() {
    this.mode = "select";
    this.selection = {
      phase: "player",
      cursor: 0,
      playerIndex: null,
      enemyIndex: null,
      difficultyCursor: DEFAULT_CPU_LEVEL_INDEX,
      cpuLevelIndex: DEFAULT_CPU_LEVEL_INDEX,
    };
    this.fighters = [];
    this.roundNumber = 1;
    this.roundTimer = 99;
    this.hitstopFrames = 0;
    this.effects = [];
    this.projectiles = [];
    this.playerCommandBuffer = [];
    this.lastPlayerCommandFrame = -FIREBALL_COMMAND_WINDOW;
    this.announcement = "キャラクター選択";
    this.announcementSub = "プレイヤーキャラを選んで Enter / Z";
    this.refreshStatus();
    this.render();
  }

  startMatch() {
    if (this.mode === "loading" || this.mode === "error") return;

    if (this.mode === "title") {
      this.playSound("menuConfirm");
      this.openCharacterSelect();
      return;
    }

    if (this.mode === "select") {
      this.confirmSelection();
      return;
    }

    if (this.mode === "match-over") {
      this.playSound("menuConfirm");
      this.resetMatch();
    }
  }

  confirmSelection() {
    const cursor = this.selection.cursor;

    if (this.selection.phase === "player") {
      this.playSound("menuConfirm");
      this.selection.playerIndex = cursor;
      this.selection.phase = "enemy";
      if (this.selection.cursor === this.selection.playerIndex) {
        this.selection.cursor = (this.selection.cursor + 1) % this.characters.length;
      }
      this.announcement = "キャラクター選択";
      this.announcementSub = "対戦相手を選んで Enter / Z";
      this.refreshStatus();
      return;
    }

    if (this.selection.phase === "enemy") {
      if (cursor === this.selection.playerIndex) return;
      this.playSound("menuConfirm");
      this.selection.enemyIndex = cursor;
      this.selection.phase = "difficulty";
      this.selection.difficultyCursor = this.selection.cpuLevelIndex ?? DEFAULT_CPU_LEVEL_INDEX;
      this.announcement = "CPU強さ選択";
      this.announcementSub = "CPUの強さを選んで Enter / Z";
      this.refreshStatus();
      return;
    }

    this.playSound("menuConfirm");
    this.selection.cpuLevelIndex = this.selection.difficultyCursor;
    this.prepareBattle();
  }

  prepareBattle() {
    const playerCharacter = this.characters[this.selection.playerIndex];
    const enemyCharacter = this.characters[this.selection.enemyIndex];
    const cpuLevel = getCpuLevel(this.selection.cpuLevelIndex);
    this.fighters = [
      createFighter(playerCharacter, "player", false),
      createFighter(enemyCharacter, "enemy", true, cpuLevel),
    ];
    this.fighters[0].roundsWon = 0;
    this.fighters[1].roundsWon = 0;
    this.roundNumber = 1;
    this.startRound();
  }

  startRound() {
    this.mode = "intro";
    this.roundTimer = 99;
    this.introTimer = ROUND_INTRO_SECONDS;
    this.roundOverTimer = 0;
    this.hitstopFrames = 0;
    this.effects = [];
    this.projectiles = [];
    this.playerCommandBuffer = [];
    this.lastPlayerCommandFrame = -FIREBALL_COMMAND_WINDOW;
    this.announcement = `第${this.roundNumber}ラウンド`;
    this.announcementSub = "ファイト";
    this.playSound("roundStart");

    this.resetFighterForRound(this.fighters[0], "player");
    this.resetFighterForRound(this.fighters[1], "enemy");
    this.refreshStatus();
  }

  resetFighterForRound(fighter, side) {
    fighter.x = side === "player" ? 364 : 916;
    fighter.y = STAGE.groundY;
    fighter.vx = 0;
    fighter.vy = 0;
    fighter.facing = side === "player" ? 1 : -1;
    fighter.health = 100;
    fighter.state = "idle";
    fighter.attack = null;
    fighter.hitstunFrames = 0;
    fighter.guardFrames = 0;
    fighter.attackAnimationCounter = 0;
    fighter.animationCounter = 0;
    fighter.airControl = 0;
    fighter.airAttackUsed = false;
    fighter.fireballCooldownFrames = 0;
    fighter.crouching = false;
    fighter.downHeld = false;
    fighter.backHeld = false;
    fighter.guardType = null;
    fighter.cpuData.decisionFrames =
      fighter.cpu && fighter.cpuData.level
        ? getCpuDecisionFrames(fighter.cpuData.level)
        : 16;
  }

  finishRound(winner, reason) {
    this.mode = "round-over";
    this.roundOverTimer = ROUND_END_SECONDS;
    this.hitstopFrames = 0;
    this.projectiles = [];

    if (winner) {
      winner.roundsWon += 1;
      this.announcement = `${winner.character.name}の勝利`;
      this.announcementSub = reason;
    } else {
      this.announcement = "引き分け";
      this.announcementSub = reason;
    }

    const champion = this.fighters.find((fighter) => fighter.roundsWon >= MAX_ROUNDS_TO_WIN);
    if (champion) {
      this.mode = "match-over";
      this.announcement = `${champion.character.name}が優勝`;
      this.announcementSub = "Enter または Z でタイトルへ戻る";
      this.playSound("matchWin");
    } else if (winner) {
      this.playSound(reason === "ノックアウト" ? "ko" : "roundWin");
    }

    this.refreshStatus();
  }

  step() {
    this.uiFrame += 1;
    this.sound.syncBgm(this.mode);

    if (this.input.wasPressed("fullscreen")) {
      this.toggleFullscreen();
    }

    const wantsMenuConfirm =
      this.input.wasPressed("enter") ||
      this.input.wasPressed("space") ||
      ((this.mode === "title" || this.mode === "match-over") && this.input.wasPressed("punch"));

    if (wantsMenuConfirm && this.isMenuLikeMode()) {
      const previousMode = this.mode;
      this.startMatch();
      if (previousMode === "title" || previousMode === "match-over") {
        this.input.commit();
        return;
      }
    }

    if (this.mode === "loading" || this.mode === "error") {
      this.input.commit();
      return;
    }

    if (this.mode === "select") {
      this.updateSelection();
      this.input.commit();
      return;
    }

    if (this.mode === "match-over") {
      this.input.commit();
      return;
    }

    if (this.hitstopFrames > 0) {
      this.hitstopFrames -= 1;
      this.input.commit();
      return;
    }

    if (this.mode === "intro") {
      this.introTimer = Math.max(0, this.introTimer - FIXED_STEP_SECONDS);
      if (this.introTimer <= 0) {
        this.mode = "fighting";
        this.refreshStatus();
      }
      this.updateEffects();
      this.input.commit();
      return;
    }

    if (this.mode === "fighting") {
      this.roundTimer = Math.max(0, this.roundTimer - FIXED_STEP_SECONDS);
      this.updateBattle();
      this.checkRoundEnd();
      this.input.commit();
      return;
    }

    if (this.mode === "round-over") {
      this.roundOverTimer = Math.max(0, this.roundOverTimer - FIXED_STEP_SECONDS);
      if (this.roundOverTimer <= 0) {
        this.roundNumber += 1;
        this.startRound();
      }
      this.input.commit();
      return;
    }

    this.input.commit();
  }

  updateSelection() {
    if (this.input.wasPressed("left")) {
      if (this.selection.phase === "difficulty") {
        this.selection.difficultyCursor =
          (this.selection.difficultyCursor + CPU_LEVELS.length - 1) % CPU_LEVELS.length;
        this.playSound("menuMove");
      } else {
        if (this.moveSelectionCursor(-1, 0)) this.playSound("menuMove");
      }
    }

    if (this.input.wasPressed("right")) {
      if (this.selection.phase === "difficulty") {
        this.selection.difficultyCursor = (this.selection.difficultyCursor + 1) % CPU_LEVELS.length;
        this.playSound("menuMove");
      } else {
        if (this.moveSelectionCursor(1, 0)) this.playSound("menuMove");
      }
    }

    if (this.selection.phase !== "difficulty" && this.input.wasPressed("up")) {
      if (this.moveSelectionCursor(0, -1)) this.playSound("menuMove");
    }

    if (this.selection.phase !== "difficulty" && this.input.wasPressed("down")) {
      if (this.moveSelectionCursor(0, 1)) this.playSound("menuMove");
    }

    if (this.input.wasPressed("punch")) {
      this.confirmSelection();
    }

    if (this.input.wasPressed("kick")) {
      if (this.selection.phase === "difficulty") {
        this.playSound("menuCancel");
        this.selection.phase = "enemy";
        this.announcement = "キャラクター選択";
        this.announcementSub = "対戦相手を選んで Enter / Z";
        this.refreshStatus();
      } else if (this.selection.phase === "enemy") {
        this.playSound("menuCancel");
        this.selection.phase = "player";
        this.selection.enemyIndex = null;
        this.selection.cursor = this.selection.playerIndex ?? 0;
        this.announcement = "キャラクター選択";
        this.announcementSub = "プレイヤーキャラを選んで Enter / Z";
        this.refreshStatus();
      } else {
        this.playSound("menuCancel");
        this.resetMatch();
      }
    }
  }

  moveSelectionCursor(columnStep, rowStep) {
    const total = this.characters.length;
    if (total <= 1) return false;

    const columns = Math.min(SELECTION_GRID_COLUMNS, total);
    const rows = Math.ceil(total / columns);
    const currentRow = Math.floor(this.selection.cursor / columns);
    const currentColumn = this.selection.cursor % columns;

    if (columnStep !== 0) {
      let nextColumn = currentColumn;
      do {
        nextColumn = (nextColumn + columnStep + columns) % columns;
        const nextIndex = currentRow * columns + nextColumn;
        if (nextIndex < total) {
          this.selection.cursor = nextIndex;
          return true;
        }
      } while (nextColumn !== currentColumn);
    }

    if (rowStep !== 0) {
      let nextRow = currentRow;
      do {
        nextRow = (nextRow + rowStep + rows) % rows;
        const nextIndex = nextRow * columns + currentColumn;
        if (nextIndex < total) {
          this.selection.cursor = nextIndex;
          return true;
        }
      } while (nextRow !== currentRow);
    }

    return false;
  }

  getRelativeInputDirection(facing) {
    const horizontal = (this.input.isDown("right") ? 1 : 0) - (this.input.isDown("left") ? 1 : 0);
    const down = this.input.isDown("down");
    const forward = facing === 1 ? horizontal > 0 : horizontal < 0;
    const back = facing === 1 ? horizontal < 0 : horizontal > 0;

    if (down && forward) return "df";
    if (down && back) return "db";
    if (down) return "d";
    if (forward) return "f";
    if (back) return "b";
    return "n";
  }

  recordPlayerCommandInput(fighter) {
    const direction = this.getRelativeInputDirection(fighter.facing);
    const lastEntry = this.playerCommandBuffer[this.playerCommandBuffer.length - 1];

    if (!lastEntry || lastEntry.direction !== direction) {
      this.playerCommandBuffer.push({ direction, frame: this.uiFrame });
    } else {
      lastEntry.frame = this.uiFrame;
    }

    this.playerCommandBuffer = this.playerCommandBuffer.filter(
      (entry) => this.uiFrame - entry.frame <= FIREBALL_COMMAND_WINDOW
    );
  }

  hasQuarterCircleForwardCommand(fighter) {
    const currentDirection = this.getRelativeInputDirection(fighter.facing);
    if (!["df", "f"].includes(currentDirection)) return false;

    const recentDirections = this.playerCommandBuffer
      .filter(
        (entry) =>
          entry.frame > this.lastPlayerCommandFrame &&
          this.uiFrame - entry.frame <= FIREBALL_COMMAND_WINDOW
      )
      .map((entry) => entry.direction)
      .filter((direction, index, all) => direction !== "n" && direction !== all[index - 1]);

    let sawDown = false;
    let sawDiagonal = false;
    for (const direction of recentDirections) {
      if (!sawDown) {
        sawDown = direction === "d";
        continue;
      }

      if (!sawDiagonal) {
        sawDiagonal = direction === "df";
        continue;
      }

      if (direction === "df" || direction === "f") return true;
    }

    return sawDown && sawDiagonal;
  }

  consumePlayerCommand() {
    this.lastPlayerCommandFrame = this.uiFrame;
  }

  updateBattle() {
    const player = this.fighters[0];
    const enemy = this.fighters[1];

    this.updateFacing(player, enemy);
    this.recordPlayerCommandInput(player);

    const playerIntent = this.buildPlayerIntent(player);
    const enemyIntent = this.buildCpuIntent(enemy, player);

    this.updateFighter(player, playerIntent, enemy);
    this.updateFighter(enemy, enemyIntent, player);

    this.resolvePushboxes();
    this.resolveAttack(player, enemy);
    this.resolveAttack(enemy, player);
    this.updateProjectiles();
    this.resolveProjectileClashes();
    this.resolveProjectiles();
    this.updateEffects();
  }

  updateFacing(player, enemy) {
    const delta = enemy.x - player.x;
    if (Math.abs(delta) < 6) return;
    player.facing = delta > 0 ? 1 : -1;
    enemy.facing = -player.facing;
  }

  buildPlayerIntent(fighter) {
    const punchPressed = this.input.wasPressed("punch");
    return {
      left: this.input.isDown("left"),
      right: this.input.isDown("right"),
      down: this.input.isDown("down"),
      upPressed: this.input.wasPressed("up"),
      punchPressed,
      kickPressed: this.input.wasPressed("kick"),
      fireballPressed: punchPressed && this.hasQuarterCircleForwardCommand(fighter),
    };
  }

  hasActiveProjectile(ownerId) {
    return this.projectiles.some((projectile) => projectile.ownerId === ownerId);
  }

  getIncomingProjectile(fighter) {
    let nearestProjectile = null;
    let nearestDistance = Number.POSITIVE_INFINITY;

    this.projectiles.forEach((projectile) => {
      if (projectile.ownerId === fighter.id) return;
      const incoming =
        (projectile.vx > 0 && projectile.x <= fighter.x) ||
        (projectile.vx < 0 && projectile.x >= fighter.x);
      if (!incoming) return;

      const distance = Math.abs(projectile.x - fighter.x);
      if (distance >= nearestDistance) return;

      nearestProjectile = projectile;
      nearestDistance = distance;
    });

    return nearestProjectile;
  }

  buildCpuIntent(fighter, opponent) {
    const intent = {
      left: false,
      right: false,
      down: false,
      upPressed: false,
      punchPressed: false,
      kickPressed: false,
      fireballPressed: false,
    };

    if (fighter.hitstunFrames > 0 || fighter.guardFrames > 0) return intent;

    const level = fighter.cpuData.level ?? getCpuLevel(DEFAULT_CPU_LEVEL_INDEX);
    if (fighter.attack) return intent;

    const distance = Math.abs(opponent.x - fighter.x);
    const forwardKey = fighter.facing === 1 ? "right" : "left";
    const backKey = fighter.facing === 1 ? "left" : "right";
    const grounded = isGrounded(fighter);
    const opponentGrounded = isGrounded(opponent);
    const jumpInWindow = opponentGrounded && distance >= 118 && distance <= 248;
    const opponentDefensive = opponent.guardFrames > 0 || opponent.crouching;
    const opponentRecovering = opponent.hitstunFrames > 0 || opponent.guardFrames > 0;
    const preferredMin = level.preferredDistanceMin ?? 184;
    const preferredMax = level.preferredDistanceMax ?? 304;
    const keepawayChance = level.keepawayChance ?? level.retreatChance ?? 0.3;
    const zoningChance = level.zoningChance ?? 0.5;
    const punishChance = level.punishChance ?? 0.58;
    const whiffJumpChance = level.whiffJumpChance ?? 0.28;
    const confirmPressureChance = level.confirmPressureChance ?? level.pressureChance ?? 0.4;
    const jumpPatience = level.jumpPatience ?? 0.8;
    const neutralJumpBias = level.neutralJumpBias ?? 0.72;
    const groundGuardChance = grounded ? level.groundGuardChance ?? level.guardChance ?? 0.58 : level.guardChance ?? 0.58;
    const groundGuardRange = level.groundGuardRange ?? 178;
    const projectileGuardRange = level.projectileGuardRange ?? 214;
    const spacingRange = distance >= 132 && distance < preferredMin - 12;
    const tooCloseRange = distance < preferredMin - 36;
    const punishRange = distance < 166;
    const fireballRange = distance >= preferredMin - 18 && distance <= preferredMax + 72;
    const zoningRange = distance >= preferredMin + 12 && distance <= preferredMax + 120;
    const jumpPunishWindow = opponentGrounded && distance >= 164 && distance <= 292;
    const incomingProjectile = this.getIncomingProjectile(fighter);
    const ownProjectileActive = this.hasActiveProjectile(fighter.id);
    const canThrowFireball = !ownProjectileActive && fighter.fireballCooldownFrames <= 0;
    const opponentFireball = opponent.attack?.kind === "fireball";
    const neutralGroundedThreat = opponentGrounded && !opponentRecovering;
    const groundedJumpPenalty = neutralGroundedThreat ? (opponentDefensive ? Math.min(0.94, jumpPatience + 0.12) : jumpPatience) : 1;
    const proactiveJumpPenalty = opponentRecovering ? 1 : opponentDefensive ? 0.88 : neutralJumpBias;

    if (grounded && incomingProjectile) {
      const shouldGuard =
        Math.abs(incomingProjectile.x - fighter.x) < projectileGuardRange &&
        Math.random() < Math.min(0.93, groundGuardChance + 0.08);
      if (shouldGuard) {
        intent[backKey] = true;
        return intent;
      }
    }

    if (grounded && opponent.attack) {
      const guardType = getGuardTypeForAttack(opponent.attack);
      const shouldGuard = distance < groundGuardRange && Math.random() < groundGuardChance;
      if (shouldGuard) {
        intent[backKey] = true;
        intent.down = guardType === "crouch";
        return intent;
      }
    }

    if (grounded && opponentFireball && jumpPunishWindow && !incomingProjectile && Math.random() < whiffJumpChance) {
      intent[forwardKey] = true;
      intent.upPressed = true;
      return intent;
    }

    fighter.cpuData.decisionFrames = Math.max(0, fighter.cpuData.decisionFrames - 1);

    if (!grounded) {
      const descending = fighter.vy > 1.6;
      const closeAirRange = Math.abs(opponent.x - fighter.x) < 172;
      const crouchKickWindow =
        opponent.crouching && descending && distance < 142 && fighter.y > STAGE.groundY - 148;
      const lateAirKickChance =
        level.lateAirKickChance ?? Math.min(0.82, (level.airAttackChance ?? level.pressureChance) * 0.84);

      if (distance > 108) {
        intent[forwardKey] = true;
      }
      if (!fighter.airAttackUsed && crouchKickWindow && Math.random() < lateAirKickChance) {
        intent.kickPressed = true;
        return intent;
      }
      if (
        !fighter.airAttackUsed &&
        closeAirRange &&
        Math.random() < (level.airAttackChance ?? level.pressureChance)
      ) {
        if (opponent.crouching && !descending) {
          return intent;
        }
        if (opponent.crouching) {
          intent.kickPressed = true;
        } else if (Math.random() < Math.max(0.45, level.pressureChance)) {
          intent.kickPressed = true;
        } else {
          intent.punchPressed = true;
        }
      }
      return intent;
    }

    if (distance > preferredMax + 36) {
      intent[forwardKey] = true;
    } else if ((tooCloseRange || spacingRange) && Math.random() < keepawayChance * 0.72) {
      intent[backKey] = true;
    }

    if (fighter.cpuData.decisionFrames > 0) {
      if (opponentRecovering && punishRange && Math.random() < punishChance * 0.72) {
        chooseCpuGroundAttack(intent, level, distance, {
          preferHeavy: distance > 108 || opponent.guardFrames > 0,
          preferLow: opponent.guardFrames > 0 && distance < 128 && Math.random() < (level.lowAttackChance ?? 0.3),
        });
        return intent;
      }
      if (
        opponentRecovering &&
        distance >= 120 &&
        distance < preferredMin + 20 &&
        Math.random() < confirmPressureChance * 0.72
      ) {
        intent[forwardKey] = true;
        return intent;
      }
      if (tooCloseRange || spacingRange) {
        intent[backKey] = true;
      }
      if (
        canThrowFireball &&
        zoningRange &&
        !incomingProjectile &&
        Math.random() < level.projectileChance * zoningChance * 0.46
      ) {
        intent.fireballPressed = true;
      }
      return intent;
    }

    fighter.cpuData.decisionFrames = getCpuDecisionFrames(level);

    if (opponentRecovering && punishRange && Math.random() < punishChance) {
      chooseCpuGroundAttack(intent, level, distance, {
        preferHeavy: distance > 108 || opponent.hitstunFrames > 0,
        preferLow: opponent.guardFrames > 0 && distance < 128 && Math.random() < (level.lowAttackChance ?? 0.3),
      });
      return intent;
    }

    if (
      opponentRecovering &&
      distance >= 120 &&
      distance < preferredMin + 28 &&
      Math.random() < confirmPressureChance
    ) {
      intent[forwardKey] = true;
      return intent;
    }

    if (tooCloseRange && !opponentRecovering && Math.random() < keepawayChance) {
      intent[backKey] = true;
      return intent;
    }

    if (canThrowFireball && (fireballRange || zoningRange) && !incomingProjectile) {
      const projectileChance =
        level.projectileChance *
        (zoningRange ? zoningChance * 1.12 : 1) *
        (distance >= preferredMin ? 1.72 : 1.04) *
        (opponentRecovering ? 1.12 : 1) *
        (opponentDefensive ? 1.06 : 1);
      if (Math.random() < projectileChance) {
        intent.fireballPressed = true;
        return intent;
      }
    }

    const jumpChance =
      level.jumpChance *
      (canThrowFireball && distance >= preferredMin ? 0.48 : 1) *
      (opponentDefensive ? 1.2 : 1) *
      (opponentRecovering ? 1.1 : 1) *
      groundedJumpPenalty *
      proactiveJumpPenalty;
    if (!spacingRange && jumpInWindow && Math.random() < jumpChance) {
      intent[forwardKey] = true;
      intent.upPressed = true;
      return intent;
    }

    if (
      !spacingRange &&
      distance > 188 &&
      Math.random() <
        level.jumpChance * 0.58 * groundedJumpPenalty * proactiveJumpPenalty * (opponentDefensive ? 1.06 : 1)
    ) {
      intent[forwardKey] = true;
      intent.upPressed = true;
      return intent;
    }

    if ((tooCloseRange || spacingRange) && Math.random() < keepawayChance) {
      intent[backKey] = true;
      return intent;
    }

    if (distance < 132) {
      if (!opponentRecovering && Math.random() < keepawayChance * 0.62) {
        intent[backKey] = true;
        return intent;
      }
      chooseCpuGroundAttack(intent, level, distance, {
        preferHeavy: distance > 104 || opponentRecovering,
        preferLow: opponent.guardFrames > 0 && distance < 124 && Math.random() < (level.lowAttackChance ?? 0.3),
      });
      return intent;
    }

    if (distance > preferredMax) {
      intent[forwardKey] = true;
      return intent;
    }

    if (distance < preferredMin) {
      intent[backKey] = true;
      return intent;
    }

    if (canThrowFireball && distance > 176 && Math.random() < level.projectileChance * zoningChance * 0.68) {
      intent.fireballPressed = true;
      return intent;
    }

    intent[forwardKey] = true;
    return intent;
  }

  updateFighter(fighter, intent, opponent) {
    fighter.animationCounter += 1;
    if (fighter.hitstunFrames > 0) fighter.hitstunFrames -= 1;
    if (fighter.guardFrames > 0) fighter.guardFrames -= 1;
    if (fighter.fireballCooldownFrames > 0) fighter.fireballCooldownFrames -= 1;

    const grounded = isGrounded(fighter);
    const horizontal = (intent.right ? 1 : 0) - (intent.left ? 1 : 0);
    const downHeld = grounded && Boolean(intent.down);
    const backHeld =
      grounded &&
      ((fighter.facing === 1 && Boolean(intent.left)) || (fighter.facing === -1 && Boolean(intent.right)));
    const canAct = fighter.hitstunFrames <= 0 && fighter.guardFrames <= 0 && !fighter.attack;
    const canAirAttack = !grounded && !fighter.airAttackUsed;

    fighter.downHeld = downHeld;
    fighter.backHeld = backHeld;
    fighter.crouching =
      grounded &&
      !isStandingSpecial(fighter.attack?.kind) &&
      (downHeld || fighter.guardType === "crouch" || isCrouchAttack(fighter.attack?.kind));

    if (canAct && grounded && intent.upPressed && !downHeld) {
      this.playSound("jump");
      fighter.vy = JUMP_TUNING.launchVy;
      fighter.vx = horizontal * JUMP_TUNING.launchVx;
      fighter.airControl = horizontal;
      fighter.airAttackUsed = false;
      fighter.crouching = false;
      fighter.guardType = null;
    }

    if (
      canAct &&
      grounded &&
      intent.fireballPressed &&
      fighter.fireballCooldownFrames <= 0 &&
      !this.hasActiveProjectile(fighter.id)
    ) {
      fighter.attack = {
        kind: "fireball",
        frame: 0,
        hit: false,
        airborne: false,
        spawned: false,
      };
      fighter.attackAnimationCounter = 0;
      fighter.crouching = false;
      fighter.downHeld = false;
      fighter.guardType = null;
      if (fighter.id === "player") this.consumePlayerCommand();
    } else if (canAct && (grounded || canAirAttack)) {
      if (intent.punchPressed) {
        this.playSound("punch");
        fighter.attack = {
          kind: grounded && downHeld ? "crouchPunch" : "punch",
          frame: 0,
          hit: false,
          airborne: !grounded,
        };
        fighter.attackAnimationCounter = 0;
        if (!grounded) fighter.airAttackUsed = true;
      } else if (intent.kickPressed) {
        this.playSound("kick");
        fighter.attack = {
          kind: grounded && downHeld ? "crouchKick" : "kick",
          frame: 0,
          hit: false,
          airborne: !grounded,
        };
        fighter.attackAnimationCounter = 0;
        if (!grounded) fighter.airAttackUsed = true;
      }
    }

    const groundedTarget = canAct && grounded && !downHeld ? horizontal * 4.1 : 0;
    const airDirection = horizontal !== 0 ? horizontal : fighter.airControl;
    const airTarget = airDirection * JUMP_TUNING.airDriftSpeed;

    if (fighter.hitstunFrames > 0 || fighter.guardFrames > 0) {
      fighter.vx = approach(fighter.vx, 0, 0.42);
    } else if (fighter.attack) {
      if (!grounded && fighter.attack.airborne) {
        fighter.vx = approach(fighter.vx, airTarget, JUMP_TUNING.airAttackDriftDelta);
      } else {
        fighter.vx = approach(fighter.vx, 0, 0.48);
      }
    } else if (grounded) {
      fighter.vx = approach(fighter.vx, groundedTarget, 0.62);
    } else {
      fighter.vx = approach(fighter.vx, airTarget, JUMP_TUNING.airDriftDelta);
    }

    if (!grounded) {
      fighter.vy += 0.72;
      fighter.vy = Math.min(fighter.vy, 18);
    }

    fighter.x += fighter.vx;
    fighter.y += fighter.vy;

    fighter.x = clamp(fighter.x, STAGE.leftWall + 48, STAGE.rightWall - 48);

    if (fighter.y >= STAGE.groundY) {
      fighter.y = STAGE.groundY;
      fighter.vy = 0;
      fighter.airControl = 0;
      fighter.airAttackUsed = false;
    }

    fighter.crouching =
      isGrounded(fighter) &&
      !isStandingSpecial(fighter.attack?.kind) &&
      (fighter.downHeld || fighter.guardType === "crouch" || isCrouchAttack(fighter.attack?.kind));

    if (fighter.attack) {
      fighter.attack.frame += 1;
      fighter.attackAnimationCounter += 1;
      const move = ATTACK_DEFS[fighter.attack.kind];
      if (fighter.attack.kind === "fireball" && !fighter.attack.spawned && fighter.attack.frame >= move.startup) {
        this.spawnProjectile(fighter);
        fighter.attack.spawned = true;
      }
      if (fighter.attack.frame >= totalAttackFrames(move)) {
        fighter.attack = null;
      }
    }

    if (fighter.health <= 0) {
      fighter.state = "ko";
      return;
    }

    if (fighter.hitstunFrames > 0) {
      fighter.state = "hit";
    } else if (fighter.guardFrames > 0) {
      fighter.state = fighter.guardType === "crouch" ? "crouch-guard" : "guard";
    } else if (fighter.attack) {
      fighter.state = "attack";
    } else if (!isGrounded(fighter)) {
      fighter.state = "jump";
    } else if (fighter.crouching) {
      fighter.state = "crouch";
    } else if (Math.abs(fighter.vx) > 0.6) {
      fighter.state = "walk";
    } else {
      fighter.state = "idle";
    }

    if (fighter.guardFrames <= 0 && fighter.state !== "guard" && fighter.state !== "crouch-guard") {
      fighter.guardType = null;
    }

    if (opponent) {
      fighter.facing = opponent.x >= fighter.x ? 1 : -1;
    }
  }

  spawnProjectile(fighter) {
    if (this.hasActiveProjectile(fighter.id)) return;
    fighter.fireballCooldownFrames = FIREBALL_PROJECTILE.cooldown;
    this.playSound("fireball");

    this.projectiles.push({
      ownerId: fighter.id,
      x: fighter.x + fighter.facing * FIREBALL_PROJECTILE.offsetX,
      y: fighter.y - FIREBALL_PROJECTILE.offsetY,
      vx: fighter.facing * FIREBALL_PROJECTILE.speed,
      radius: FIREBALL_PROJECTILE.radius,
      damage: FIREBALL_PROJECTILE.damage,
      hitstun: FIREBALL_PROJECTILE.hitstun,
      blockstun: FIREBALL_PROJECTILE.blockstun,
      pushback: FIREBALL_PROJECTILE.pushback,
      guardPushback: FIREBALL_PROJECTILE.guardPushback,
      guardProfile: "high",
      facing: fighter.facing,
      life: FIREBALL_PROJECTILE.life,
      maxLife: FIREBALL_PROJECTILE.life,
      color: fighter.character.accent,
    });

    this.effects.push({
      x: fighter.x + fighter.facing * 76,
      y: fighter.y - FIREBALL_PROJECTILE.offsetY + 6,
      life: 10,
      maxLife: 10,
      color: "#ffe8b3",
    });
  }

  resolveProjectileClashes() {
    for (let index = 0; index < this.projectiles.length; index += 1) {
      const projectile = this.projectiles[index];
      if (projectile.spent) continue;

      for (let otherIndex = index + 1; otherIndex < this.projectiles.length; otherIndex += 1) {
        const other = this.projectiles[otherIndex];
        if (other.spent) continue;
        if (projectile.ownerId === other.ownerId) continue;
        if (!rectsIntersect(getProjectileBox(projectile), getProjectileBox(other))) continue;

        projectile.spent = true;
        other.spent = true;
        this.playSound("projectileClash");
        this.effects.push({
          x: (projectile.x + other.x) / 2,
          y: (projectile.y + other.y) / 2,
          life: 12,
          maxLife: 12,
          color: "#fff4c7",
        });
        break;
      }
    }

    this.projectiles = this.projectiles.filter((projectile) => !projectile.spent);
  }

  updateProjectiles() {
    this.projectiles.forEach((projectile) => {
      projectile.x += projectile.vx;
      projectile.life -= 1;
    });

    this.projectiles = this.projectiles.filter(
      (projectile) =>
        projectile.life > 0 &&
        projectile.x + projectile.radius >= STAGE.leftWall &&
        projectile.x - projectile.radius <= STAGE.rightWall
    );
  }

  resolveProjectiles() {
    this.projectiles.forEach((projectile) => {
      if (projectile.spent) return;

      const defender = this.fighters.find((fighter) => fighter.id !== projectile.ownerId);
      if (!defender || defender.health <= 0) return;
      if (!rectsIntersect(getProjectileBox(projectile), getHurtBox(defender))) return;

      const activeGuardType =
        defender.guardFrames > 0 && defender.guardType
          ? defender.guardType
          : defender.downHeld
            ? "crouch"
            : "stand";

      const blocked =
        isGrounded(defender) &&
        !defender.attack &&
        (defender.backHeld || defender.guardFrames > 0) &&
        canGuardAttack(activeGuardType, projectile);

      if (blocked) {
        this.playSound("guard");
        defender.guardFrames = projectile.blockstun;
        defender.guardType = activeGuardType;
        defender.state = defender.guardType === "crouch" ? "crouch-guard" : "guard";
        defender.vx = projectile.facing * projectile.guardPushback;
        this.hitstopFrames = 4;
        this.effects.push({
          x: projectile.x,
          y: projectile.y,
          life: 12,
          maxLife: 12,
          color: "#fff4c7",
        });
      } else {
        this.playSound("hit");
        defender.health = clamp(defender.health - projectile.damage, 0, 100);
        defender.attack = null;
        defender.hitstunFrames = projectile.hitstun;
        defender.state = "hit";
        defender.vx = projectile.facing * projectile.pushback;
        this.hitstopFrames = 5;
        this.effects.push({
          x: projectile.x,
          y: projectile.y,
          life: 14,
          maxLife: 14,
          color: projectile.color,
        });
      }

      projectile.spent = true;
    });

    this.projectiles = this.projectiles.filter((projectile) => !projectile.spent);
  }

  resolvePushboxes() {
    const [player, enemy] = this.fighters;
    const a = getPushBox(player);
    const b = getPushBox(enemy);
    if (!a || !b) return;

    const overlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    if (overlap <= 0) return;

    const shift = overlap / 2 + 0.01;
    player.x -= shift;
    enemy.x += shift;
    player.x = clamp(player.x, STAGE.leftWall + 48, STAGE.rightWall - 48);
    enemy.x = clamp(enemy.x, STAGE.leftWall + 48, STAGE.rightWall - 48);
  }

  resolveAttack(attacker, defender) {
    if (!attacker.attack || attacker.attack.hit) return;
    const attackBox = getAttackBox(attacker);
    if (!attackBox) return;
    if (!rectsIntersect(attackBox, getHurtBox(defender))) return;

    const move = ATTACK_DEFS[attacker.attack.kind];
    attacker.attack.hit = true;

    const activeGuardType =
      defender.guardFrames > 0 && defender.guardType
        ? defender.guardType
        : defender.downHeld
          ? "crouch"
          : "stand";

    const blocked =
      isGrounded(defender) &&
      !defender.attack &&
      (defender.backHeld || defender.guardFrames > 0) &&
      canGuardAttack(activeGuardType, attacker.attack) &&
      defender.health > 0;

    if (blocked) {
      this.playSound("guard");
      defender.guardFrames = move.blockstun;
      defender.guardType = activeGuardType;
      defender.state = defender.guardType === "crouch" ? "crouch-guard" : "guard";
      defender.vx = attacker.facing * move.guardPushback;
      attacker.vx -= attacker.facing * 1.2;
      this.hitstopFrames = 4;
      this.effects.push({
        x: attacker.facing === 1 ? attackBox.right : attackBox.left,
        y: (attackBox.top + attackBox.bottom) / 2,
        life: 12,
        maxLife: 12,
        color: "#fff4c7",
      });
      return;
    }

    this.playSound("hit");
    defender.health = clamp(defender.health - move.damage, 0, 100);
    defender.attack = null;
    defender.hitstunFrames = move.hitstun;
    defender.state = "hit";
    defender.vx = attacker.facing * move.pushback;
    attacker.vx -= attacker.facing * 1.8;
    this.hitstopFrames = 6;
    this.effects.push({
      x: attacker.facing === 1 ? attackBox.right : attackBox.left,
      y: (attackBox.top + attackBox.bottom) / 2,
      life: 14,
      maxLife: 14,
      color: attacker.character.accent,
    });
  }

  updateEffects() {
    this.effects.forEach((effect) => {
      effect.life -= 1;
    });
    this.effects = this.effects.filter((effect) => effect.life > 0);
  }

  checkRoundEnd() {
    const [player, enemy] = this.fighters;
    if (player.health <= 0 || enemy.health <= 0) {
      if (player.health === enemy.health) {
        this.finishRound(null, "引き分け");
      } else {
        this.finishRound(player.health > enemy.health ? player : enemy, "ノックアウト");
      }
      return;
    }

    if (this.roundTimer <= 0) {
      if (player.health === enemy.health) {
        this.finishRound(null, "時間切れ引き分け");
      } else {
        this.finishRound(player.health > enemy.health ? player : enemy, "時間切れ判定");
      }
    }
  }

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    this.canvas.requestFullscreen?.().catch(() => {});
  }

  refreshStatus() {
    let text = "素材読込中";
    if (this.mode === "title") {
      text = "タイトル";
    } else if (this.mode === "select") {
      text =
        this.selection.phase === "player"
          ? "プレイヤー選択"
          : this.selection.phase === "enemy"
            ? "対戦相手選択"
            : "CPU強さ選択";
    } else if (this.mode === "intro") {
      text = `第${this.roundNumber}ラウンド`;
    } else if (this.mode === "fighting") {
      text = "対戦中";
    } else if (this.mode === "round-over") {
      text = "ラウンド終了";
    } else if (this.mode === "match-over") {
      text = "試合終了";
    } else if (this.mode === "error") {
      text = "素材エラー";
    }
    this.onStatusChange(text);
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, STAGE.width, STAGE.height);
    this.drawStage(ctx);

    if (this.mode === "loading" || this.mode === "error") {
      this.drawCenterOverlay(ctx, this.announcement, this.announcementSub);
      return;
    }

    if (this.mode === "title") {
      this.drawTitleScreen(ctx);
      return;
    }

    if (this.mode === "select") {
      this.drawSelectionScreen(ctx);
      return;
    }

    this.drawBattlePortraits(ctx);
    this.drawFighter(ctx, this.fighters[0]);
    this.drawFighter(ctx, this.fighters[1]);
    this.drawProjectiles(ctx);
    this.drawEffects(ctx);
    this.drawHud(ctx);

    if (this.mode === "intro" || this.mode === "round-over" || this.mode === "match-over") {
      this.drawCenterOverlay(ctx, this.announcement, this.announcementSub);
    }
  }

  drawStage(ctx) {
    const sky = ctx.createLinearGradient(0, 0, 0, STAGE.height);
    sky.addColorStop(0, "#1c2048");
    sky.addColorStop(0.4, "#f1914e");
    sky.addColorStop(1, "#6f2f18");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, STAGE.width, STAGE.height);

    const glow = ctx.createRadialGradient(980, 124, 18, 980, 124, 240);
    glow.addColorStop(0, "rgba(255, 245, 189, 0.98)");
    glow.addColorStop(0.3, "rgba(255, 218, 136, 0.82)");
    glow.addColorStop(1, "rgba(255, 158, 78, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, STAGE.width, 300);

    ctx.fillStyle = "rgba(21, 24, 40, 0.82)";
    for (let index = 0; index < 10; index += 1) {
      const width = 72 + (index % 3) * 18;
      const height = 130 + (index % 4) * 36;
      const x = 36 + index * 128;
      ctx.fillRect(x, STAGE.floorY - height - 80, width, height);
    }

    ctx.fillStyle = "#8a2e1d";
    ctx.fillRect(0, STAGE.floorY - 18, STAGE.width, 140);
    ctx.fillStyle = "#c95c36";
    ctx.fillRect(0, STAGE.floorY + 36, STAGE.width, STAGE.height - STAGE.floorY);

    ctx.strokeStyle = "rgba(255, 221, 177, 0.16)";
    ctx.lineWidth = 2;
    for (let index = 0; index < 16; index += 1) {
      const y = STAGE.floorY + index * 14;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(STAGE.width, y);
      ctx.stroke();
    }

    for (let index = 0; index <= 12; index += 1) {
      const x = 98 + index * 90;
      ctx.beginPath();
      ctx.moveTo(x, STAGE.floorY - 18);
      ctx.lineTo(STAGE.width / 2, STAGE.height);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(255, 242, 210, 0.94)";
    ctx.fillRect(0, STAGE.floorY - 4, STAGE.width, 4);
  }

  drawTitleScreen(ctx) {
    const titleCard = { x: 252, y: 140, width: 776, height: 250 };
    const pulse = 0.5 + (Math.sin(this.uiFrame / 16) + 1) * 0.22;

    ctx.save();
    ctx.fillStyle = "rgba(12, 6, 20, 0.62)";
    ctx.fillRect(0, 0, STAGE.width, STAGE.height);

    const beam = ctx.createRadialGradient(STAGE.width / 2, 220, 40, STAGE.width / 2, 220, 420);
    beam.addColorStop(0, "rgba(255, 236, 174, 0.24)");
    beam.addColorStop(0.5, "rgba(255, 146, 86, 0.14)");
    beam.addColorStop(1, "rgba(255, 146, 86, 0)");
    ctx.fillStyle = beam;
    ctx.fillRect(0, 0, STAGE.width, STAGE.height);

    const panelGradient = ctx.createLinearGradient(0, titleCard.y, 0, titleCard.y + titleCard.height);
    panelGradient.addColorStop(0, "rgba(34, 14, 28, 0.92)");
    panelGradient.addColorStop(1, "rgba(80, 24, 17, 0.86)");
    ctx.fillStyle = panelGradient;
    drawRoundedRect(ctx, titleCard.x, titleCard.y, titleCard.width, titleCard.height, 34);
    ctx.fill();

    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(255, 231, 189, 0.26)";
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
    drawRoundedRect(ctx, titleCard.x + 14, titleCard.y + 14, titleCard.width - 28, titleCard.height - 28, 28);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = "#fff0c2";
    ctx.font = '900 36px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';

    ctx.lineWidth = 8;
    ctx.strokeStyle = "rgba(89, 18, 11, 0.8)";
    ctx.font = '900 124px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.strokeText("スリトリー", STAGE.width / 2, 286);
    ctx.fillStyle = "#ffe7a8";
    ctx.fillText("スリトリー", STAGE.width / 2, 286);

    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(33, 10, 24, 0.84)";
    ctx.font = '900 92px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.strokeText("ファイター", STAGE.width / 2, 372);
    ctx.fillStyle = "#ff9256";
    ctx.fillText("ファイター", STAGE.width / 2, 372);

    ctx.globalAlpha = pulse;
    ctx.fillStyle = "#fff4d6";
    ctx.font = '900 40px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText("Enter / Z でスタート", STAGE.width / 2, 520);
    ctx.font = '700 24px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillStyle = "rgba(255, 241, 220, 0.88)";
    ctx.fillText("X でいつでもタイトルへ戻れます", STAGE.width / 2, 562);
    ctx.restore();
  }

  drawSelectionScreen(ctx) {
    ctx.save();
    ctx.fillStyle = "rgba(17, 10, 16, 0.4)";
    ctx.fillRect(0, 0, STAGE.width, STAGE.height);

    ctx.fillStyle = "#fff0c2";
    ctx.textAlign = "center";
    ctx.font = '800 76px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText("キャラクター選択", STAGE.width / 2, 96);

    ctx.font = '700 28px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillStyle = "rgba(255, 244, 218, 0.86)";
    ctx.fillText(this.announcementSub, STAGE.width / 2, 136);

    const leftPanel = { x: 34, y: 164, width: 292, height: 470 };
    const centerPanel = { x: 364, y: 186, width: 552, height: 398 };
    const rightPanel = { x: 954, y: 164, width: 292, height: 470 };

    const playerIndex =
      this.selection.playerIndex !== null ? this.selection.playerIndex : this.selection.cursor;
    const shouldShowEnemyPortrait =
      this.selection.phase === "enemy" || this.selection.enemyIndex !== null;
    const enemyCandidateIndex = this.getSelectionEnemyPreviewIndex();
    const enemyIndex =
      this.selection.enemyIndex !== null
        ? this.selection.enemyIndex
        : enemyCandidateIndex;
    const previewCpuLevel = this.getSelectionCpuLevel();
    const cpuPanelState =
      this.selection.phase === "difficulty"
        ? `強さ: ${previewCpuLevel.name}`
        : this.selection.phase === "enemy"
          ? "選択中"
          : this.selection.enemyIndex !== null
            ? `強さ: ${getCpuLevel(this.selection.cpuLevelIndex).name}`
            : "未選択";

    this.drawSelectionPortraitPanel(
      ctx,
      leftPanel,
      this.characters[playerIndex],
      "1P",
      this.selection.phase === "player" ? "選択中" : "決定",
      this.selection.phase === "player"
    );
    this.drawSelectionPortraitPanel(
      ctx,
      rightPanel,
      shouldShowEnemyPortrait ? this.characters[enemyIndex] : null,
      "CPU",
      cpuPanelState,
      this.selection.phase === "enemy" || this.selection.phase === "difficulty"
    );

    ctx.save();
    ctx.fillStyle = "rgba(33, 18, 24, 0.82)";
    drawRoundedRect(ctx, centerPanel.x, centerPanel.y, centerPanel.width, centerPanel.height, 34);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(255, 232, 194, 0.15)";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.font = '800 78px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillStyle = "rgba(255, 202, 116, 0.16)";
    ctx.fillText("VS", STAGE.width / 2, centerPanel.y + 204);

    if (this.selection.phase === "difficulty") {
      this.drawDifficultySelectionPanel(ctx, centerPanel);
    } else {
      const thumbWidth = 150;
      const thumbHeight = 144;
      const thumbGapX = 26;
      const thumbGapY = 20;
      const columns = Math.min(SELECTION_GRID_COLUMNS, this.characters.length);
      const gridWidth = thumbWidth * columns + thumbGapX * (columns - 1);
      const startX = centerPanel.x + (centerPanel.width - gridWidth) / 2;
      const startY = centerPanel.y + 42;

      this.characters.forEach((character, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = startX + column * (thumbWidth + thumbGapX);
        const y = startY + row * (thumbHeight + thumbGapY);
        const isCursor = index === this.selection.cursor;
        const isPlayer = index === this.selection.playerIndex;
        const isEnemy = index === this.selection.enemyIndex;
        const disabled = this.selection.phase === "enemy" && isPlayer;

        ctx.save();
        ctx.fillStyle = disabled ? "rgba(58, 33, 34, 0.84)" : "rgba(64, 31, 32, 0.88)";
        drawRoundedRect(ctx, x, y, thumbWidth, thumbHeight, 20);
        ctx.fill();

        ctx.lineWidth = isCursor ? 4 : 2;
        ctx.strokeStyle = isCursor ? character.accent : "rgba(255, 237, 207, 0.18)";
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        drawRoundedRect(ctx, x + 8, y + 8, thumbWidth - 16, thumbHeight - 16, 16);
        ctx.fill();

        this.drawSelectionFaceBadge(ctx, character, x + thumbWidth / 2, y + 48, 40, {
          active: isCursor,
          disabled,
        });

        ctx.fillStyle = "rgba(32, 15, 18, 0.82)";
        drawRoundedRect(ctx, x + 18, y + 88, thumbWidth - 36, 36, 12);
        ctx.fill();

        ctx.textAlign = "center";
        ctx.fillStyle = "#fff0c2";
        ctx.font = '700 23px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
        ctx.fillText(character.name, x + thumbWidth / 2, y + 114);

        ctx.font = '700 16px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
        ctx.fillStyle = "rgba(255, 238, 214, 0.72)";
        if (isPlayer) ctx.fillText("1P", x + thumbWidth / 2, y + 138);
        if (isEnemy) ctx.fillText("CPU", x + thumbWidth / 2, y + 138);
        if (isCursor && !isPlayer && !isEnemy) ctx.fillText("選択中", x + thumbWidth / 2, y + 138);
        if (disabled) ctx.fillText("選択不可", x + thumbWidth / 2, y + 138);

        ctx.restore();
      });
    }

    ctx.font = '700 22px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillStyle = "rgba(255, 241, 220, 0.84)";
    ctx.fillText(
      this.selection.phase === "difficulty"
        ? "左右で強さ選択 / EnterかZで試合開始 / Xで相手選択へ戻る"
        : "上下左右で移動 / EnterかZで決定 / Xで戻る",
      STAGE.width / 2,
      648
    );
    ctx.restore();
  }

  getSelectionEnemyPreviewIndex() {
    const selectedPlayer = this.selection.playerIndex ?? this.selection.cursor;
    if (this.selection.phase === "enemy" && this.selection.cursor !== selectedPlayer) {
      return this.selection.cursor;
    }

    if (this.selection.enemyIndex !== null) return this.selection.enemyIndex;

    return this.characters.findIndex((_, index) => index !== selectedPlayer);
  }

  getSelectionCpuLevel() {
    const index =
      this.selection.phase === "difficulty"
        ? this.selection.difficultyCursor
        : this.selection.cpuLevelIndex;
    return getCpuLevel(index);
  }

  drawDifficultySelectionPanel(ctx, panel) {
    const cardWidth = 156;
    const cardHeight = 194;
    const gap = 18;
    const totalWidth = cardWidth * CPU_LEVELS.length + gap * (CPU_LEVELS.length - 1);
    const startX = panel.x + (panel.width - totalWidth) / 2;
    const cardY = panel.y + 84;

    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255, 239, 214, 0.76)";
    ctx.font = '700 24px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText("CPUの強さ", STAGE.width / 2, panel.y + 52);

    CPU_LEVELS.forEach((level, index) => {
      const x = startX + index * (cardWidth + gap);
      const isCursor = index === this.selection.difficultyCursor;
      const isSelected = index === this.selection.cpuLevelIndex;

      ctx.save();
      ctx.fillStyle = isCursor ? "rgba(82, 33, 31, 0.94)" : "rgba(54, 25, 32, 0.9)";
      drawRoundedRect(ctx, x, cardY, cardWidth, cardHeight, 24);
      ctx.fill();

      ctx.lineWidth = isCursor ? 4 : 2;
      ctx.strokeStyle = isCursor ? level.accent : "rgba(255, 237, 207, 0.18)";
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      drawRoundedRect(ctx, x + 10, cardY + 10, cardWidth - 20, cardHeight - 20, 18);
      ctx.fill();

      ctx.fillStyle = level.accent;
      ctx.font = '900 38px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
      ctx.fillText(level.name, x + cardWidth / 2, cardY + 64);

      ctx.fillStyle = "#fff0c2";
      ctx.font = '700 18px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
      if (level.id === "easy") {
        ctx.fillText("守りは控えめ", x + cardWidth / 2, cardY + 104);
      } else if (level.id === "normal") {
        ctx.fillText("標準バランス", x + cardWidth / 2, cardY + 104);
      } else {
        ctx.fillText("反応は最速", x + cardWidth / 2, cardY + 104);
        ctx.fillText("跳び込み多め", x + cardWidth / 2, cardY + 128);
      }

      ctx.fillStyle = isSelected ? "rgba(255, 243, 220, 0.9)" : "rgba(255, 238, 214, 0.58)";
      ctx.font = '700 18px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
      ctx.fillText(isCursor ? "選択中" : isSelected ? "既定" : "", x + cardWidth / 2, cardY + 164);
      ctx.restore();
    });

    const previewCpuLevel = this.getSelectionCpuLevel();
    ctx.fillStyle = previewCpuLevel.accent;
    ctx.font = '800 22px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText(previewCpuLevel.summary, STAGE.width / 2, panel.y + 328);
    ctx.restore();
  }

  drawSelectionPortraitPanel(ctx, panel, character, label, stateText, active) {
    ctx.save();
    ctx.fillStyle = "rgba(38, 18, 23, 0.88)";
    drawRoundedRect(ctx, panel.x, panel.y, panel.width, panel.height, 30);
    ctx.fill();

    ctx.lineWidth = active ? 5 : 2;
    ctx.strokeStyle = active && character ? character.accent : "rgba(255, 232, 194, 0.16)";
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    drawRoundedRect(ctx, panel.x + 12, panel.y + 12, panel.width - 24, panel.height - 24, 24);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.fillStyle = active && character ? character.accent : "rgba(255, 234, 202, 0.82)";
    ctx.font = '800 32px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText(label, panel.x + panel.width / 2, panel.y + 42);

    if (character) {
      this.drawContainedImage(
        ctx,
        character.portrait,
        panel.x + 16,
        panel.y + 58,
        panel.width - 32,
        314,
        true,
        character.selectionPortraitScale ?? 1,
        true,
        character.selectionPortraitFocusY ?? 1
      );

      ctx.fillStyle = "#fff0c2";
      ctx.font = '700 34px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
      ctx.fillText(character.name, panel.x + panel.width / 2, panel.y + 406);
    } else {
      ctx.fillStyle = "rgba(255, 241, 220, 0.08)";
      drawRoundedRect(ctx, panel.x + 28, panel.y + 92, panel.width - 56, 250, 24);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 233, 203, 0.12)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(panel.x + 52, panel.y + 116);
      ctx.lineTo(panel.x + panel.width - 52, panel.y + 318);
      ctx.moveTo(panel.x + panel.width - 52, panel.y + 116);
      ctx.lineTo(panel.x + 52, panel.y + 318);
      ctx.stroke();
    }

    ctx.font = '700 20px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillStyle = "rgba(255, 239, 214, 0.76)";
    ctx.fillText(stateText, panel.x + panel.width / 2, panel.y + 438);
    ctx.restore();
  }

  drawSelectionFaceBadge(ctx, character, centerX, centerY, radius, options = {}) {
    const { active = false, disabled = false } = options;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
    ctx.fillStyle = disabled ? "rgba(72, 43, 44, 0.76)" : "rgba(255, 241, 215, 0.1)";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(33, 17, 21, 0.88)";
    ctx.fill();

    ctx.lineWidth = active ? 4 : 2;
    ctx.strokeStyle = active ? character.accent : "rgba(255, 232, 194, 0.28)";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    const image = character.portrait;
    const size = radius * 2;
    const scale = Math.max(size / image.width, size / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const drawX = centerX - drawWidth / 2;
    const overflowY = Math.max(0, drawHeight - size);
    const drawY = centerY - radius - overflowY * 0.1;
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  }

  drawBattlePortraits(ctx) {
    const [player, enemy] = this.fighters;
    ctx.save();
    ctx.globalAlpha = 0.18;
    this.drawContainedImage(ctx, player.character.portrait, 34, 214, 220, 340, true);
    this.drawContainedImage(ctx, enemy.character.portrait, STAGE.width - 254, 214, 220, 340, true);
    ctx.restore();
  }

  drawSpriteFrame(ctx, frame, x, footY, scale, facing = 1, alpha = 1) {
    const width = frame.width * scale;
    const height = frame.height * scale;
    const drawY = footY - height;

    ctx.save();
    ctx.globalAlpha = alpha;
    if (facing === -1) {
      ctx.translate(x, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(frame, -width / 2, drawY, width, height);
    } else {
      ctx.drawImage(frame, x - width / 2, drawY, width, height);
    }
    ctx.restore();
  }

  drawFighter(ctx, fighter) {
    const drawInfo = this.getCurrentSpriteDrawInfo(fighter);
    if (!drawInfo?.frame) return;
    const { frame, scaleMultiplier = 1 } = drawInfo;

    ctx.save();
    ctx.globalAlpha = fighter.health <= 0 ? 0.45 : 1;
    ctx.fillStyle = "rgba(28, 14, 12, 0.28)";
    ctx.beginPath();
    ctx.ellipse(fighter.x, STAGE.groundY + 12, 48, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    const scale = 1.34 * scaleMultiplier;
    const width = frame.width * scale;
    const height = frame.height * scale;
    const drawY = fighter.y - height;

    if (fighter.facing === -1) {
      ctx.translate(fighter.x, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(frame, -width / 2, drawY, width, height);
    } else {
      ctx.drawImage(frame, fighter.x - width / 2, drawY, width, height);
    }
    ctx.restore();
  }

  drawProjectiles(ctx) {
    this.projectiles.forEach((projectile) => {
      const pulse = 0.82 + Math.sin((this.uiFrame + projectile.life) * 0.24) * 0.08;
      const radius = projectile.radius * pulse;
      const glow = ctx.createRadialGradient(
        projectile.x - projectile.facing * 8,
        projectile.y - 4,
        6,
        projectile.x,
        projectile.y,
        radius * 1.9
      );
      glow.addColorStop(0, "#fffef8");
      glow.addColorStop(0.28, "#ffe7a2");
      glow.addColorStop(0.58, projectile.color);
      glow.addColorStop(1, "rgba(255, 140, 80, 0)");

      ctx.save();
      ctx.globalAlpha = 0.96;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, radius * 1.75, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#fff6dd";
      ctx.beginPath();
      ctx.arc(projectile.x - projectile.facing * 6, projectile.y - 4, radius * 0.42, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(255, 247, 220, 0.82)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(projectile.x, projectile.y, radius * 0.9, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  }

  getCurrentSpriteDrawInfo(fighter) {
    const rows = SPRITE_GRID.rowIndex;
    const specialScale = fighter.character.specialFrameScale ?? 1;
    const crouchAttackScale = specialScale * (fighter.character.crouchAttackScaleMultiplier ?? 1);
    const guardScale = specialScale * (fighter.character.guardScaleMultiplier ?? 1);

    if (fighter.attack) {
      const move = ATTACK_DEFS[fighter.attack.kind];
      const progress = clamp(
        fighter.attack.frame / Math.max(1, totalAttackFrames(move) - 1),
        0,
        0.999
      );
      const frameIndex = clamp(Math.floor(progress * 5), 0, 4);
      if (fighter.attack.kind === "crouchPunch") {
        return {
          frame: fighter.character.specialFrames[SPECIAL_ROW_INDEX.crouchPunch][frameIndex],
          scaleMultiplier: crouchAttackScale,
        };
      }
      if (fighter.attack.kind === "crouchKick") {
        return {
          frame: fighter.character.specialFrames[SPECIAL_ROW_INDEX.crouchKick][frameIndex],
          scaleMultiplier: crouchAttackScale,
        };
      }
      const row = fighter.attack.kind === "kick" ? rows.kick : rows.punch;
      return { frame: fighter.character.spriteFrames[row][frameIndex], scaleMultiplier: 1 };
    }

    if (fighter.guardFrames > 0) {
      const row =
        fighter.guardType === "crouch" ? SPECIAL_ROW_INDEX.crouchGuard : SPECIAL_ROW_INDEX.standGuard;
      return {
        frame: fighter.character.specialFrames[row][frameIndexFromCycle(fighter.animationCounter, 10)],
        scaleMultiplier: guardScale,
      };
    }

    if (!isGrounded(fighter)) {
      const jumpFrame = fighter.vy < -5 ? 1 : fighter.vy < 1 ? 2 : fighter.vy < 9 ? 3 : 4;
      return { frame: fighter.character.spriteFrames[rows.jump][jumpFrame], scaleMultiplier: 1 };
    }

    if (fighter.hitstunFrames > 0) {
      return { frame: fighter.character.spriteFrames[rows.idle][2], scaleMultiplier: 1 };
    }

    if (fighter.crouching) {
      return {
        frame: fighter.character.specialFrames[SPECIAL_ROW_INDEX.crouch][frameIndexFromCycle(fighter.animationCounter, 12)],
        scaleMultiplier: specialScale,
      };
    }

    if (fighter.state === "walk") {
      return { frame: fighter.character.spriteFrames[rows.walk][frameIndexFromCycle(fighter.animationCounter, 6)], scaleMultiplier: 1 };
    }

    return {
      frame: fighter.character.spriteFrames[rows.idle][frameIndexFromCycle(fighter.animationCounter, 12)],
      scaleMultiplier: 1,
    };
  }

  drawContainedImage(ctx, image, x, y, width, height, bottomAlign = false, scaleMultiplier = 1, clip = false, verticalFocus = null) {
    const scale = Math.min(width / image.width, height / image.height) * scaleMultiplier;
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const drawX = x + (width - drawWidth) / 2;
    const resolvedFocus = verticalFocus ?? (bottomAlign ? 1 : 0.5);
    const drawY = y + (height - drawHeight) * resolvedFocus;
    if (clip) {
      ctx.save();
      drawRoundedRect(ctx, x, y, width, height, 14);
      ctx.clip();
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();
      return;
    }
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  }

  drawCoverImage(ctx, image, x, y, width, height, verticalFocus = 0.5, soften = false) {
    const scale = Math.max(width / image.width, height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;
    const drawX = x + (width - drawWidth) / 2;
    const overflowY = Math.max(0, drawHeight - height);
    const drawY = y - overflowY * clamp(verticalFocus, 0, 1);

    ctx.save();
    drawRoundedRect(ctx, x, y, width, height, 14);
    ctx.clip();
    if (soften) ctx.globalAlpha = 0.98;
    ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    ctx.restore();
  }

  drawEffects(ctx) {
    this.effects.forEach((effect) => {
      const t = effect.life / effect.maxLife;
      ctx.save();
      ctx.globalAlpha = t;
      ctx.translate(effect.x, effect.y);
      ctx.strokeStyle = effect.color;
      ctx.lineWidth = 5;
      for (let index = 0; index < 6; index += 1) {
        ctx.rotate(Math.PI / 3);
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(22 + (1 - t) * 12, 0);
        ctx.stroke();
      }
      ctx.restore();
    });
  }

  drawHud(ctx) {
    const [player, enemy] = this.fighters;
    ctx.save();
    ctx.fillStyle = "rgba(20, 11, 15, 0.72)";
    drawRoundedRect(ctx, 34, 22, STAGE.width - 68, 94, 28);
    ctx.fill();

    this.drawHealthBar(ctx, 86, 52, 430, 22, player.health, player.character.accent, false);
    this.drawHealthBar(ctx, STAGE.width - 516, 52, 430, 22, enemy.health, enemy.character.accent, true);

    ctx.fillStyle = "#f8e9ca";
    ctx.font = '700 28px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.textAlign = "left";
    ctx.fillText(player.character.name, 86, 44);
    ctx.textAlign = "right";
    ctx.fillText(enemy.character.name, STAGE.width - 86, 44);

    ctx.textAlign = "center";
    ctx.font = '800 44px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillStyle = "#ffe48e";
    ctx.fillText(String(Math.ceil(this.roundTimer)).padStart(2, "0"), STAGE.width / 2, 70);

    ctx.font = '700 18px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillStyle = "rgba(255, 238, 205, 0.72)";
    ctx.fillText("決着", STAGE.width / 2, 100);

    this.drawRoundPips(ctx, 86, 88, player.roundsWon, player.character.accent);
    this.drawRoundPips(ctx, STAGE.width - 86, 88, enemy.roundsWon, enemy.character.accent, true);
    ctx.restore();
  }

  drawHealthBar(ctx, x, y, width, height, health, color, reverse) {
    ctx.save();
    ctx.fillStyle = "rgba(255, 248, 236, 0.14)";
    drawRoundedRect(ctx, x, y, width, height, 12);
    ctx.fill();

    const healthWidth = (width - 8) * (health / 100);
    const gradient = ctx.createLinearGradient(x, y, x + width, y);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "#fff1b3");

    ctx.fillStyle = gradient;
    const fillX = reverse ? x + width - 4 - healthWidth : x + 4;
    drawRoundedRect(ctx, fillX, y + 4, healthWidth, height - 8, 8);
    ctx.fill();
    ctx.restore();
  }

  drawRoundPips(ctx, x, y, count, color, reverse = false) {
    for (let index = 0; index < 2; index += 1) {
      const dx = reverse ? x - index * 26 : x + index * 26;
      ctx.fillStyle = index < count ? color : "rgba(255, 245, 224, 0.24)";
      ctx.beginPath();
      ctx.arc(dx, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawCenterOverlay(ctx, headline, subline) {
    ctx.save();
    ctx.fillStyle = "rgba(9, 5, 8, 0.3)";
    ctx.fillRect(0, 0, STAGE.width, STAGE.height);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff0c8";
    ctx.font = '800 76px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillText(headline, STAGE.width / 2, STAGE.height / 2 - 20);
    ctx.font = '700 28px "Avenir Next Condensed", "Hiragino Kaku Gothic ProN", sans-serif';
    ctx.fillStyle = "rgba(255, 241, 212, 0.84)";
    ctx.fillText(subline, STAGE.width / 2, STAGE.height / 2 + 30);
    ctx.restore();
  }

  renderGameToText() {
    if (this.mode === "title") {
      return JSON.stringify({
        mode: "title",
        title: this.announcement,
        prompt: this.announcementSub,
        roster: this.characters.map((character) => character.name),
        audio: this.sound.serialize(),
      });
    }

    if (this.mode === "select") {
      return JSON.stringify({
        mode: "select",
        phase: this.selection.phase,
        cursor:
          this.selection.phase === "difficulty"
            ? getCpuLevel(this.selection.difficultyCursor).name
            : this.characters[this.selection.cursor]?.name ?? null,
        player: this.selection.playerIndex !== null ? this.characters[this.selection.playerIndex]?.name : null,
        enemy: this.selection.enemyIndex !== null ? this.characters[this.selection.enemyIndex]?.name : null,
        cpuLevel: getCpuLevel(this.selection.cpuLevelIndex).name,
        audio: this.sound.serialize(),
      });
    }

    if (!this.fighters.length) {
      return JSON.stringify({
        mode: this.mode,
        announcement: this.announcement,
        audio: this.sound.serialize(),
      });
    }

    return JSON.stringify({
      mode: this.mode,
      round: this.roundNumber,
      timer: roundValue(this.roundTimer),
      announcement: this.announcement || null,
      audio: this.sound.serialize(),
      note: "座標原点は左上で、x は右方向、y は下方向。fighter の x と y は足元の位置です。",
      player: this.serializeFighter(this.fighters[0]),
      enemy: this.serializeFighter(this.fighters[1]),
      projectiles: this.projectiles.map((projectile) => ({
        owner: projectile.ownerId,
        x: roundValue(projectile.x),
        y: roundValue(projectile.y),
        vx: roundValue(projectile.vx),
      })),
    });
  }

  serializeFighter(fighter) {
    return {
      name: fighter.character.name,
      x: roundValue(fighter.x),
      y: roundValue(fighter.y),
      hp: fighter.health,
      facing: fighter.facing,
      state: fighter.state,
      crouching: fighter.crouching,
      attack: fighter.attack?.kind ?? null,
      hitstunFrames: fighter.hitstunFrames,
      guardFrames: fighter.guardFrames,
      guardType: fighter.guardType,
      fireballCooldownFrames: fighter.fireballCooldownFrames,
      roundsWon: fighter.roundsWon,
      cpuLevel: fighter.cpuData.level?.name ?? null,
    };
  }
}
