#!/usr/bin/env node

import dayjs from "dayjs";
import minimist from "minimist";

const CALENDAR = {
  SATURDAY: 6,
  DATE_WIDTH: 2,
  MONTH_OFFSET: 1,
};

const generateCalendar = (year, month) => {
  const firstDayOfMonth = dayjs(`${year}-${month}-01`);
  const datesInMonth = Array.from(
    { length: firstDayOfMonth.daysInMonth() },
    (_, i) => firstDayOfMonth.add(i, "day"),
  );

  let dateRaws = "   ".repeat(firstDayOfMonth.day());
  datesInMonth.forEach((currentDate, index) => {
    dateRaws += currentDate.date().toString().padStart(CALENDAR.DATE_WIDTH);
    if (index < datesInMonth.length - 1) {
      if (currentDate.day() === CALENDAR.SATURDAY) {
        dateRaws += "\n";
      } else {
        dateRaws += " ";
      }
    }
  });

  const headerText = `      ${month}月 ${year}`;
  const weekdayLabels = "日 月 火 水 木 金 土";

  return [headerText, weekdayLabels, dateRaws].join("\n");
};

const parseArgs = () => {
  const now = dayjs();
  const argv = minimist(process.argv.slice(2), {
    alias: {
      y: "year",
      m: "month",
    },
  });

  const year = argv.year ?? argv._[0] ?? now.year();
  const month = argv.month ?? argv._[1] ?? now.month() + CALENDAR.MONTH_OFFSET;

  return { year, month };
};

const { year, month } = parseArgs();
console.log(generateCalendar(year, month));
