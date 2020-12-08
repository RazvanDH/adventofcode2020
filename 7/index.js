const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n')

const dataInput = input.reduce((formatted, rule) => {
  if (!rule.length) {
    return formatted
  }

  const [key, stringValue] = rule.split(' bags contain ')
  const extractedValue = stringValue.split(', ').map((bagRule => {
    if (bagRule === 'no other bags.') {
      return
    }

    const [number, ...type] = bagRule.replace(/ bags?.?/, '').split(' ')
    const stringType = type.join(' ')

    return {
      [stringType]: +number
    }
  }))

  const formattedValue = extractedValue.reduce((obj, item) => ({...item, ...obj}), {})


  return { [key]: formattedValue, ...formatted}
}, {})


const task1 = (input) => {
  const holdingShinyGoldBags = [ 'shiny gold' ]

  for(let i = 0; i < holdingShinyGoldBags.length; i++) {
    const bagColor = holdingShinyGoldBags[i]

    // track bags that contain shiny gold bags or bags that previously contained shiny gold
    for (const bag in input) {
      if (input[bag][bagColor] && !holdingShinyGoldBags.includes(bag)) {
        holdingShinyGoldBags.push(bag)
      }
    }
  }

  return holdingShinyGoldBags.length - 1
}

const task2 = bag => {
  const bags = dataInput[bag]
  const bagsColors = Object.keys(bags)
  let sum = 0

  if (!bagsColors.length) {
    return 0
  }

  for(const bag in bags) {
    sum = sum + bags[bag] + bags[bag] * task2(bag)
  }

  return sum
}

console.log('task1:', task1(dataInput))
console.log('task2:', task2('shiny gold'))
