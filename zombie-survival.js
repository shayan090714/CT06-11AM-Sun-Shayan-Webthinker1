const GAME_WIDTH = 960;
const GAME_HEIGHT = 600;
const GROUND_Y = 490;
const LEVEL_LENGTH = 3600;
const LAST_LEVEL = 4;
const ZOMBIE_WIDTH = 34;
const ZOMBIE_HEIGHT = 40;
const ZOMBIE_JUMP_SPEED = 14;

const weapons = [
  { name: "PISTOL", price: 0, cooldown: 22, damage: 1, spread: 0, bullets: 1 },
  { name: "SHOTGUN", price: 10, cooldown: 42, damage: 1, spread: 0.22, bullets: 3 },
  { name: "MACHINE GUN", price: 20, cooldown: 7, damage: 1, spread: 0.025, bullets: 1 }
];

let screen = "title";
let player;
let bullets = [];
let zombies = [];
let coins = [];
let platforms = [];
let groundSections = [];
let obstacles = [];
let stars = [];
let cameraX = 0;
let level = 1;
let lives = 3;
let coinCount = 0;
let ownedWeapons = [true, false, false];
let equippedWeapon = 0;
let shootCooldown = 0;
let stateTimer = 0;

function setup() {
  const canvas = createCanvas(GAME_WIDTH, GAME_HEIGHT);
  canvas.parent("game");
  pixelDensity(1);
  textFont("monospace");
  for (let i = 0; i < 100; i++) {
    stars.push({ x: random(GAME_WIDTH), y: random(20, 350), size: random(1, 3), phase: random(TWO_PI) });
  }
  resetLevel();
}

function draw() {
  background("#0b1220");
  drawNightSky();

  if (screen === "title") {
    drawTitleScreen();
  } else if (screen === "playing") {
    updateGame();
    drawWorld();
    drawHud();
  } else if (screen === "win") {
    drawWorld();
    drawHud();
    drawMessage("YOU WIN!", "Bunker secured.", "#83e6a1");
    stateTimer--;
    if (stateTimer <= 0) {
      screen = level >= LAST_LEVEL ? "finalWin" : "shop";
    }
  } else if (screen === "shop") {
    drawShop();
  } else if (screen === "lose") {
    drawMessage("YOU LOSE!", "The night has claimed you.", "#ff555d");
    stateTimer--;
    if (stateTimer <= 0) screen = "black";
  } else if (screen === "black") {
    background(0);
  } else if (screen === "finalWin") {
    drawMessage("YOU SURVIVED!", "The bunker is safe. For now.", "#83e6a1");
    drawButton(width / 2 - 105, 390, 210, 54, "PLAY AGAIN", "#257a55");
  }
}

function resetLevel() {
  cameraX = 0;
  bullets = [];
  coins = [];
  shootCooldown = 0;
  player = {
    x: 90,
    y: GROUND_Y - 44,
    w: 30,
    h: 44,
    vx: 0,
    vy: 0,
    facing: 1,
    grounded: false,
    surface: null,
    invulnerable: 0
  };

  generateLevelLayout();
  spawnZombies();
}

