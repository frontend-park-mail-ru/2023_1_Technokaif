/**
 * Check for empty value or null value
 * @param value
 * @returns {boolean} - if value == '' it will return true
 */
export function checkForEmpty(value) {
    return value === '' || value?.length === 0;
}
