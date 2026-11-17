export function getBrowserPath(key) {
  return `/${key}`;
}

export function getDetailPath(key, id) {
  return `/${key}/${id}`;
}

export function getFallbackPath(entity, record) {
  if (entity.parent && record) {
    return getDetailPath(entity.parent.entity, record[entity.parent.field]);
  }
  if (entity.browser) {
    return getBrowserPath(entity.key);
  }
  return "/";
}