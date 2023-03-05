/**
 *
 * @param  {...any} params -- clears all fields that given
 */
export function clearField (...params) {
    params.forEach((field) => {
        field.innerHTML = '';
    });
}
