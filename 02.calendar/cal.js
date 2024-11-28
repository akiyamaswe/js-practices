#!/usr/bin/env node

import dayjs from "dayjs";
import minimist from "minimist";

const CALENDAR = {
  SATURDAY: 6,
  DATE_WIDTH: 2,
  MONTH_OFFSET: 1,
};

const generateCalendar = (year, month) => {
  const date = dayjs(`${year}-${month}-01`);
  const days = Array.from({ length: date.daysInMonth() }, (_, i) =>
    date.add(i, "day"),
  );

  let calendar = "   ".repeat(date.day());
  days.forEach((d, index) => {
    calendar += d.date().toString().padStart(CALENDAR.DATE_WIDTH);
    if (index < days.length - 1) {
      if (d.day() === CALENDAR.SATURDAY) {
        calendar += "\n";
      } else {
        calendar += " ";
      }
    }
  });

  const headerText = `      ${month}月 ${year}`;
  const weekdayLabels = "日 月 火 水 木 金 土";

  return [headerText, weekdayLabels, calendar].join("\n");
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
console.log(generateCalendar(year, month));
