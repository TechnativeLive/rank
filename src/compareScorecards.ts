import get from "lodash.get";

export function compareScorecards(a: any, b: any, fields: string[]): boolean {
  // check we have something to compare by
  if (fields.length > 0) {
    // if current field is equal
    if (get(a, fields[0]) === get(b, fields[0])) {
      // if there are more fields to break ties on
      if (fields.length > 1) {
        // break ties on next field
        return compareScorecards(a, b, fields.slice(1));
      } else {
        // must be truly tied
        return true;
      }
    }
  }
  return false;
}
