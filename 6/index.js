const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n\n')

// task 1
const task1 = (input) => input.reduce((sum, group) => {
  const uniqueLetters = {}

  for(let i = 0; i < group.length; i++) {
    if (group[i] !== '\n' && !uniqueLetters[group[i]]) {
      uniqueLetters[group[i]] = group[i]
    }
  }

  return sum + Object.keys(uniqueLetters).length
}, 0)

// task 2
const task2 = (input) => input.reduce((sum, group) => {
  const splitGroup = group.split('\n').filter(w => w.length)
  const sortedByLength = splitGroup.sort((a, b) => a.length - b.length)

  const firstPerson = sortedByLength.shift()
  let commonAnswers = 0

  for(let i = 0; i < firstPerson.length; i++) {
    const notContaining = sortedByLength.filter(answers => !answers.includes(firstPerson[i]))

    if (!notContaining.length) {
      commonAnswers++
    }
  }

  return sum + commonAnswers
}, 0)


console.log(task1(input))
console.log(task2(input))
