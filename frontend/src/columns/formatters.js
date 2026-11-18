import { LOCALE_CONFIG } from "../config/locale";

const formatterCache = new Map();

function getFormatter(Formatter, options) {
  const cacheKey = `${Formatter.name}:${JSON.stringify(options)}`;
  if (!formatterCache.has(cacheKey)) {
    formatterCache.set(cacheKey, new Formatter(LOCALE_CONFIG.locale, options));
  }
  return formatterCache.get(cacheKey);
}

export function formatDate(value, column = {}) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  const options = LOCALE_CONFIG.dateFormats[column.format ?? "short"];
  return getFormatter(Intl.DateTimeFormat, { ...options, timeZone: "UTC" }).format(date);
}

export function formatCurrency(value, column = {}) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return String(value);
  }
  const options = {
    style: "currency",
    currency: LOCALE_CONFIG.currency,
    useGrouping: "always",
    ...(column.compact && {
      notation: "compact",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }),
  };
  return getFormatter(Intl.NumberFormat, options).format(number);
}

export function formatPercent(value, column = {}) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return String(value);
  }
  const ratio = column.fraction ? number : number / 100;
  const decimals = column.decimals ?? LOCALE_CONFIG.percentDecimals;
  return getFormatter(Intl.NumberFormat, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(ratio);
}

const TRUE_VALUES = new Set([true, 1, "1", "true", "si", "sí"]);
const FALSE_VALUES = new Set([false, 0, "0", "false", "no"]);

export function formatBoolean(value, column = {}) {
  const key = typeof value === "string" ? value.trim().toLowerCase() : value;
  const labels = { ...LOCALE_CONFIG.booleanLabels, ...column.labels };
  if (TRUE_VALUES.has(key)) {
    return labels.true;
  }
  if (FALSE_VALUES.has(key)) {
    return labels.false;
  }
  return String(value);
}