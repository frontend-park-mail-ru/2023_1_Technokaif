import { METHOD, MONTHS } from '@config/config';

/**
 * Return function to subscribe for unload event and call
 * @param onEventHandler when its happens
 * @param onRemoveHandler when remove element call this function
 * @return function to call when element removed from page
 * */
export function subscribeForUnload(
    onEventHandler: {():void},
    onRemoveHandler?:{():void},
): {():void} {
    window.addEventListener('beforeunload', onEventHandler);
    return () => {
        onRemoveHandler?.();
        window.removeEventListener('beforeunload', onEventHandler);
    };
}

/** Set value to element with classname "name" */
export function setElementsToInputOrDate(fieldsWithValue:[{name:string, value:string}]) {
    fieldsWithValue.forEach((el) => {
        const elementInDOM = document.querySelector(`.${el.name}`);
        if (elementInDOM instanceof HTMLInputElement
            || (elementInDOM instanceof HTMLSelectElement && MONTHS.includes(el.value))) {
            elementInDOM.value = el.value;
            elementInDOM.dispatchEvent(new Event(METHOD.CHANGE_FIELD_IMMEDIATELY));
        }
    });
}

/** Get value from element with classname "name" */
export function getValueFromInputOrDataElements(...classNames:string[]) {
    const saveArray: {name:string, value:string|null}[] = [];
    const pushToSaveArray = (classSearch:string) => {
        const field = document.querySelector(`.${classSearch}`);
        let fieldValue = '';
        if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement) {
            fieldValue = field.value;
        }
        saveArray.push({
            name: classSearch,
            value: fieldValue,
        });
    };

    classNames.forEach((name) => {
        pushToSaveArray(name);
    });
    return saveArray;
}
