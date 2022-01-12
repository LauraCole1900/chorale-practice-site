import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

const formatTime = (time) => {
  let formattedTime = "";
  const timeArr = time.split(" ");
  const filteredArr = timeArr.filter(time => (time.includes(":") || time.includes("am") || time.includes("pm")));
  if (filteredArr.length) {
    const splitFiltered = filteredArr.map(time => time.split("-")).flat();
    const addMins = splitFiltered.map(time => time.indexOf(":") === -1 ? (time.indexOf("m") > -1 || time.indexOf("M") > -1 ? `${time.slice(0, -2)}:00${time.slice(-2)}` : `${time}:00`) : time);
    const findMeridiem = addMins.map(time => time.slice(-2));
    if (!["am", "pm"].includes(findMeridiem[0])) {
      formattedTime = `${addMins[0]}${findMeridiem[1]}`
    } else {
      formattedTime = addMins[0];
    }
  }
  return formattedTime;
};

export const timeToCurtain = (date, time) => {
  const formattedTime = formatTime(time);
  const dayjsDate = dayjs(`${date} ${formattedTime}`, "M-D-YYYY h:mma");
  const counter = dayjs(dayjsDate, "M-D-YYYY h:mm a").fromNow();
  return counter;
};