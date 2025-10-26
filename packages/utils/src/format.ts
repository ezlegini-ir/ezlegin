import { differenceInHours, format, formatDistance } from "date-fns";

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = minutes / 60;
    const roundedHours = Math.round(hours * 2) / 2;

    return `${roundedHours} hrs`;
  }
}

//! --------------------------------------------------

export function formatPrice(
  price: number | undefined | null,
  options?: { noValuePlaceholder?: string; showNumber?: boolean }
) {
  if (!price)
    return options?.showNumber ? "€" + 0 : options?.noValuePlaceholder || "--";

  return "€" + price.toFixed(1);
}

//! --------------------------------------------------

export const formatNumber = (num: number) => {
  if (num < 1000) return num.toString();
  if (num < 1_000_000) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  if (num < 1_000_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
};

//! --------------------------------------------------

export const formatMiladiDate = (date: Date): string => {
  const hoursDiff = differenceInHours(new Date(), date);
  if (hoursDiff < 120) {
    return formatDistance(date, new Date(), { addSuffix: true });
  }

  return format(date, "yyyy/MM/dd - HH:mm");
};
