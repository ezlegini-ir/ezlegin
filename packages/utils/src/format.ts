import moment, { loadPersian } from "moment-jalaali";
import { formatDistance, differenceInHours, format } from "date-fns";

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = minutes / 60;
    const roundedHours = Math.round(hours * 2) / 2;

    return `${roundedHours} hrs`;
  }
}

export function formatDurationToWords(minutes: number): string {
  if (minutes < 60) {
    return `${persianNumbers[minutes]} Minutes`;
  } else {
    const hours = minutes / 60;
    const isHalf = hours % 1 !== 0;
    const fullHours = Math.floor(hours);

    if (isHalf) {
      return `${persianNumbers[fullHours]} و نیم ساعت`;
    } else {
      return `${persianNumbers[fullHours]} ساعت`;
    }
  }
}

//! --------------------------------------------------

export function formatPrice(
  price: number | undefined | null,
  options?: { noValuePlaceholder?: string; showNumber?: boolean }
) {
  if (!price)
    return options?.showNumber ? "$" + 0 : options?.noValuePlaceholder || "--";

  return "$" + price.toLocaleString("en-US");
}

//! --------------------------------------------------

export const formatNumber = (num: number) => {
  if (num < 1000) return num.toString();
  if (num < 1_000_000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  if (num < 1_000_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
};

export const formatPriceBy3Digits = (num: number) => {
  return num.toLocaleString("en-US");
};

//! --------------------------------------------------

// Load Persian locale settings once
loadPersian({ dialect: "persian-modern", usePersianDigits: true });

interface FormatDateOptions {
  withTime?: boolean;
  useMonthName?: boolean;
  format?: string;
}

export function formatJalaliDate(
  date: string | number | Date,
  options: FormatDateOptions = {}
): string {
  const { withTime = false, useMonthName = true, format } = options;

  let dateFormat = useMonthName ? "jDD jMMMM jYYYY" : "jYYYY/jMM/jDD";
  if (withTime) dateFormat += " - HH:mm";

  return moment(date).format(format || dateFormat);
}

//! --------------------------------------------------

export function smartformatJalaliDate(
  date: string | number | Date,
  options: FormatDateOptions = {}
): string {
  const now = moment();
  const input = moment(date);

  const diffInDays = now.diff(input, "days");

  if (diffInDays < 4) {
    return input.fromNow();
  } else {
    return formatJalaliDate(date, options);
  }
}

//! --------------------------------------------------

export const formatMiladiDate = (date: Date): string => {
  const hoursDiff = differenceInHours(new Date(), date);
  if (hoursDiff < 120) {
    return formatDistance(date, new Date(), { addSuffix: true });
  }

  return format(date, "yyyy/MM/dd - HH:mm");
};

const persianNumbers = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
  "twenty one",
  "twenty two",
  "twenty three",
  "twenty four",
  "twenty five",
  "twenty six",
  "twenty seven",
  "twenty eight",
  "twenty nine",
  "thirty",
  "thirty one",
  "thirty two",
  "thirty three",
  "thirty four",
  "thirty five",
  "thirty six",
  "thirty seven",
  "thirty eight",
  "thirty nine",
  "forty",
  "forty one",
  "forty two",
  "forty three",
  "forty four",
  "forty five",
  "forty six",
  "forty seven",
  "forty eight",
  "forty nine",
  "fifty",
  "fifty one",
  "fifty two",
  "fifty three",
  "fifty four",
  "fifty five",
  "fifty six",
  "fifty seven",
  "fifty eight",
  "fifty nine",
  "sixty",
  "sixty one",
  "sixty two",
  "sixty three",
  "sixty four",
  "sixty five",
  "sixty six",
  "sixty seven",
  "sixty eight",
  "sixty nine",
  "seventy",
  "seventy one",
  "seventy two",
  "seventy three",
  "seventy four",
  "seventy five",
  "seventy six",
  "seventy seven",
  "seventy eight",
  "seventy nine",
  "eighty",
  "eighty one",
  "eighty two",
  "eighty three",
  "eighty four",
  "eighty five",
  "eighty six",
  "eighty seven",
  "eighty eight",
  "eighty nine",
  "ninety",
  "ninety one",
  "ninety two",
  "ninety three",
  "ninety four",
  "ninety five",
  "ninety six",
  "ninety seven",
  "ninety eight",
  "ninety nine",
  "one hundred",
];
