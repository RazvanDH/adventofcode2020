const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n').map(no => +no)

const INPUT_LENGTH = input.length
const PREAMBLE = 25

const checkXMASWeakness = (number, list) => {
  let isValid = false

  for (let i = list.length - 1; i >= 1; i-- ) {
    const firstNumber = list[i]

    for(let j = 0; j < i; j++) {
      const secondNumber = list[j]

      if (firstNumber + secondNumber === number) {
        isValid = true
        break
      }
    }

    if (isValid) {
      break
    }
  }

  return isValid
}


const task1 = (input) => {
  let result

  for (let i = PREAMBLE; i < INPUT_LENGTH; i++) {
    const subArray = input.slice(i - PREAMBLE, i)
    const isValid = checkXMASWeakness(input[i], subArray)

    if (!isValid) {
      result = {
        number: input[i],
        position: i,
      }
    }
  }

  return result
}

const { number, position } = task1(input)

const chainSum = (input, number, index, sum, values ) => {
  const newSum = sum + input[index]
  const newValues = [...values, input[index]]

  if (newSum === number) {
    return newValues
  } else if (newSum < number && input[index + 1]) {
    return chainSum(input, number, index + 1, newSum, newValues)
  }

  return false
}

const sumTheExtremes = (list) => {
  if (list.length && list.length > 1) {
    const sortedList = list.sort((a,b) => a - b)

    return sortedList[0] + sortedList[list.length - 1]
  }

  return list
}


const task2 = (input, number, position) => {
  let result = false

  for(i = 0; i < position - 1; i++) {
    result = chainSum(input, number, i, 0, [])

    if (result) {
      break
    }
  }

  return sumTheExtremes(result)
}

console.log('task1:', number)
console.log('task2:', task2(input, number, position))