// Keep every ground gap within a jumpable distance, then add optional parkour.
function generateLevelLayout() {
  groundSections = [];
  platforms = [];
  obstacles = [];
  const bunkerStart = LEVEL_LENGTH - 260;
  const maxGap = 70 + level * 6;
  let x = 0;

  while (x < bunkerStart - 360) {
    const sectionLength = min(random(360, 560), bunkerStart - 360 - x);
    groundSections.push({ x, w: sectionLength, y: GROUND_Y });
    x += sectionLength + random(42, maxGap);
  }
  groundSections.push({ x, w: LEVEL_LENGTH - x, y: GROUND_Y });

  // Place platforms over solid ground so each one has a reachable starting point.
  const platformCount = 6 + level * 2;
  for (let i = 0; i < platformCount; i++) {
    const section = random(groundSections);
    if (section.w < 240) continue;

    const widths = [random(90, 125), random(130, 170), random(175, 215)];
    const platformWidth = widths[floor(random(widths.length))];
    const platformX = random(section.x + 25, section.x + section.w - 65);
    const heightAboveGround = random(45, min(105 + level * 3, 118));
    const platform = {
      x: constrain(platformX, section.x + 10, section.x + section.w - 50),
      y: GROUND_Y - heightAboveGround,
      w: platformWidth,
      h: 18
    };

    const tooClose = platforms.some((other) =>
      abs(other.x - platform.x) < min(other.w, platform.w) * 0.65 &&
      abs(other.y - platform.y) < 30
    );
    if (!tooClose) platforms.push(platform);
  }

  // Obstacles stay small enough to jump over and leave room around each gap.
  const obstacleCount = 5 + level * 2;
  const obstacleTypes = ["crate", "spikes", "barrier"];
  for (let i = 0; i < obstacleCount; i++) {
    for (let attempt = 0; attempt < 18; attempt++) {
      const section = random(groundSections);
      if (section.w < 150) continue;
      const type = obstacleTypes[floor(random(obstacleTypes.length))];
      const obstacle = {
        x: random(section.x + 38, section.x + section.w - 78),
        y: GROUND_Y - 30,
        w: type === "barrier" ? 42 : 30,
        h: 30,
        type
      };
      if (obstacle.x < 300 || obstacle.x > bunkerStart - 230) continue;
      const overlapsObstacle = obstacles.some((other) =>
        obstacle.x < other.x + other.w + 90 && obstacle.x + obstacle.w + 90 > other.x
      );
      const underPlatform = platforms.some((platform) =>
        obstacle.x < platform.x + platform.w && obstacle.x + obstacle.w > platform.x &&
        platform.y + platform.h > obstacle.y - ZOMBIE_HEIGHT
      );
      if (!overlapsObstacle && !underPlatform) {
        obstacles.push(obstacle);
        break;
      }
    }
  }
}

// Put each zombie fully on a clear surface, away from the player and other zombies.
function spawnZombies() {
  zombies = [];
  const count = 5 + level * 2 + floor(random(-1, 3));
  const surfaces = getSurfaces();
  for (let i = 0; i < count; i++) {
    for (let attempt = 0; attempt < 80; attempt++) {
      const surface = random(surfaces);
      if (surface.w < ZOMBIE_WIDTH + 12) continue;
      const x = random(surface.x + 6, surface.x + surface.w - ZOMBIE_WIDTH - 6);
      const zombie = { x, y: surface.y - ZOMBIE_HEIGHT, w: ZOMBIE_WIDTH, h: ZOMBIE_HEIGHT };
      if (abs(x - player.x) < 280 || collidesWithObstacle(zombie, x)) continue;
      if (zombies.some((other) => abs(other.x - x) < ZOMBIE_WIDTH + 18)) continue;
      if (platforms.some((platform) =>
        platform.y < surface.y && platform.y + platform.h > zombie.y &&
        x < platform.x + platform.w && x + zombie.w > platform.x
      )) continue;

      zombies.push({
        ...zombie,
        vx: 0,
        vy: 0,
        health: 1 + Math.floor((level - 1) / 2),
        maxHealth: 1 + Math.floor((level - 1) / 2),
        speed: 2.7 + level * 0.1 + random(0, 0.2),
        grounded: true,
        surface,
        alive: true
      });
      break;
    }
  }
}

