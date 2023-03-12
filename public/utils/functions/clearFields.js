/**
 *
 * @param  {...any} params -- elements to clear
 * @description clears all fields that given
 */
export function clearField(...params) {
    params.forEach((field) => {
        field.innerHTML = '';
    });
}
