import { SuritreeFighterGame } from "./game.js";

const canvas = document.getElementById("game-canvas");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const statusPill = document.getElementById("status-pill");

const game = new SuritreeFighterGame(canvas, {
  onStatusChange(status) {
    statusPill.textContent = status;
  },
});

window.render_game_to_text = () => game.renderGameToText();
window.advanceTime = (ms) => game.advanceTime(ms);
window.__suritreeGame = game;

startButton.addEventListener("click", () => {
  game.startMatch();
  canvas.focus();
});

resetButton.addEventListener("click", () => {
  game.playSound("menuCancel");
  game.resetMatch();
  canvas.focus();
});

game.start();
