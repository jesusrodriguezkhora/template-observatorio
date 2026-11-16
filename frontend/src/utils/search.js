export function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function filterBySearch(rows, fields, query) {
  const needle = normalizeText(query);
  if (!needle) {
    return rows;
  }
  return rows.filter((row) =>
    fields.some((field) => normalizeText(row[field]).includes(needle)),
  );
}