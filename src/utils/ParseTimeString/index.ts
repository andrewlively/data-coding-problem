const timeStringRegex = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/;

export const parseTimeString = (time: string): Date => {
  if (
    typeof time !== "string" ||
    !timeStringRegex.test(time)
  ) {
    throw new Error("Invalid time string provided");
  }

  const [hour, minute] = time.split(":").map(t => parseInt(t, 10));

  if (isNaN(hour) || isNaN(minute)) {
    throw new Error("Invalid time string provided");
  }

  const date = new Date();

  date.setHours(hour);
  date.setMinutes(minute);

  return date;
};
