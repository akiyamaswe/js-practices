#!/usr/bin/env node

const CONFIG = {
  maxNumber: 20,
  rules: [
    { divisor: 15, output: "FizzBuzz" },
    { divisor: 3, output: "Fizz" },
    { divisor: 5, output: "Buzz" },
  ],
};

const convertToFizzBuzz = (count) =>
  CONFIG.rules.find((rule) => count % rule.divisor === 0)?.output ||
  count.toString();

const range = [...Array(CONFIG.maxNumber)].map((_, index) => index + 1);
range.forEach((count) => console.log(convertToFizzBuzz(count)));
