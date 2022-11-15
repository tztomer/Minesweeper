"use strict";
function printPrimaryDiagonal(board) {
  const arr = [];
  for (var d = 0; d < board.length; d++) {
    var item = board[d][d];
    diagonalRnder(item, d, d);
    arr.push(item);
  }
  return arr;
}

function countMines(board) {
  let arr = [];

  board.forEach((row, i) => {
    row.forEach(cell => {
      if (cell.isMine) {
        // console.log(cell);
        arr.push(cell);
      }
    });
  });
  console.log("borad mines", arr.length);
  return arr.length;
}

//  Keep running antli׳a you find me different positions!!!!!!!
function createMine(board, MinsNum) {
  const mineObject = [];

  while (mineObject.length <= MinsNum) {
    var mine = {
      position: {
        i: getRandomIntInt(board.length - board.length, board.length),
        j: getRandomIntInt(board.length - board.length, board.length),
      },
      isShown: false,
      icon: MINE,
      flag: FLAG,
      isMine: true,
      isMarked: false,
    };

    mineObject.push(mine);
  }

  const found = mineObject.find(function (pos, i, arr) {
    if (pos.position.x === mine.position.x && pos.position.yj === mine.position.yj);
    {
      return arr.slice(i, 1);
    }
  });
  mineObject.forEach((el, i, arr) => {
    board[el.position.i][el.position.j] = el;
    // console.log("mine el", el);
  });

  // console.log(found);

  console.log("mins", mineObject.length);
  return mineObject;
}

function recClass(cell) {
  let currName = cell.isMine ? "MINE" : "NUMBER";
  console.log("from function", currName);
  return currName;
}

function cellsRecursing(colJ, rowJ, board, type) {
  let className = recClass(board[rowJ][colJ]);
  for (let i = +colJ - 1; i <= +colJ + 1; i++) {
    if (i < 0 || i > board.length - 1) {
      continue;
    }
    for (let j = +rowJ - 1; j <= +rowJ + 1; j++) {
      if (j < 0 || j > board[0].length - 1) {
        continue;
      }
      let cell = board[i][j];
      if (cell.isMarked || cell.isShown || cell.isMine) {
        continue;
      }
      // setTimeout(function (className) {
      if (className === "MINE") continue;
      let cellElement = document.querySelector(`.${className}-${i}-${j}`);
      console.log("the rec div", cellElement);
      if (cell.mineCounts === 0 && !cell.isMine) {
        cell.isShown = true;
        cellElement.classList.add("show-active");
        // cellElement.innerText = 0;
        cellsRecursing(i, j, board);
      } else if (cell.mineCounts && !cell.isMine) {
        cellElement.innerText = cell.mineCounts;
      }
      // }, 1000);
    }
  }
}

function recClass(cell) {
  let currName = cell?.isMine ? "MINE" : "NUMBER";

  return currName;
}

function endGame(gBoard) {
  let arr = board
    .flatMap(x => x)
    .filter(cell => cell.isMine)
    .map(mine => (mine.isMarked = true));
  // let theTrue = new Set(arr);
  console.log("arr.len", arr.length);
  return arr.length;
}

function displayFlags(board, i, j, type) {
  let cell = board[i][j];
  console.log("cell", cell);
  let str = "";
  let counter = 0;
  if (cell.isMine && !cell.isMarked) {
    str = cell.flag;
    cell.isMarked = true;
    counter--;
  } else if (cell.isMine && cell.isMarked) {
    str = cell.icon;
    cell.isMarked = false;
    counter++;
  } else if (cell.mineCounts >= 0 && !cell.isMarked) {
    console.log("numbet is maarded");
    str = cell.flag;
    cell.isMarked = true;
  } else if (cell.mineCounts >= 0 && cell.isMarked) {
    str = cell.mineCounts;
    cell.isMarked = false;
  }

  if (type === "NUMBER" || type === "MINE") {
    let elCell = document.querySelector(`.${type}-${i}-${j}`);
    elCell.innerText = str;
    elCell.classList.toggle("show-flag");
    console.log("cell", elCell);
    const elMineCount = document.querySelector(".mine-count");
    let current = parseInt(elMineCount.innerText);
    elMineCount.innerText = current + counter;
    console.log("curret pllus", current + counter);
    let sum = current + counter;
    if (sum === 0) {
      popupRender("You Won");
    }
  }
}
