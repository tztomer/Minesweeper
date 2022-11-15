function render(board, ...elements) {
  let minesViewCount = countMines(board);
  console.log("mines display", minesViewCount);

  let strHTML = "<tbody>";

  for (let i = 0; i < board.length; i++) {
    strHTML += "<tr> ";

    for (let j = 0; j < board[0].length; j++) {
      let classCell = recClass(gBoard[i][j]);
      let cell = board[i][j];

      // cell = "";

      if (cell.isMarked) {
        cell = cell.flag;
      } else if (cell.isMine) {
        cell = cell.icon;
      } else if (cell.mineCounts >= 0) {
        cell = cell.mineCounts;
      }

      // console.log("from render", classCell);

      strHTML += `<td class="cell cell-${i}-${j}"><div class="${classCell}-${i}-${j} inner ${classCell}">${cell}</div></td> `;
    }
  }
  strHTML += "</tr></tbody>";
  // console.log(strHTML)
  console.log("mine count", minesViewCount);
  elMineCount.innerText = `${minesViewCount}`;
  elTable.innerHTML = strHTML;

  return elTable;
}

function diagonalRnder(cell, cellI, cellJ) {
  let strHTML = "";
  let type = recClass(cell);
  let elCell = "";
  if (cell.isMine && type === "MINE") {
    strHTML += cell.mineCounts;
    console.log("type", type);
    elCell = document.querySelector(`.${type}-${cellI}-${cellJ}`);
  }

  return (elCell.innerHTML = strHTML);
}

function popupRender(str) {
  let popup = document.querySelector(".popup");
  popup.innerText = `${str}`;
  popup.classList.toggle("show-popup");
  play;

  // popup.hidden = true;
}
