#!/usr/bin/env node

import dayjs from "dayjs";

const CALENDAR_CONFIG = {
  MONTH: {
    OFFSET: 1,
  },
  WEEK: {
    SATURDAY: 6,
  },
  FORMAT: {
    DATE_WIDTH: 2,
  },
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
      currentDay.date().toString().padStart(CALENDAR_CONFIG.FORMAT.DATE_WIDTH) +
      " ";

    if (currentDay.day() === CALENDAR_CONFIG.WEEK.SATURDAY) {
      calendar += "\n";
    }
    currentDay = currentDay.add(1, "day");
  }

  return `${header}\n${calendar}`;
};

const main = () => {
  const [yearArg, monthArg] = process.argv.slice(2);
  const now = dayjs();

  const year = parseInt(yearArg) || now.year();
  const month =
    parseInt(monthArg) || now.month() + CALENDAR_CONFIG.MONTH.OFFSET;

  console.log(formatCalendar(year, month));
};

main();
