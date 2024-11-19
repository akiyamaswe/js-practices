#!/usr/bin/env node

const CONFIG = {
  maxNumber: 20,
  rules: [
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
  ],
};

const convertToFizzBuzz = (number) =>
  CONFIG.rules.find((rule) => rule.condition(number))?.output ||
  number.toString();

const numbers = [...Array(CONFIG.maxNumber)].map((_, index) => index + 1);
numbers.forEach((number) => console.log(convertToFizzBuzz(number)));
