const timeDivisions: {
  amount: number;
  name: Intl.RelativeTimeFormatUnit;
}[] = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

export const formatRelativeTime = (date: Date) => {
  const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  let duration = (date.getTime() - new Date().getTime()) / 1000;

  for (let i = 0; i <= timeDivisions.length; i++) {
    const division = timeDivisions[i];
    if (Math.abs(duration) < division.amount) {
      return relativeTimeFormatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};
