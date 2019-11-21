import { get as _get } from "lodash";

// sort array of objects by the specified keys in the specified order
function sortBy<T>(keys: string[], order: "asc" | "des" = "asc") {
  if (keys.length === 0) {
    throw new Error("sorting: no args passed");
  }
  return (a: T, b: T): number => {
    for (let i = 0; i < keys.length; i++) {
      const isLast = i === keys.length - 1;
      const key = keys[i];
      // lowercase the value if its type is string
      const [aValue, bValue] = [_get(a, key), _get(b, key)].map(value =>
        typeof value === "string" ? value.toLowerCase() : value
      );
      if (aValue === bValue && !isLast) {
        continue;
      }
      const result = aValue < bValue ? -1 : 1;
      return order === "asc" ? result : -result;
    }
    return 1; // makes compiler happy
  };
}

export default sortBy;
