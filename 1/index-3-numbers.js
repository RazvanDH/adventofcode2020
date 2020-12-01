// should be done recursively but ain't nobody got time for that

const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(n => +n)

let result
const SUM = 2020
const INPUT_LENGTH = input.length
const FIRST_PASS_LENGTH = INPUT_LENGTH - 3
const SECOND_PASS_LENGTH = INPUT_LENGTH - 2
const THIRD_PASS_LENGTH = INPUT_LENGTH - 1

for (let i = 0; i < FIRST_PASS_LENGTH ; i++) {
  if (result) { break }

  if (input[i] < SUM) {
    for (let j = i + 1; j < SECOND_PASS_LENGTH; j++) {
      if (result) { break }

      const diff = SUM - input[i] - input[j]

      if (diff < SUM) {
        for (let k = i + 2; k < THIRD_PASS_LENGTH; k++) {
          if (input[k] === diff) {
            result = input[i] * input[j] * input[k]
            break
          }
        }
      }
    }
  }
}

console.log(result)
