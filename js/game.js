"use strict"

const EASY_LEVEL = 4
const HURD_LEVEL = 8
const EXTREME_LEVEL = 12

const FLAG = "🚩"
const MINE = "💣"
const NUM1 = "1️"
const NUM2 = "2️"
const NUM3 = "3️"
const EMPTY = ""
const HAPPY_FACE = "😃"
const SHOCK_FACE = "😲"
const COOL_FACE = "😎"

var gBoard
var gInterval
var gFirstClick = 0

const G_GAME = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}
const gLevel = {
  size: 4,
  mines: 2,
}

function initGame() {
  gFirstClick = 0
  var selGameOver = document.querySelector(".game-over")
  selGameOver.innerText = HAPPY_FACE
  clearInterval(gInterval)

  G_GAME.isOn = true
  gBoard = buildBoard(gLevel.size)

  renderBoard(gBoard, ".board-container")

  console.log(gBoard)
}

// build the model

function buildBoard(size) {
  const board = []
  for (var i = 0; i < size; i++) {
    board[i] = []
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  getRandomMines(board, gLevel)
  // setting the Neighbors of the mines
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j].isMine) {
        setMinesNegsCount(board, i, j)
      }
    }
  }

  return board
}
// update the DOM
function renderBoard(gBoard, selector) {
  var strHTML = '<table border="3"><tbody>'
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += "<tr>"
    for (var j = 0; j < gBoard[0].length; j++) {
      const cell = gBoard[i][j]
      const className = "cell cell-" + i + "-" + j
      if (cell.isMine) {
        strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j})" oncontextmenu="event.preventDefault();" onmouseup="cellMarked(this, event, ${i}, ${j})"><span class="hidden-content">${MINE}</span><span class="hidden-flag">${FLAG}</span></td>`
      } else if (cell.minesAroundCount > 0) {
        strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j})" oncontextmenu="event.preventDefault();" onmouseup="cellMarked(this, event, ${i}, ${j})"><span class="hidden-content">${cell.minesAroundCount}</span><span class="hidden-flag">${FLAG}</span></td>`
      } else {
        strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j})" oncontextmenu="event.preventDefault();" onmouseup="cellMarked(this, event, ${i}, ${j})"><span class="hidden-content">${EMPTY}</span><span class="hidden-flag">${FLAG}</span></td>`
      }
    }
    strHTML += "</tr>"
  }
  strHTML += "</tbody></table>"

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

function checkGameOver() {
  // prettier-ignore
  if (G_GAME.markedCount === gLevel.mines && G_GAME.shownCount === (gLevel.size * gLevel.size) - gLevel.mines) {
    console.log(G_GAME.markedCount)
    return true
  } else {return false}
}

function cellClicked(elCell, i, j) {
  G_GAME.shownCount++
  console.log(G_GAME.shownCount)
  // if step on a mine
  if (gBoard[i][j].isMine) {
    clearInterval(gInterval)
    var selGameOver = document.querySelector(".game-over")
    selGameOver.innerText = SHOCK_FACE
  }

  //  Marked cell can't be clicked
  elCell.classList.add("marked")
  if (gBoard[i][j].isMarked) return
  // Checked if it is te first click
  gFirstClick++
  if (gFirstClick === 1) {
    setTimer()
  }

  // Checked if it is empty cell
  if (
    elCell.innerHTML === `<span class="hidden-content"></span><span class="hidden-flag">🚩</span>`
  ) {
    expandShown(gBoard, elCell, i, j)
  }

  // update model
  gBoard[i][j].isShown = true
  // update DOM
  var elSpan = elCell.getElementsByTagName("span")
  elSpan[0].classList.remove("hidden-content")

  if (checkGameOver()) {
    // if win !
    clearInterval(gInterval)
    var selGameOver = document.querySelector(".game-over")
    selGameOver.innerText = COOL_FACE
  }
}
function cellMarked(elCell, ev, i, j) {
  // checked if it is the right button on the mouse
  if (ev.button === 2) {
    G_GAME.markedCount++
    console.log(G_GAME.markedCount)
    console.log(ev)
    if (gBoard[i][j].isShown) return
    gBoard[i][j].isMarked = true
    var elSpan = elCell.getElementsByTagName("span")
    elSpan[1].classList.remove("hidden-flag")
  }
}

function chooseLevel(level) {
  if (level === EASY_LEVEL) {
    gLevel.size = EASY_LEVEL
    gLevel.mines = 2
  }
  if (level === HURD_LEVEL) {
    gLevel.size = HURD_LEVEL
    gLevel.mines = 14
  }
  if (level === EXTREME_LEVEL) {
    gLevel.size = EXTREME_LEVEL
    gLevel.mines = 32
  }
  initGame()
}

function setTimer() {
  var timer = document.querySelector(".timer-container")
  var start = Date.now()
  gInterval = setInterval(() => {
    var currTime = Date.now()
    var seconds = parseInt((currTime - start) / 1000)
    G_GAME.secsPassed = seconds
    timer.innerText = `Time :\n ${seconds}`
  }, 1000)
}
