export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function filterBySearch(rows, getSearchTexts, query) {
  const needle = normalizeText(query);
  if (!needle) {
    return rows;
  }
  return rows.filter((row) =>
    getSearchTexts(row).some((text) => normalizeText(text).includes(needle)),
  );
}