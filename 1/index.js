const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(n => +n)

let result
const SUM = 2020
const INPUT_LENGTH = input.length
const FIRST_PASS_LENGTH = INPUT_LENGTH - 2
const SECOND_PASS_LENGTH = INPUT_LENGTH - 1

for (let i = 0; i < FIRST_PASS_LENGTH; i++) {
  if (result) { break }

  if (input[i] < SUM) {
    const diff = SUM - input[i]

    for (let j = i + 1; j < SECOND_PASS_LENGTH; j++) {
      if (input[j] === diff) {
        result = input[i] * input[j]
        break
      }
    }
  }
}

console.log(result)
