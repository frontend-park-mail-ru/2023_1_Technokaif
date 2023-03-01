export function clearErrorsField (...params) {
    params.forEach((field) => {
        field.innerHTML = '';
    });
}
