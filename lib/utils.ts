export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export const formatSeconds = (value?: number) => {
  if (!value) {
    return null;
  }

  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  if (minutes === 0) {
    return `${seconds}s`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatLongDate = (value: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
  }).format(new Date(value));

export const isoDate = (date = new Date()) => date.toISOString().slice(0, 10);

export const average = (values: number[]) =>
  values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0;
