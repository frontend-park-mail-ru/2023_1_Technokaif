import { createCoverForMusic, createLent } from '../TrackTape/trackTape.js';

export function createContent (parent) {
    const mainDiv = document.createElement('div');
    mainDiv.classList.add('content');

    // todo ajax get
    // imitation of answer
    const resultFromAjax = {
        focus: [['label1', 'description1', 'img1'],
            ['label2', 'description2', 'img2'],
            ['label3', 'description3', 'img3']
        ],
        playlist: [['label1', 'description1', 'img1'],
            ['label2', 'description2', 'img2'],
            ['label3', 'description3', 'img3'],
            ['label4', 'description4', 'img4']
        ]
    };
    //

    const keys = Object.keys(resultFromAjax);

    keys.forEach((key) => {
        const elements = [];
        resultFromAjax[key].forEach((el) => {
            const [label, desc, imgSrc] = el;

            // todo use callback to analyze where to go
            // need url
            elements.push(createCoverForMusic(imgSrc, label, desc, '', '', '', ''));
        });

        const tape = createLent(key, key + 'content', key + '-lent', '', ...elements);
        mainDiv.appendChild(tape);
    });

    parent.appendChild(mainDiv);
}
