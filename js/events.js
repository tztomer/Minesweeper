// "use-strict";

function clickEvents(gBoard) {
  let flag = false;
  let eltTable = document.querySelector("table");

  eltTable.addEventListener(
    "click",
    bubblingDown,
    e => {
      e.preventDefault();
    },
    true
  );

  eltTable.addEventListener(
    "contextmenu",
    bubblingFlags,
    e => {
      e.preventDefault();
      console.log(e.target.className.includes("show"));
    },
    true
  );
}

function bubblingDown(e) {
  let newArr = e.target.children[0].classList.value
    .split(" ")
    .find(el => el[0])
    .split("-");
  let [type, i, j] = newArr;
  console.log(i);
  console.log(j);
  console.log(type);
  console.log(newArr);
  console.log(typeof i);
  i = parseInt(i);
  j = parseInt(j);
  let cell = gBoard[i][j];
  cellsRecursing(j, i, gBoard);
  elCell = document.querySelector(`.${type}-${i}-${j}`);
  if (type === "NUMBER") {
    console.log(elCell);
    elCell.classList.add("show-active");
  } else if (type === "MINE") {
    const allMines = document.querySelectorAll(".MINE");
    console.log(allMines);

    NodeList.prototype.forEach = Array.prototype.forEach;
    allMines.forEach(element => {
      element.classList.add("show-mine");
      elTable.style.pointerEvents = "none";
      // e.stopPropagation();
    });
    setTimeout(() => {
      popupRender("You Lost 😡");
    }, 1000);

    // elCell.classList.add("show-mine");
  }
}

function bubblingFlags(e) {
  if (e.target.className.includes("inner")) {
    console.log("e.target regolar");
    newArr = e.target.classList[0].split("-");
    let [type, i, j] = newArr;
    i = parseInt(i);
    j = parseInt(j);
    displayFlags(gBoard, i, j, type);
  } else {
    console.log("else");
    newArr = e.target.children[0].classList.value
      .split(" ")
      .find(el => el[0])
      .split("-");
    let [type, i, j] = newArr;
    console.log(i);
    console.log(j);
    console.log(type);
    console.log(newArr);
    console.log(typeof i);

    displayFlags(gBoard, parseInt(i), parseInt(j), type);
  }
}
