import { getFragmentType } from "../fragments";

export function getVisibleFragments(widget, record, canAccess) {
  if (!canAccess(widget.roles)) {
    return [];
  }

  return widget.fragments
    .map((fragment, index) => ({ fragment, key: `${fragment.type}-${index}` }))
    .filter(({ fragment }) => {
      if (!canAccess(fragment.roles)) {
        return false;
      }
      if (fragment.hideIfEmpty) {
        return !getFragmentType(fragment.type).isEmpty?.(fragment, record);
      }
      return true;
    });
}