function updateGame() {
  const moveLeft = keyIsDown(65);
  const moveRight = keyIsDown(68);
  player.vx = (Number(moveRight) - Number(moveLeft)) * 3.8;
  if (player.vx !== 0) player.facing = Math.sign(player.vx);
  moveBodyX(player, player.vx);

  player.vy += 0.72;
  const previousY = player.y;
  player.y += player.vy;
  player.grounded = false;
  landOnSurfaces(player, previousY);

  if (player.invulnerable > 0) player.invulnerable--;
  if (shootCooldown > 0) shootCooldown--;
  if (keyIsDown(83)) shoot();

  for (const zombie of zombies) {
    if (!zombie.alive) continue;
    guideZombie(zombie);
    moveBodyX(zombie, zombie.vx);
    zombie.vy += 0.7;
    const oldY = zombie.y;
    zombie.y += zombie.vy;
    zombie.grounded = false;
    landOnSurfaces(zombie, oldY);

    if (overlaps(player, zombie) && player.invulnerable === 0) hurtPlayer();
  }

  for (const bullet of bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    for (const zombie of zombies) {
      if (zombie.alive && pointInRect(bullet.x, bullet.y, zombie)) {
        zombie.health -= bullet.damage;
        bullet.active = false;
        if (zombie.health <= 0) defeatZombie(zombie);
        break;
      }
    }
    if (bullet.x < 0 || bullet.x > LEVEL_LENGTH || bullet.y < 0 || bullet.y > GAME_HEIGHT || bullet.active === false) {
      bullet.active = false;
    }
  }
  bullets = bullets.filter((bullet) => bullet.active !== false);

  for (const coin of coins) {
    coin.y += coin.vy;
    coin.vy += 0.3;
    if (coin.y + coin.r >= GROUND_Y) {
      coin.y = GROUND_Y - coin.r;
      coin.vy = 0;
    }
    if (dist(player.x + player.w / 2, player.y + player.h / 2, coin.x, coin.y) < 34) {
      coin.collected = true;
      coinCount += coin.value;
    }
  }
  coins = coins.filter((coin) => !coin.collected);

  if (player.y > GAME_HEIGHT + 55 && player.invulnerable === 0) {
    lives--;
    if (lives <= 0) {
      screen = "lose";
      stateTimer = 105;
    } else {
      player.x = max(35, player.x - 180);
      player.y = GROUND_Y - player.h;
      player.vy = 0;
      player.invulnerable = 100;
    }
  }
  cameraX = constrain(player.x - width * 0.34, 0, LEVEL_LENGTH - width);
  if (player.x >= LEVEL_LENGTH - 155) {
    screen = "win";
    stateTimer = 110;
  }
}

function landOnSurfaces(body, previousY) {
  body.surface = null;
  if (body.vy < 0) return;
  const oldBottom = previousY + body.h;
  const newBottom = body.y + body.h;
  let landingSurface = null;
  for (const surface of getSurfaces()) {
    const overlapsX = body.x + body.w > surface.x && body.x < surface.x + surface.w;
    if (overlapsX && oldBottom <= surface.y && newBottom >= surface.y &&
        (!landingSurface || surface.y < landingSurface.y)) {
      landingSurface = surface;
    }
  }
  if (landingSurface) {
    body.y = landingSurface.y - body.h;
    body.vy = 0;
    body.grounded = true;
    body.surface = landingSurface;
  }
}

function getSurfaces() {
  return [...groundSections, ...platforms];
}

// Follow only surfaces connected by a jump the zombie can make.
function guideZombie(zombie) {
  if (!zombie.grounded) return;
  zombie.vx = 0;
  if (!zombie.surface || !player.surface) return;

  const nextSurface = getNextSurface(zombie.surface, player.surface);
  if (!nextSurface) return;
  let direction;
  let shouldJump = false;
  if (nextSurface === zombie.surface) {
    direction = Math.sign(player.x - zombie.x);
  } else {
    const center = zombie.x + zombie.w / 2;
    if (nextSurface.x + nextSurface.w <= center) {
      direction = -1;
      shouldJump = zombie.x <= zombie.surface.x + 8;
    } else if (nextSurface.x >= center) {
      direction = 1;
      shouldJump = zombie.x + zombie.w >= zombie.surface.x + zombie.surface.w - 8;
    } else {
      direction = Math.sign((nextSurface.x + nextSurface.w / 2) - center);
      shouldJump = true;
    }
  }

  if (!direction && nextSurface !== zombie.surface) direction = 1;
  if (!direction) return;
  const nextX = zombie.x + direction * zombie.speed;
  const minX = zombie.surface.x;
  const maxX = zombie.surface.x + zombie.surface.w - zombie.w;
  const atEdge = direction < 0 ? zombie.x <= minX + 2 : zombie.x >= maxX - 2;
  const needsJump = nextSurface !== zombie.surface && (shouldJump || atEdge);
  const obstacleAhead = collidesWithObstacle(zombie, nextX);
  if (needsJump || obstacleAhead) {
    zombie.vy = -ZOMBIE_JUMP_SPEED;
    zombie.grounded = false;
    zombie.surface = null;
  }
  zombie.vx = direction * zombie.speed;
  if (zombie.grounded) zombie.x = constrain(nextX, minX, maxX);
}

