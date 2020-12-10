const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(command => {
  const [instruction, value] = command.split(' ')

  return { instruction, value }
})

const INPUT_LENGTH = Object.keys(input).length

const calculateAcc = (mutatedInput, sum, index) => {
    if (index === INPUT_LENGTH) {
      return {
        done: true,
        sum,
      }
    }

  const { instruction, value, dirty } = mutatedInput[index]

  if (dirty) {
    return {
      done: false,
      sum,
    }
  }

  mutatedInput[index].dirty = true

  switch (instruction) {
    case 'jmp':
      return calculateAcc(mutatedInput, sum, index + (+value))
    case 'acc':
      return calculateAcc(mutatedInput, sum + (+value), index + 1)
    default:
      return calculateAcc(mutatedInput, sum, index + 1)
  }
}

const attemptFix = (mutatedInput, index) => {
  const { instruction } = mutatedInput[index]
  let hasMutated = false

  switch (instruction) {
    case 'jmp':
      mutatedInput[index].instruction = 'nop'
      hasMutated = true
      break
    case 'nop':
      mutatedInput[index].instruction = 'jmp'
      hasMutated = true
      break
    default:
  }

  return {
    hasMutated,
    mutatedInput
  }
}

const task1 = (input) => {
  const mutatedInput = JSON.parse(JSON.stringify(input))
  const { sum } = calculateAcc(mutatedInput, 0, 0)

  return sum
}

const task2 = (input) => {
  let finalResult

  for (let i = 0; i < INPUT_LENGTH; i++) {
    let { hasMutated, mutatedInput } = attemptFix(JSON.parse(JSON.stringify(input)), i)

    if (hasMutated) {
      const { sum, done } = calculateAcc(mutatedInput, 0, 0)

      if (done) {
        finalResult = sum
        break
      }
    }
  }

  return finalResult
}

console.log('task1:', task1(input))
console.log('task2:', task2(input))
