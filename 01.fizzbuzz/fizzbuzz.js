#!/usr/bin/env node

const MAX_NUMBER = 20;

const convertToFizzBuzz = (number) => {
  let result = "";

  if (number % 3 === 0) {
    result += "Fizz";
  }

  if (number % 5 === 0) {
    result += "Buzz";
  }

  if (result === "") {
    result = number.toString();
  }

  return result;
};

const numbers = [...Array(MAX_NUMBER)].map((_, index) => index + 1);
numbers.forEach((number) => {
  console.log(convertToFizzBuzz(number));
});