function getNextSurface(start, target) {
  if (start === target) return start;
  const surfaces = getSurfaces();
  const queue = [{ surface: start, first: null }];
  const visited = new Set([start]);
  while (queue.length > 0) {
    const current = queue.shift();
    for (const candidate of surfaces) {
      if (visited.has(candidate) || !canJumpBetween(current.surface, candidate)) continue;
      const first = current.first || candidate;
      if (candidate === target) return first;
      visited.add(candidate);
      queue.push({ surface: candidate, first });
    }
  }
  return null;
}

function canJumpBetween(from, to) {
  const gap = max(0, from.x - (to.x + to.w), to.x - (from.x + from.w));
  const heightToClimb = from.y - to.y;
  const heightToDrop = to.y - from.y;
  return gap <= 110 && heightToClimb <= 95 && heightToDrop <= 125;
}

function moveBodyX(body, amount) {
  const nextX = constrain(body.x + amount, 0, LEVEL_LENGTH - body.w);
  if (!collidesWithObstacle(body, nextX)) body.x = nextX;
}

function collidesWithObstacle(body, x) {
  return obstacles.some((obstacle) =>
    x < obstacle.x + obstacle.w && x + body.w > obstacle.x &&
    body.y < obstacle.y + obstacle.h && body.y + body.h > obstacle.y
  );
}

function shoot() {
  if (shootCooldown > 0) return;
  const weapon = weapons[equippedWeapon];
  shootCooldown = weapon.cooldown;
  const startX = player.x + player.w / 2 + player.facing * 19;
  const startY = player.y + 17;
  const spreadAngles = weapon.bullets === 3 ? [-weapon.spread, 0, weapon.spread] : [0];
  for (const angle of spreadAngles) {
    bullets.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * player.facing * 9.5,
      vy: Math.sin(angle) * 9.5,
      damage: weapon.damage,
      active: true
    });
  }
}

function defeatZombie(zombie) {
  zombie.alive = false;
  const drops = random() < 0.28 ? 2 : 1;
  for (let i = 0; i < drops; i++) {
    coins.push({
      x: zombie.x + zombie.w / 2 + random(-8, 8),
      y: zombie.y + 10,
      r: 9,
      vy: -3 - random(0, 1.5),
      value: 1,
      collected: false
    });
  }
}

function hurtPlayer() {
  lives--;
  player.invulnerable = 100;
  player.vy = -5;
  player.x = max(35, player.x - player.facing * 55);
  if (lives <= 0) {
    screen = "lose";
    stateTimer = 105;
  }
}

function drawWorld() {
  push();
  translate(-cameraX, 0);
  drawCity();
  for (const section of groundSections) {
    noStroke();
    fill("#283044");
    rect(section.x, GROUND_Y, section.w, height - GROUND_Y);
    fill("#67734b");
    rect(section.x, GROUND_Y, section.w, 9);
    fill("#38435b");
    for (let x = section.x + 8; x < section.x + section.w; x += 38) {
      rect(x, GROUND_Y + 18, 19, 4);
    }
  }
  for (const platform of platforms) {
    fill("#59647a");
    rect(platform.x, platform.y, platform.w, platform.h);
    fill("#91a176");
    rect(platform.x, platform.y, platform.w, 5);
    fill("#222b3c");
    for (let x = platform.x + 12; x < platform.x + platform.w; x += 36) {
      rect(x, platform.y + 9, 18, 4);
    }
  }
  for (const obstacle of obstacles) drawObstacle(obstacle);
  drawBunker();
  for (const coin of coins) drawCoin(coin);
  for (const bullet of bullets) {
    noStroke();
    fill("#ffe075");
    rect(bullet.x - 5, bullet.y - 2, 11, 4);
  }
  for (const zombie of zombies) {
    if (zombie.alive) drawZombie(zombie);
  }
  drawPlayer();
  pop();
}

