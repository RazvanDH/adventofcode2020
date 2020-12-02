const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n')

let task1 = 0
let task2 = 0

const interval = (number, lower, greater) => {
  if (lower <= number && number <= greater) {
    return true
  }

  return false
}

const occurences = (value, word) => {
  let count = 0;

  for (let i=0; i < word.length; i++) {
    if (value === word.charAt(i)) {
      ++count
    }
  }

  return count
}

const position = (range, value, word) => {
  if (
    (word.charAt(range[0] - 1) === value && word.charAt(range[1] - 1) !== value)
    || (word.charAt(range[0] - 1) !== value && word.charAt(range[1] - 1) === value)
  ) {
    return true
  }

  return false
}

const extractElements = (item) => {
  let [ range, value, pass ] = item.split(' ')

  range = range.split('-').map(n => +n)
  value = value.replace(':', '')

  return {range, value, pass}
}

input.map((item) => {
  if (!item) {
    return
  }

  const {range, value, pass} = extractElements(item)

  if (interval(occurences(value, pass), ...range)) {
    ++task1
  }

  if (position(range, value, pass)) {
    ++task2
  }
})


console.log('task 1:', task1)
console.log('task 2:', task2)
