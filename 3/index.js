const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n')

const LINE_LENGTH = input[0].length
const SLOPE_LENGTH = input.length

const calculatePosition = (position, slopeY) => {
  let newPosition = position + slopeY

  return newPosition % LINE_LENGTH
}

const incrementIfTree = (row, position, noOfTrees) => {
  let newNoOfTrees = noOfTrees

  if (input[row].charAt(position) === '#') {
    ++newNoOfTrees
  }

  return newNoOfTrees
}

const countTrees = ({slopeX, slopeY, row, position, trees}) => {
  const noOfTrees = incrementIfTree(row, position, trees)

  if (row < SLOPE_LENGTH - slopeX - 1) {
    return countTrees({
      slopeX,
      slopeY,
      row: row + slopeX,
      position: calculatePosition(position, slopeY),
      trees: noOfTrees,
    })
  }

  return noOfTrees
}

const probabilityToHit = (input) => input.reduce((result, slope) => {
  return result * countTrees({
    slopeX: slope[0],
    slopeY: slope[1],
    row: 0,
    position: 0,
    trees: 0,
  })
}, 1)

// task 1
console.log(countTrees({
  slopeX: 1,
  slopeY: 3,
  row: 0,
  position: 0,
  trees: 0,
}))

// task 2
console.log(probabilityToHit([[1,1], [1,3], [1,5], [1,7], [2,1]]))
