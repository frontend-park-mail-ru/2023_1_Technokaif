import { createCoverForMusic, createLent } from '../TrackTape/trackTape.js';

export function createContent (parent) {
    // const mainDiv = document.createElement('div');
    // mainDiv.classList.add('content');

    // todo ajax get
    // imitation of answer
    const resultFromAjax = {
        focus: [
            {
                title: 'label1',
                description: 'description1',
                imgSrc: '/static/img/peace.jpeg'
            },
            {
                title: 'label2',
                description: 'description2',
                imgSrc: '/static/img/peace.jpeg'
            },
            {
                title: 'label3',
                description: 'description3',
                imgSrc: '/static/img/peace.jpeg'
            }
        ],
        playlist: [
            {
                title: 'label1',
                description: 'description1',
                imgSrc: '/static/img/peace.jpeg'
            },
            {
                title: 'label2',
                description: 'description2',
                imgSrc: '/static/img/peace.jpeg'
            },
            {
                title: 'label3',
                description: 'description3',
                imgSrc: '/static/img/peace.jpeg'
            }
        ]
    };
    //

    // const keys = Object.keys(resultFromAjax);
    //
    // keys.forEach((key) => {
    //     const elements = [];
    //     resultFromAjax[key].forEach((el) => {
    //         const [label, desc, imgSrc] = el;
    //
    //         // todo use callback to analyze where to go
    //         // need url
    //         elements.push(createCoverForMusic(imgSrc, label, desc, '', '', '', ''));
    //     });
    //
    //     const tape = createLent(key, key + 'content', key + '-lent', '', ...elements);
    //     mainDiv.appendChild(tape);
    // });
    //
    // parent.appendChild(mainDiv);
    Handlebars.registerHelper('keys', function (obj) {
        return obj.keys;
    });
    Handlebars.registerHelper('values', function (obj) {
        return obj.values;
    });
    const element = document.getElementById('entry-template').innerHTML;
    const template = Handlebars.compile(element);
    console.log(template(resultFromAjax));
    parent.innerHTML += template(resultFromAjax);
    // Object.entries(resultFromAjax).map(([key, value]) => ({
    //     key,
    //     ...value
    // }) => {
    //     // div.innerHTML += `<p>${key}</p>`;
    //     // value.forEach(({ text, description, imgSrc }) => {
    //     //     div.innerHTML += `<img src="${imgSrc}" width="500" /><div>${text}</div><div>${description}</div>`;
    //     // });
    //
    //
    // });
}