function drawNightSky() {
  for (const star of stars) {
    const twinkle = 150 + 100 * sin(frameCount * 0.035 + star.phase);
    noStroke();
    fill(180, 203, 235, twinkle);
    rect(star.x, star.y, star.size, star.size);
  }
  fill("#111a2b");
  circle(820, 105, 76);
  fill("#0b1220");
  circle(844, 92, 67);
}

function drawCity() {
  noStroke();
  for (let x = 0; x < LEVEL_LENGTH; x += 150) {
    const buildingHeight = 75 + ((x * 17) % 115);
    fill("#111b2b");
    rect(x, GROUND_Y - buildingHeight, 100, buildingHeight);
    fill("#263144");
    for (let wx = x + 14; wx < x + 86; wx += 24) {
      for (let wy = GROUND_Y - buildingHeight + 20; wy < GROUND_Y - 16; wy += 28) {
        if ((wx + wy + x) % 3 !== 0) {
          fill("#b39a5a");
          rect(wx, wy, 5, 7);
          fill("#263144");
        }
      }
    }
  }
}

function drawPlayer() {
  if (player.invulnerable > 0 && frameCount % 8 < 4) return;
  noStroke();
  const x = player.x;
  const y = player.y;
  fill("#d7b18b");
  rect(x + 7, y, 17, 15);
  fill("#352a31");
  rect(x + 5, y - 3, 20, 7);
  fill("#28344a");
  rect(x + 4, y + 15, 23, 18);
  fill("#a74642");
  rect(x + 4, y + 21, 23, 5);
  fill("#303747");
  rect(x + 5, y + 33, 8, 11);
  rect(x + 18, y + 33, 8, 11);
  fill("#ded7c9");
  rect(player.facing > 0 ? x + 24 : x - 8, y + 18, 16, 5);
  fill("#292d36");
  rect(player.facing > 0 ? x + 35 : x - 11, y + 19, 8, 3);
}

function drawZombie(zombie) {
  noStroke();
  const x = zombie.x;
  const y = zombie.y;
  fill("#71875c");
  rect(x + 5, y + 1, 24, 19);
  fill("#9eaa79");
  rect(x + 10, y + 7, 4, 4);
  rect(x + 21, y + 7, 4, 4);
  fill("#344136");
  rect(x + 8, y + 19, 23, 15);
  fill("#77845f");
  rect(x, y + 21, 8, 5);
  rect(x + 28, y + 21, 9, 5);
  fill("#333b36");
  rect(x + 8, y + 33, 8, 7);
  rect(x + 23, y + 33, 8, 7);
  if (zombie.health < zombie.maxHealth) {
    fill("#281f2c");
    rect(x + 3, y - 8, 28, 4);
    fill("#e86464");
    rect(x + 3, y - 8, 28 * (zombie.health / zombie.maxHealth), 4);
  }
}

function drawCoin(coin) {
  noStroke();
  fill("#8d641e");
  circle(coin.x, coin.y, coin.r * 2);
  fill("#ffd85e");
  circle(coin.x, coin.y, coin.r * 1.35);
  fill("#fff0a0");
  rect(coin.x - 2, coin.y - 5, 4, 10);
}

function drawObstacle(obstacle) {
  noStroke();
  if (obstacle.type === "spikes") {
    fill("#c85d60");
    for (let x = obstacle.x; x < obstacle.x + obstacle.w; x += 10) {
      triangle(x, GROUND_Y, x + 5, obstacle.y, x + 10, GROUND_Y);
    }
  } else if (obstacle.type === "barrier") {
    fill("#d6aa52");
    rect(obstacle.x, obstacle.y + 7, obstacle.w, 15);
    fill("#873e45");
    rect(obstacle.x + 5, obstacle.y, 7, 30);
    rect(obstacle.x + obstacle.w - 12, obstacle.y, 7, 30);
    fill("#f0d47a");
    rect(obstacle.x + 10, obstacle.y + 10, obstacle.w - 20, 4);
  } else {
    fill("#79533e");
    rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
    fill("#ae8054");
    rect(obstacle.x + 4, obstacle.y + 4, obstacle.w - 8, 4);
    stroke("#49372f");
    strokeWeight(3);
    line(obstacle.x + 4, obstacle.y + 4, obstacle.x + obstacle.w - 4, obstacle.y + obstacle.h - 4);
    line(obstacle.x + obstacle.w - 4, obstacle.y + 4, obstacle.x + 4, obstacle.y + obstacle.h - 4);
    noStroke();
  }
}

