export function createLent (labelName, mainClass, className, labelClass, ...elements) {
    const div = document.createElement('div');
    addClass(div, mainClass);
    div.classList.add(mainClass);

    const label = document.createElement('p');
    label.textContent = labelName;
    addClass(label, labelClass);

    const divForLabel = document.createElement('div');
    divForLabel.appendChild(label);

    div.appendChild(divForLabel);
    div.appendChild(createTape(className, ...elements));

    return div;
}

function createTape (className, ...elements) {
    const div = document.createElement('div');
    div.classList.add(className);

    elements.forEach((elem) => {
        div.appendChild(elem);
    });

    return div;
}

export function createCoverForMusic (imgSrc, label, text, divClass = '', imgClass, nameClass, descClass, callback = null) {
    const div = document.createElement('div');
    addClass(div, divClass);

    const img = document.createElement('img');
    img.src = imgSrc;
    addClass(img, imgClass);

    const labelEl = document.createElement('p');
    labelEl.textContent = label;
    addClass(labelEl, nameClass);

    const textEl = document.createElement('p');
    textEl.textContent = text;
    addClass(textEl, descClass);

    div.appendChild(img);
    div.appendChild(labelEl);
    div.appendChild(textEl);

    if (callback) {
        div.addEventListener('click', callback);
    }

    return div;
}

function addClass (element, cl) {
    if (cl !== '') {
        element.classList.add(cl);
    }
}
