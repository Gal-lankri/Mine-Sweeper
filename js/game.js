"use strict"

const BEGINNER_LEVEL = 4
const MEDIUM_LEVEL = 8
const EXTREME_LEVEL = 12

const HEART = "💖"
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
var gMinesStepCount = 0

const g_Game = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}
const gLevel = {
  size: 4,
  mines: 2,
}
function resetG_Game() {
  g_Game.markedCount = 0
  g_Game.shownCount = 0
  g_Game.secsPassed = 0
  var elLives = document.getElementById("hearts")
  elLives.innerText = HEART + HEART + HEART
  gMinesStepCount = 0
}

function initGame() {
  g_Game.isOn ? resetG_Game() : (g_Game.isOn = true)

  gFirstClick = 0
  var selGameOver = document.querySelector(".game-over")
  selGameOver.innerText = HAPPY_FACE
  clearInterval(gInterval)

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
  // getRandomMines(board, gLevel)
  // // setting the Neighbors of the mines
  // for (var i = 0; i < board.length; i++) {
  //   for (var j = 0; j < board[i].length; j++) {
  //     if (board[i][j].isMine) {
  //       setMinesNegsCount(board, i, j)
  //     }
  //   }
  // }

  return board
}
// update the DOM
function renderBoard(board, selector) {
  // checking the size of the board
  if (gLevel.size === BEGINNER_LEVEL) var strHTML = "<table class='beginner-table'><tbody>"
  else if (gLevel.size === MEDIUM_LEVEL) var strHTML = "<table class='medium-table'><tbody>"
  else var strHTML = "<table class='expert-table'><tbody>"
  for (var i = 0; i < board.length; i++) {
    strHTML += "<tr>"
    for (var j = 0; j < board[i].length; j++) {
      // add classs
      var cell = board[i][j]
      var tdClassName = "cell cell-" + i + "-" + j
      var spanOfContentClassName = 'class="hidden-content"'

      if (cell.isShown) {
        tdClassName += " clicked"
        spanOfContentClassName = null
      }
      if (gLevel.size === BEGINNER_LEVEL) tdClassName += " beginner-td"
      else if (gLevel.size === MEDIUM_LEVEL) tdClassName += "  medium-td"
      else tdClassName += " expert-td"

      // check if it is a mine/empty cel/mines negs
      if (cell.isMine) {
        strHTML += `<td class="${tdClassName}" onclick="cellClicked(this,${i},${j})" oncontextmenu="event.preventDefault();" onmouseup="cellMarked(this, event, ${i}, ${j})"><span ${spanOfContentClassName}>${MINE}</span><span class="hidden-flag">${FLAG}</span></td>`
      } else if (cell.minesAroundCount > 0) {
        strHTML += `<td class="${tdClassName}" onclick="cellClicked(this,${i},${j})" oncontextmenu="event.preventDefault();" onmouseup="cellMarked(this, event, ${i}, ${j})"><span ${spanOfContentClassName}>${cell.minesAroundCount}</span><span class="hidden-flag">${FLAG}</span></td>`
      } else {
        strHTML += `<td class="${tdClassName}" onclick="cellClicked(this,${i},${j})" oncontextmenu="event.preventDefault();" onmouseup="cellMarked(this, event, ${i}, ${j})"><span ${spanOfContentClassName}>${EMPTY}</span><span class="hidden-flag">${FLAG}</span></td>`
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
  if (
    g_Game.markedCount === gLevel.mines &&
    g_Game.shownCount === gLevel.size * gLevel.size - gLevel.mines
  ) {
    return true
  } else {
    return false
  }
}

function cellClicked(elCell, rowIdx, colIdx) {
  //  Marked cell can't be clicked
  if (gBoard[rowIdx][colIdx].isMarked) return
  if (gBoard[rowIdx][colIdx].isShown) return
  gFirstClick++
  // Checked if it is te first click
  if (gFirstClick === 1) {
    gBoard[rowIdx][colIdx].isShown = true
    g_Game.shownCount++
    expandShown(gBoard, elCell, rowIdx, colIdx)
    getRandomMines(gBoard, gLevel)

    // setting the Neighbors of the mines
    for (var i = 0; i < gBoard.length; i++) {
      for (var j = 0; j < gBoard[i].length; j++) {
        if (gBoard[i][j].isMine) {
          setMinesNegsCount(gBoard, i, j)
        }
      }
    }
    renderBoard(gBoard, ".board-container")

    setTimer()
  } else {
    // if step on a mine
    if (gBoard[rowIdx][colIdx].isMine) {
      gMinesStepCount++
      gLevel.mines--
      var elLives = document.getElementById("hearts")
      if (gMinesStepCount === 1) elLives.innerText = HEART + HEART
      else if (gMinesStepCount === 2) elLives.innerText = HEART
      else if (gMinesStepCount === 3) elLives.innerText = "Finish Lives !"
      var selectorGameOver = document.querySelector(".game-over")
      selectorGameOver.innerText = SHOCK_FACE
      clearInterval(gInterval)
    }

    // Checked if it is empty cell
    if (
      elCell.innerHTML ===
      `<span class="hidden-content"></span><span class="hidden-flag">${FLAG}</span>`
    ) {
      expandShown(gBoard, elCell, rowIdx, colIdx)
    }

    // update model
    g_Game.shownCount++
    gBoard[rowIdx][colIdx].isShown = true
    // update DOM
    elCell.classList.add("clicked")
    var elSpan = elCell.getElementsByTagName("span")
    elSpan[0].classList.remove("hidden-content")

    if (checkGameOver()) {
      // if win !
      clearInterval(gInterval)
      var selectorGameOver = document.querySelector(".game-over")
      selectorGameOver.innerText = COOL_FACE
    }
  }
}
function cellMarked(elCell, ev, i, j) {
  // checked if it is the right button on the mouse
  if (ev.button === 2) {
    if (gBoard[i][j].isShown) return
    var elSpan = elCell.getElementsByTagName("span")
    if (gBoard[i][j].isMarked) {
      g_Game.markedCount--
      gBoard[i][j].isMarked = false
      elSpan[1].classList.add("hidden-flag")
    } else {
      g_Game.markedCount++
      gBoard[i][j].isMarked = true
      elSpan[1].classList.remove("hidden-flag")
    }
    if (checkGameOver()) {
      // if win !
      clearInterval(gInterval)
      var selectorGameOver = document.querySelector(".game-over")
      selectorGameOver.innerText = COOL_FACE
    }
  }
}

function chooseLevel(level) {
  if (level === BEGINNER_LEVEL) {
    gLevel.size = BEGINNER_LEVEL
    gLevel.mines = 2
  }
  if (level === MEDIUM_LEVEL) {
    gLevel.size = MEDIUM_LEVEL
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
    g_Game.secsPassed = seconds
    timer.innerText = `Time :\n ${seconds}`
  }, 1000)
}
