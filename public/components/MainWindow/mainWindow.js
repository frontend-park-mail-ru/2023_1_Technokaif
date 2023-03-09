import { ArtistsComp } from '../ArtistsComp/ArtistsComp.js';
import { TracksComp } from '../TracksComp/TracksComp.js';
import { AlbumsComp } from '../AlbumsComp/AlbumsComp.js';
import { mainPageTemplate as templateHtml } from './mainWindow.hbs.js';
import { homeSetup } from '../../pages/home/homeSetup.js';
import { convertImgSrc } from '../../utils/functions/stringOperations.js';

/**
 *
 * @param {HTMLElement} parent -- where to place Home page
 * @param {*} items -- content of page
 */

export class MainWindowContent {
    #parent;

    #config;

    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    get config() {
        return this.#config;
    }

    render() {
        this.#parent.innerHTML = this.HTML();
        const insertBlock = this.#parent.querySelector('.main-page-window');
        insertBlock.innerHTML += this.#renderTracks();
        insertBlock.innerHTML += this.#renderArtists();
        insertBlock.innerHTML += this.#renderAlbums();
    }

    HTML(cfg = '') {
        // eslint-disable-next-line no-undef
        const template1 = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template1(this.#config);
        }

        return template1(cfg);
    }

    #renderTracks() {
        const tracks = new TracksComp(this.#parent, this.#config);
        return tracks.HTML(this.#config);
    }

    #renderArtists() {
        const artists = new ArtistsComp(this.#parent, this.#config);
        return artists.HTML(this.#config);
    }

    #renderAlbums() {
        const albums = new AlbumsComp(this.#parent, this.#config);
        return albums.HTML(this.#config);
    }
}

export function createHomePageContent(parent, items) {
    Handlebars.registerHelper('convert', function (options) {
        return convertImgSrc(options.fn(this));
    });

    const mainPage = new MainWindowContent(parent, homeSetup(items));
    mainPage.render();
}
