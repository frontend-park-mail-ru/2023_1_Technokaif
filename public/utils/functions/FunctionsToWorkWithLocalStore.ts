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

type StorageValues = 'session' | 'local';

/** Get value from storage return json */
export function getValueFromStorage(storage:StorageValues, name:string) {
    switch (storage) {
    case 'local':
        return getValueFromLocalStorage(name);
    case 'session':
        return changerStringToJSON(sessionStorage.getItem(name));
    default:
        console.error('Error at getting value. Unexpected storage:', storage);
    }
}

/** return string to save */
function returnStringToSave(value) {
    switch (typeof value) {
    case 'string':
    case 'number':
    case 'boolean':
        return String(value);
    case 'object':
        try {
            return JSON.stringify(value);
        } catch (e) {
            console.error(`Can't resolve value:${value} to string`);
        }
        break;
    default:
        console.error(`Can't save value:${value} with name: ${name} to localStorage`);
    }
    return '';
}

/** Save value with name to localStorage */
export function saveValueToLocalStorage(name:string, value) {
    localStorage.setItem(name, returnStringToSave(value));
}

/** Save value to storage */
export function saveValueToStorage(storage: StorageValues, name:string, value) {
    switch (storage) {
    case 'local':
        saveValueToLocalStorage(name, value);
        break;
    case 'session':
        sessionStorage.setItem(name, returnStringToSave(value));
        break;
    default:
        console.error('Error at setting value. Unexpected storage:', storage);
    }
}