function drawBunker() {
  const x = LEVEL_LENGTH - 260;
  noStroke();
  fill("#283244");
  rect(x, 335, 260, 155);
  fill("#8490a2");
  rect(x + 12, 350, 236, 140);
  fill("#394456");
  rect(x + 28, 362, 204, 128);
  fill("#202a39");
  rect(x + 44, 374, 172, 116);
  fill("#9ca7b5");
  rect(x + 54, 384, 152, 106);
  fill("#596679");
  rect(x + 65, 395, 130, 95);
  fill("#d2b666");
  circle(x + 177, 440, 11);
  fill("#d7e1ef");
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text("SAFE BUNKER", x + 130, 328);
  textStyle(NORMAL);
}

function drawHud() {
  noStroke();
  fill(8, 13, 23, 220);
  rect(0, 0, width, 54);
  fill("#f3f0e9");
  textAlign(LEFT, CENTER);
  textSize(15);
  text(`LIVES  ${"♥ ".repeat(max(0, lives))}`, 20, 22);
  fill("#ffd85e");
  text(`COINS  ${coinCount}`, 220, 22);
  fill("#aebbd0");
  text(`LEVEL  ${level}/${LAST_LEVEL}`, 360, 22);
  text(`WEAPON  ${weapons[equippedWeapon].name}`, 520, 22);
  fill("#7e8ba1");
  rect(20, 40, width - 40, 4);
  fill("#76cba1");
  rect(20, 40, (width - 40) * constrain(player.x / (LEVEL_LENGTH - 160), 0, 1), 4);
}

function drawTitleScreen() {
  fill(5, 9, 18, 170);
  rect(0, 0, width, height);
  fill("#f3f0e9");
  textAlign(CENTER, CENTER);
  textSize(16);
  text("THE CITY HAS FALLEN", width / 2, 165);
  fill("#f55b5b");
  textStyle(BOLD);
  textSize(48);
  text("ZOMBIE", width / 2, 230);
  text("SURVIVAL", width / 2, 286);
  textStyle(NORMAL);
  fill("#aebbd0");
  textSize(14);
  text("Fight the dead. Find the bunker.", width / 2, 330);
  drawButton(width / 2 - 115, 375, 230, 58, "START", "#a83b43");
  fill("#aebbd0");
  textSize(12);
  text("A / D  MOVE     SPACE  JUMP     S  SHOOT", width / 2, 476);
}

function drawShop() {
  background("#0b1220");
  drawNightSky();
  drawShopBackground();
  fill("#f3f0e9");
  textAlign(CENTER, CENTER);
  textSize(26);
  textStyle(BOLD);
  text("BUNKER ARMORY", width / 2, 80);
  textStyle(NORMAL);
  fill("#ffd85e");
  textSize(15);
  text(`COINS: ${coinCount}     LEVEL ${level} COMPLETE`, width / 2, 120);
  textSize(12);
  fill("#aebbd0");
  text("Click a weapon to buy or equip it.", width / 2, 151);

  for (let i = 0; i < weapons.length; i++) {
    const cardX = 94 + i * 258;
    const cardY = 190;
    const owned = ownedWeapons[i];
    const equipped = equippedWeapon === i;
    fill(equipped ? "#283f3a" : "#182235");
    stroke(equipped ? "#83e6a1" : "#48536b");
    strokeWeight(2);
    rect(cardX, cardY, 220, 225);
    noStroke();
    drawWeaponIcon(i, cardX + 110, cardY + 68);
    fill("#f3f0e9");
    textSize(15);
    textStyle(BOLD);
    text(weapons[i].name, cardX + 110, cardY + 130);
    textStyle(NORMAL);
    fill("#ffd85e");
    textSize(13);
    text(weapons[i].price === 0 ? "FREE" : `${weapons[i].price} COINS`, cardX + 110, cardY + 160);
    fill(owned ? "#83e6a1" : coinCount >= weapons[i].price ? "#d9e3f2" : "#e77676");
    textSize(11);
    text(equipped ? "EQUIPPED" : owned ? "CLICK TO EQUIP" : coinCount >= weapons[i].price ? "CLICK TO BUY" : "NOT ENOUGH COINS", cardX + 110, cardY + 195);
  }
  drawButton(width / 2 - 120, 470, 240, 56, level >= LAST_LEVEL ? "FINISH" : "NEXT LEVEL", "#257a55");
  fill("#91a0b7");
  textSize(12);
  text(`Lives: ${lives}    •    Coins collected: ${coinCount}`, width / 2, 555);
}

