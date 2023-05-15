/** Change string value to JSON value. If can't change then return null */
export function changerStringToJSON(value:string|null) {
    if (!value) return null;

    try {
        return JSON.parse(value);
    } catch (e) {
        return null;
    }
}

/** Get value and transform it to JSON. if value not json then return null */
export function getValueFromLocalStorage(name:string) {
    const valueInStore = localStorage.getItem(name);
    if (!valueInStore) return null;
    return changerStringToJSON(valueInStore);
}

/** Save value with name to localStorage */
export function saveValueToLocalStorage(name:string, value) {
    switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
        localStorage.setItem(name, String(value));
        break;
    case 'object':
        try {
            localStorage.setItem(name, JSON.stringify(value));
        } catch (e) {
            console.error(`Can't save value:${value} with name: ${name} to localStorage`);
        }
        break;
    default:
        console.error(`Can't save value:${value} with name: ${name} to localStorage`);
    }
}
