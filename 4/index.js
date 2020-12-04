/*
DONE byr (Birth Year) - four digits; at least 1920 and at most 2002.
DONE iyr (Issue Year) - four digits; at least 2010 and at most 2020.
DONE eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
DONE hgt (Height) - a number followed by either cm or in:
  If cm, the number must be at least 150 and at most 193.
  If in, the number must be at least 59 and at most 76.
DONE hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
DONE ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
DONE pid (Passport ID) - a nine-digit number, including leading zeroes.
MEH cid (Country ID) - ignored, missing or not.
*/

const fs = require('fs')
const input = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'}).split('\n\n')

const MANDATORY_FIELDS = [ 'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid' ]
const NO_OF_MANDATORY_FIELDS = MANDATORY_FIELDS.length
const OPTIONAL_FIELD = 'cid'

const PID_REGEX = RegExp(/^(\d{9})$/)
const ECL_REGEX = RegExp(/^(amb|blu|brn|gry|grn|hzl|oth)$/)
const HCL_REGEX = RegExp(/^\#[0-9a-f]{6}$/)
const HGT_REGEX = RegExp(/^(\d{2,3})(cm|in)$/)

const formattedInput = input.map((item) => {
  let newItem = {}

  item.split(/\n|\s/g).forEach((field) => {
    const newField = field.split(':')

    newItem[newField[0]] = newField[1]
  })

  return newItem
})

const validateData = (input) => input.filter((item) => {
  const keys = Object.keys(item)
  const length = keys.length

  if (
    (length < NO_OF_MANDATORY_FIELDS)
    || (length === NO_OF_MANDATORY_FIELDS && keys.includes(OPTIONAL_FIELD))
  ) {
    return false
  }

  return true
})

const checkBoundries = (item, low, high) => {
  const number = Number.parseInt(item, 10)

  return low <= number && number <= high
}

const checkHeight = (height) => {
  const result = height.match(HGT_REGEX)

  if (!result) {
    return false
  }

  const heightValue = Number.parseInt(result[1], 10)
  const unit = result[2]

  if (
    (unit === 'cm' && (heightValue < 150 || 193 < heightValue))
    || (unit === 'in' && (heightValue < 59 || 76 < heightValue))
  ) {
    return false
  }

  return true
}

const complexValidateData = (input) => input.filter((item) => {
  const { byr, iyr, eyr, pid, ecl, hcl, hgt } = item

  if (
    !checkBoundries(byr, 1920, 2002)
    || !checkBoundries(iyr, 2010, 2020)
    || !checkBoundries(eyr, 2020, 2030)
    || !PID_REGEX.test(pid)
    || !ECL_REGEX.test(ecl)
    || !HCL_REGEX.test(hcl)
    || !checkHeight(hgt)
    ) {
      return false
    }

  return true
})

// task 1
const validDataTask1 = validateData(formattedInput)
console.log('task1:', validDataTask1.length)

// task 2
console.log('task2:', complexValidateData(validDataTask1).length)