function drawShopBackground() {
  noStroke();
  fill("#252f40");
  rect(0, 0, width, 20);
  rect(0, height - 20, width, 20);
  for (let x = 24; x < width; x += 48) {
    fill("#667287");
    rect(x, 20, 4, height - 40);
    fill("#182131");
    rect(x + 7, 20, 2, height - 40);
  }
  fill("#404d61");
  rect(0, 170, width, 7);
}

function drawWeaponIcon(index, x, y) {
  push();
  translate(x, y);
  noStroke();
  fill("#b8c2ce");
  if (index === 0) {
    rect(-34, -9, 51, 15);
    rect(-10, 5, 15, 20);
    rect(13, -5, 23, 7);
    fill("#465366");
    rect(-29, -5, 32, 4);
  } else if (index === 1) {
    rect(-42, -10, 66, 17);
    rect(-17, 5, 16, 22);
    rect(20, -7, 24, 11);
    fill("#465366");
    rect(-35, -6, 48, 5);
  } else {
    rect(-40, -10, 67, 16);
    rect(-17, 5, 14, 21);
    rect(25, -6, 28, 8);
    rect(-25, 9, 30, 7);
    fill("#465366");
    rect(-35, -6, 48, 5);
  }
  pop();
}

function drawMessage(title, subtitle, color) {
  fill(0, 0, 0, 185);
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill(color);
  textStyle(BOLD);
  textSize(44);
  text(title, width / 2, height / 2 - 28);
  textStyle(NORMAL);
  fill("#e5e9f0");
  textSize(16);
  text(subtitle, width / 2, height / 2 + 25);
}

function drawButton(x, y, w, h, label, color) {
  noStroke();
  fill("#090d18");
  rect(x + 4, y + 5, w, h);
  fill(color);
  rect(x, y, w, h);
  fill("#fff5e8");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(14);
  text(label, x + w / 2, y + h / 2);
  textStyle(NORMAL);
}

function mousePressed() {
  if (screen === "title" && insideButton(width / 2 - 115, 375, 230, 58)) {
    level = 1;
    lives = 3;
    coinCount = 0;
    ownedWeapons = [true, false, false];
    equippedWeapon = 0;
    resetLevel();
    screen = "playing";
  } else if (screen === "shop") {
    for (let i = 0; i < weapons.length; i++) {
      const cardX = 94 + i * 258;
      if (mouseX >= cardX && mouseX <= cardX + 220 && mouseY >= 190 && mouseY <= 415) {
        if (ownedWeapons[i]) {
          equippedWeapon = i;
        } else if (coinCount >= weapons[i].price) {
          coinCount -= weapons[i].price;
          ownedWeapons[i] = true;
          equippedWeapon = i;
        }
        return false;
      }
    }
    if (insideButton(width / 2 - 120, 470, 240, 56)) {
      if (level >= LAST_LEVEL) {
        screen = "finalWin";
      } else {
        level++;
        resetLevel();
        screen = "playing";
      }
    }
  } else if (screen === "finalWin" && insideButton(width / 2 - 105, 390, 210, 54)) {
    screen = "title";
  }
  return false;
}

function keyPressed() {
  if (keyCode === 32) {
    if (screen === "playing" && player.grounded) {
      player.vy = -14;
      player.grounded = false;
    } else if (screen === "title") {
      mouseX = width / 2;
      mouseY = 400;
      screen = "playing";
    }
    return false;
  }
}

function insideButton(x, y, w, h) {
  return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function overlaps(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function pointInRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}
