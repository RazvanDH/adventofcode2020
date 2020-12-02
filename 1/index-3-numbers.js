const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(n => +n)

const SUM = 2020
const INPUT_LENGTH = input.length

const findSum = (depth, terms = [], index = 0) => {
  let result

  for (let i = index; i <= (INPUT_LENGTH - depth - 1); i++) {
    if (depth === 1) {
      const tempSum = terms.reduce((accumulator, term) => accumulator + term, input[i])
      if (tempSum === SUM) {
        result = [...terms, input[i]]
      }
    } else {
      result = findSum(depth - 1, [...terms, input[i]], i + 1)
    }

    if (result) {
      break
    }
  }

  return result
}

const multiplyNumbers = (arr) => arr.reduce((multiplier, number) => multiplier * number, 1)

console.log(multiplyNumbers(findSum(3)))
