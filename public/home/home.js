'use strict'

export function renderHome(parent) {
    const home = document.createElement('div');

    Ajax.get({
        url: '/home/content',
        callback: (status, responseString) => {
            let isAuthorized = false;

            if (status === 200) {
                isAuthorized = true;
            }

            if (!isAuthorized) {
                alert('Нет авторизации!');

                renderUnAuthHome(parent);
                return;
            }

            const items = JSON.parse(responseString);

            if (items && Array.isArray(items)) {
                const div = document.createElement('div');
                home.appendChild(div);

                items.forEach(({text, description, imgSrc}) => {
                    div.innerHTML += `<img src="${imgSrc}" width="500" /><div>${text}</div><div>${description}</div>`;
                });
            }
        }
    })

    parent.appendChild(home);
}

function renderUnAuthHome(parent) {

}
