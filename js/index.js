"use strict"

const FLAG = "🚩"

const NUM1 = "1️"
const NUM2 = "2️"
const NUM3 = "3️"
const EMPTY = ""
const HAPPY_FACE = "😃"
const SHOCK_FACE = "😲"
const COOL_FACE = "😎"
var gBoard

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
  gBoard = buildBoard(gLevel.size)
//   getRandomMines()
  renderBoard(gBoard, ".board-container")
  renderMines(gBoard)

  console.log(gBoard)
}

function buildBoard(size) {
  const board = []
  var count = 0
  for (var i = 0; i < size; i++) {
    board[i] = []
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: true,
        isMine: Math.random() > 0.8 ? true : false,
        isMarked: true,
      }
      if (board[i][j].isMine) count++
      if (count > gLevel.mines) board[i][j].isMine = false
    }
  }

  return board
}

function renderBoard(gBoard, selector) {
  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < gBoard.length; i++) {
    strHTML += "<tr>"
    for (var j = 0; j < gBoard[0].length; j++) {
      const cell = gBoard[i][j]
      const className = "cell cell-" + i + "-" + j
      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += "</tr>"
  }
  strHTML += "</tbody></table>"

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}
