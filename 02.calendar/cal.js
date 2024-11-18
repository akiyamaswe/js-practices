#!/usr/bin/env node

import dayjs from "dayjs";
import minimist from "minimist";

const CALENDAR = {
  SATURDAY: 6,
  DATE_WIDTH: 2,
  MONTH_OFFSET: 1,
};

const formatCalendar = (year, month) => {
  const header = `      ${month}月  ${year}\n日 月 火 水 木 金 土`;
  const startDate = dayjs(`${year}-${month}-01`);
  const endDate = startDate.endOf("month");

  let calendar = "";
  let currentDay = startDate;

  calendar += "   ".repeat(startDate.day());

  while (currentDay.isBefore(endDate) || currentDay.isSame(endDate)) {
    calendar +=
      currentDay.date().toString().padStart(CALENDAR.DATE_WIDTH) + " ";

    if (currentDay.day() === CALENDAR.SATURDAY) {
      calendar += "\n";
    }
    currentDay = currentDay.add(1, "day");
  }

  return `${header}\n${calendar}`;
};

const parseArgs = () => {
  const now = dayjs();
  const argv = minimist(process.argv.slice(2), {
    alias: {
      y: "year",
      m: "month",
    },
  });

  const year = argv.year || argv._[0] || now.year();
  const month = argv.month || argv._[1] || now.month() + CALENDAR.MONTH_OFFSET;

  return { year, month };
};

const { year, month } = parseArgs();
console.log(formatCalendar(year, month));
