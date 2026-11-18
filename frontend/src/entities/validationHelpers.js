import { COLUMN_TYPES, DEFAULT_COLUMN_TYPE } from "../columns";

export function missingOptions(def, type, prefix) {
  const errors = (type.requires ?? [])
    .filter((option) => def[option] === undefined)
    .map((option) => `${prefix} necesita la opción "${option}"`);

  const oneOf = type.requiresOneOf;
  if (oneOf && oneOf.every((option) => def[option] === undefined)) {
    const list = oneOf.map((option) => `"${option}"`).join(" o ");
    errors.push(`${prefix} necesita la opción ${list}`);
  }

  return errors;
}

export function validateValueDefs(defs, where, byKey, checkDuplicates) {
  const errors = [];
  const seenFields = new Set();

  for (const def of defs) {
    const defWhere = `${where} "${def.field}"`;

    if (!def.field || !def.label) {
      errors.push(`${where} sin field o sin label`);
    }
    if (checkDuplicates && seenFields.has(def.field)) {
      errors.push(`${defWhere}: está repetida`);
    }
    seenFields.add(def.field);

    const typeName = def.type ?? DEFAULT_COLUMN_TYPE;
    const columnType = COLUMN_TYPES[typeName];
    if (!columnType) {
      errors.push(`${defWhere}: el tipo "${typeName}" no existe`);
      continue;
    }

    errors.push(...missingOptions(def, columnType, `${defWhere}: el tipo "${typeName}"`));
    errors.push(...(columnType.validate?.(def) ?? []).map((message) => `${defWhere}: ${message}`));

    const lookupKey = columnType.lookupEntity?.(def);
    if (lookupKey && !byKey.has(lookupKey)) {
      errors.push(`${defWhere}: la entidad "${lookupKey}" no existe`);
    }
  }

  return errors;
}