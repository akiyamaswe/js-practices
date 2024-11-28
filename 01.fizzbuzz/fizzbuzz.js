#!/usr/bin/env node

const maxNumber = 20;

const convertToFizzBuzz = (number) => {
  let result = "";
  if (number % 3 === 0) result += "Fizz";
  if (number % 5 === 0) result += "Buzz";
  return result || number.toString();
};

const numbers = [...Array(maxNumber)].map((_, index) => index + 1);
numbers.forEach((number) => {
  console.log(convertToFizzBuzz(number));
});
