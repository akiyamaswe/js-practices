#!/usr/bin/env node

const maxNumber = 20;

const fizzBuzzRules = [
  {
    condition: (num) => num % 3 === 0 && num % 5 === 0,
    output: "FizzBuzz",
  },
  {
    condition: (num) => num % 3 === 0,
    output: "Fizz",
  },
  {
    condition: (num) => num % 5 === 0,
    output: "Buzz",
  },
];

const convertToFizzBuzz = (number) =>
  fizzBuzzRules.find((rule) => rule.condition(number))?.output ??
  number.toString();

const numbers = [...Array(maxNumber)].map((_, index) => index + 1);
numbers.forEach((number) => console.log(convertToFizzBuzz(number)));
