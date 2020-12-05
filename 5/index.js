const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n')

const NUMBER_OF_ROWS = 127
const NUMBER_OF_SEATS = 7

const decoded = {
  rows: {},
  seats: {},
  ids: []
}


const decodePosition = (type, binary, maxNumber, lowerBoundaryIndicator, upperBoundaryIndicator) => {
  const BINARY_LENGTH = binary.length

  let interval = {
    [lowerBoundaryIndicator]: 0,
    [upperBoundaryIndicator]: maxNumber
  }

  let result

  if (decoded[type][binary]) {
    return decoded[type][binary]
  }

  for (let i = 0; i < BINARY_LENGTH; i++) {
    const newBoundary = (interval[lowerBoundaryIndicator] + interval[upperBoundaryIndicator]) / 2
    if (binary[i] === lowerBoundaryIndicator) {
      interval[upperBoundaryIndicator] = Math.floor(newBoundary)
    } else {
      interval[lowerBoundaryIndicator] = Math.ceil(newBoundary)
    }
  }

  result = interval[binary[BINARY_LENGTH - 1] === lowerBoundaryIndicator ? lowerBoundaryIndicator : upperBoundaryIndicator]

  decoded[type][binary] = result

  return result
}

const findHighestSeat = (input) => input.reduce((highestSeat, binary) => {
  const row = binary.slice(0, 7)
  const seat = binary.slice(7, 10)

  if (!row.length || !seat.length) {
    return highestSeat
  }

  const decodedRow = decodePosition('rows', row, NUMBER_OF_ROWS, 'F', 'B')
  const decodedSeat = decodePosition('seats', seat, NUMBER_OF_SEATS, 'L', 'R')

  const seatId = decodedRow * 8 + decodedSeat
  decoded.ids.push(seatId)
  return highestSeat < seatId ? seatId : highestSeat
}, 0)

const highestSeat = findHighestSeat(input)

const findMissingSeat = (ids) => {
  const sortedIds = ids.sort()

  let result

  for(let i = 0; i < (sortedIds.length - 2); i++) {
    if (sortedIds[i + 1] !== (sortedIds[i] + 1) && sortedIds[i + 1] === (sortedIds[i] + 2)) {
      result = sortedIds[i] + 1
    }
  }

  return result
}

// task 1
console.log(highestSeat)

// task 2
console.log(findMissingSeat(decoded.ids))
