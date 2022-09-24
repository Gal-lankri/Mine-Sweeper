"use strict"

var gMines = []

function getRandomMines(board, level) {
  var prevRandomIdx = { i: -1, j: -1 }
  for (var i = 0; i < level.mines; i++) {
    var randomIdx = {
      i: getRandomIntInclusive(0, level.size - 1),
      j: getRandomIntInclusive(0, level.size - 1),
    }
    if (randomIdx.i === prevRandomIdx.i && randomIdx.j === prevRandomIdx.j) {
      i--
      continue
    }
    board[randomIdx.i][randomIdx.j].isMine = true
    prevRandomIdx.i = randomIdx.i
    prevRandomIdx.j = randomIdx.j
  }
}

function setMinesNegsCount(board, rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue
    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (i === rowIdx && j === colIdx) continue
      if (j < 0 || j >= board[0].length) continue
      if (board[i][j].isMine) continue
      var currCell = board[i][j]

      currCell.minesAroundCount++
    }
  }
}

function expandShown(board, elCell, rowIdx, colIdx) {
  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= board.length) continue

    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= board[0].length) continue
      if (i === rowIdx && j === colIdx) continue
      var currCell = board[i][j]
      if (currCell.isMine) continue
      if (currCell.isMarked) continue
      else if (!currCell.isShown) {
        currCell.isShown = true
        G_GAME.shownCount++
        var currElCell = document.querySelector(`.cell-${i}-${j}`) 
        currElCell.classList.add("clicked")
        var elSpan = currElCell.getElementsByTagName("span")
        elSpan[0].classList.remove("hidden-content")
      }
    }
  }
}
