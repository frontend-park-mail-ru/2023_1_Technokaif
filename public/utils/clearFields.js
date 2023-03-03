export function clearField (...params) {
    params.forEach((field) => {
        field.innerHTML = '';
    });
}
