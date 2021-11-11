/**
 * Converts a json-like object into data compatible with "application/x-www-form-urlencoded" content-type
 * @param x
 * @returns string
 */
export const toFormData = (x: any) => {
  return Object.entries(x)
    .map(([key, value]) => `${key}=${encodeURIComponent(value.toString())}`)
    .join('&');
};
