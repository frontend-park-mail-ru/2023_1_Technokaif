'use strict';

import { createHomePageContent } from '../../components/MainWindowRender/mainWindow.js';

export function renderHome (parent) {
    // window.Ajax.get({
    //     url: '/feed',
    //     callback: (status, responseString) => {
    //         // let isAuthorized = false;
    //         //
    //         // if (status === 200) {
    //         //     isAuthorized = true;
    //         // }
    //         //
    //         // const items = JSON.parse(responseString);
    //
    //         // createContent(parent);
    //
    //         // if (items && Array.isArray(items)) {
    //         //     const div = document.createElement('div');
    //         //     home.appendChild(div);
    //         //
    //         //     Object.entries(items).map(([key, value]) => ({
    //         //         key,
    //         //         ...value
    //         //     }) => {
    //         //         div.innerHTML += `<p>${key}</p>`;
    //         //         value.forEach(({ text, description, imgSrc }) => {
    //         //             div.innerHTML += `<img src="${imgSrc}" width="500" /><div>${text}</div><div>${description}</div>`;
    //         //         });
    //         //     });
    //         // }
    //     }
    // });

    createHomePageContent(parent);
}

function renderUnAuthHome (parent) {

}
