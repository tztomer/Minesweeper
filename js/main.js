"use strict";
const elMineCount = document.querySelector(".mine-count");
const elTable = document.querySelector("table");
const popup = document.querySelector(".popup");
const MINE = "💥";
const FLAG = "🚩";
const EMPTY = "⬜️";
const NUM = "";

//-----model-------
let gBoard;

let gDiagonals = [];
let gNums = [];
let gMins = [];
let gLevels = { rowSize: 10, coulSize: 10, Mines: 20 };
let gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  minesCount: 0,
};

function initGame() {
  gBoard = buildBoard();
  gMins = createMine(gBoard, gLevels.Mines);
  setMinesNegsCount(gBoard);
  render(gBoard, elMineCount, elTable, popup);

  gGame.isOn = true;

  clickEvents(gBoard);

  console.table(gBoard);
}

function buildBoard() {
  var board = [];
  var row = gLevels.rowSize;
  var col = gLevels.coulSize;

  // var mines = setRandMines(countMines, row * col); //return arrays

  for (var i = 0; i < row; i++) {
    board[i] = [];
    for (var j = 0; j < col; j++) {
      // var isMine = mines.includes(counter) ? "true" : "false"

      board[i][j] = {
        mineCounts: 0,
        isShown: false,
        isMarked: false,
        flag: FLAG,
        position: { i, j },
      };
    }
  }

  return board;
}

function setMinesNegsCount(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      var minesCount = 0;
      for (var x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= board.length) continue;

        for (var y = j - 1; y <= j + 1; y++) {
          if (x === i && y === j) continue;
          if (y < 0 || y >= board.length) continue;
          if (board[x][y].isMine) minesCount++;
        }
      }

      board[i][j].mineCounts = minesCount;
    }
  }
}

function diagonal(event) {
  printPrimaryDiagonal(gBoard);
}

function startplay() {
  initGame();
  let eltTable = document.querySelector("table");
  eltTable.style.pointerEvents = "painted";
  popup.classList.remove("show-popup");
  console.log(gGame);
}

// function firstClicked(){

// }
