import { METHOD } from '../../../utils/config/config';

/** Check for dropDowns. Hide if click elsewhere. Open if click on dropdown. */
export function mainTrigger(e) {
    if (!e.target || !(e.target instanceof Element)) {
        console.warn('Event target not found', e);
        return;
    }
    // maybe do sub title element
    const element = e.target;
    const dropDowns = document.querySelectorAll('.dropdown-title');
    if (!(element.closest('.dropdown-title'))) {
        dropDowns.forEach((dropDown) => {
            dropDown.dispatchEvent(new Event(METHOD.HIDE));
        }); return;
    }

    // element is inside dropdown
    let isDropDownTitle = false;
    if (element.classList.contains('dropdown-title')
        || element.classList.contains('dropdown-sub-title')) {
        isDropDownTitle = true;
    }

    if (!isDropDownTitle && element.closest('.dropdown-title') !== null) {
        return;
    }

    const parentDropDowns: Element[] = [];
    let tmpElement = element.closest('.dropdown-title');
    while (tmpElement) {
        parentDropDowns.push(tmpElement);
        const parent = tmpElement.parentNode;
        if (!parent || !(parent instanceof Element)) {
            tmpElement = null;
        } else {
            tmpElement = parent.closest('.dropdown-title');
        }
    }
    let currentDropDown;
    if (isDropDownTitle) {
        for (let i = 0; i < dropDowns.length; i++) {
            const elementTitle = element.closest('.dropdown-title');
            if (dropDowns[i] === elementTitle) {
                currentDropDown = elementTitle;
            }
        }

        const list = currentDropDown.classList;
        if (list.contains('dropdown-active')) {
            list.remove('dropdown-active');
        } else {
            list.add('dropdown-active');
        }
        parentDropDowns.push(currentDropDown);
    }

    document.querySelectorAll('.dropdown-active').forEach((dropDown) => {
        if (dropDown === currentDropDown || parentDropDowns.includes(dropDown)) return;
        dropDown.classList.remove('dropdown-active');
    });

    if (!parentDropDowns.find((dropDown) => dropDown === currentDropDown)) {
        currentDropDown.dispatchEvent(new Event(METHOD.HIDE));
    }
}
