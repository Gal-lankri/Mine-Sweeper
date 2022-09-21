"use strict"
function renderBoard(mat, selector) {
  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>"
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = "cell cell-" + i + "-" + j
      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += "</tr>"
  }
  strHTML += "</tbody></table>"

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

// location such as: {i: 2, j: 7}
//   function renderCell(location, value) {
//     // Select the elCell and set the value
//     const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
//     elCell.innerHTML = value
//   }
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function getRandomColor() {
  var letters = "0123456789ABCDEF"
  var color = "#"
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
var gMat = createMat(6, 12)

function createMat(rowCount, colCount) {
  var mat = []

  for (var i = 0; i < rowCount; i++) {
    mat[i] = []
    for (var j = 0; j < colCount; j++) {
      mat[i][j] = j
    }
  }
  return mat
}
function countFoodAround(mat, rowIdx, colIdx) {
  var foodCount = 0

  for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
    if (i < 0 || i >= mat.length) continue

    for (var j = colIdx - 1; j <= colIdx + 1; j++) {
      if (j < 0 || j >= mat[i].length) continue
      if (i === rowIdx && j === colIdx) continue

      var currCell = mat[i][j]
      console.log("currCell: ", currCell)
      if (currCell === FOOD) foodCount++
    }
  }
  return foodCount
}
