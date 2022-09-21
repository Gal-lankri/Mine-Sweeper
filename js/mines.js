"use strict"
const MINE = "💣"
var gMines = []

// function creatMine(boardSize) {
//   const mine = {
//     location: {
//       i: randomI,
//       j: randomJ,
//     },
//   }
//   return mine
// }

// function creatMines(boardSize) {
//   gMines = []
//   for (var i = 0; i < boardSize; i++) {
//     gMines.push(creatMine(boardSize))
//   }
//   gBoard[i][j].isMine
// }
function getRandomMines() {
  debugger
  var prevRandomIdx = { i: -1, j: -1 }
  for (var i = 0; i < gLevel.mines; i++) {
    var randomIdx = {
      i: getRandomIntInclusive(0, gLevel.size - 1),
      j: getRandomIntInclusive(0, gLevel.size - 1),
    }
    if (randomIdx.i === prevRandomIdx.i && randomIdx.j === prevRandomIdx.j) continue
    gBoard[randomIdx.i][randomIdx.j].isMine = true
    prevRandomIdx.i[randomIdx.i]
    prevRandomIdx.j[randomIdx.j]
  }
}

function putMines(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      var currCellLocation = { i, j }
      if (board[i][j].isMine) renderCell(currCellLocation, getMineHTML())
    }
  }
}

function getMineHTML() {
  return `<span class="mine">${MINE}</span>`
}

function renderCell(location, value) {
  var elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  console.log(elCell)
  elCell.innerHTML = value
}

function setMinesNegsCount(board, rowIdx, colIdx) {
  var minesCount = 0

  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue
      if (j < 0 || j >= board[0].length) continue
      var currCell = board[i][j].isMine
      if (currCell) minesCount++
    }
  }
  if (minesCount > 0) renderCell({ i, j }, getMinesNegsHTML(minesCount))
  return (board[i][j].minesAroundCount = minesCount)
}

function getMinesNegsHTML(mineNegs) {
  if (mineNegs === 1) return `<span class="negs">${NUM1}</span>`
  if (mineNegs === 2) return `<span class="negs">${NUM2}</span>`
  if (mineNegs === 3) return `<span class="negs">${NUM3}</span>`
}
