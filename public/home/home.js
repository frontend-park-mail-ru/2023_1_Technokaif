'use strict'

export function renderHome(parent) {
    const home = document.createElement('div');
    Ajax.get({
        url: '/feed',
        callback: (status, responseString) => {
            let isAuthorized = false;

            if (status === 200) {
                isAuthorized = true;
            }

            if (!isAuthorized) {
                alert('Нет авторизации!');
                goToPage(config.login);
                return;
            }

            const images = JSON.parse(responseString);

            if (images && Array.isArray(images)) {
                const div = document.createElement('div');
                feedElement.appendChild(div);

                images.forEach(({src, likes}) => {
                    div.innerHTML += `<img src="${src}" width="500" /><div>${likes} лайков</div>`;
                });
            }
        }
    })

    parent.appendChild(home);
}
