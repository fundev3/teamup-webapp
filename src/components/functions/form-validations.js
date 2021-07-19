/**
 * Validate if the values is empty or null
 * @param value
 * @returns {boolean}
 */
export function IsEmpty(value) {
  return !value;
}

/**
 * If it doesn't have lessOrMore property return compare equals
 * @param value
 * @param length
 * @param lessOrMore
 * @returns {boolean}
 */
export function ValidateLength(value, length, lessOrMore) {
  const LENGTH = value.length;
  if (lessOrMore) {
    if (lessOrMore === "<") return LENGTH < length;
    if (lessOrMore === ">") return LENGTH > length;
  }
  return LENGTH === length;
}
