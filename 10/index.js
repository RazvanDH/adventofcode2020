const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(no => +no).sort((a, b) => a - b)

const DEVICE_JOLTAGE = input[input.length - 1] + 3
const fullInput = [0, ...input, DEVICE_JOLTAGE]

const task1 = (fullInput) => {
  let joltsDiffs = [0, 0, 0]

  for (i = 1; i < fullInput.length; i++) {
    const prevNumber = fullInput[i - 1]
    const currentNumber = fullInput[i]

    ++joltsDiffs[currentNumber - prevNumber - 1]
  }

  return joltsDiffs[0] * joltsDiffs[2]
}

const task2 = (input) => {
  const matchResults = [ 1, ...Array(input.length - 1).fill(0) ]

  for (let i = 1; i < input.length; i++) {
    const leftBoundary = (i - 3 >= 0) ? (i-3) : ((i - 2) >= 0 ? (i - 2) : 0)
    const number = input[i]

    for(let j = leftBoundary; j < i; j++) {
      const leftNumber = input[j]

      if (number - leftNumber <= 3) {
        matchResults[i] += matchResults[j]
      }
    }
  }

  return matchResults[matchResults.length - 1]
}

console.log('task1:', task1(fullInput))
console.log('task2:', task2(fullInput))
