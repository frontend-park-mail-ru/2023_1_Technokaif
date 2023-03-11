import { ArtistsComp } from '../ArtistsComp/ArtistsComp.js';
import { TracksComp } from '../TracksComp/TracksComp.js';
import { AlbumsComp } from '../AlbumsComp/AlbumsComp.js';
import { mainPageTemplate as templateHtml } from './mainWindow.hbs.js';
import { homeSetup } from '../../pages/home/homeSetup.js';
import { convertImgSrc } from '../../utils/functions/stringOperations.js';

/**
 * Class for main page content
 * @param {HTMLElement} parent -- where to place Home page
 * @param {*} items -- content of page
 */
export class MainWindowContent {
    #parent;

    #config;

    /**
     * Create MainWindowContent component. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place MainWindowContent
     * @param {object} config -- what config use to compule template
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     * @description render MainWindowContent in parent
     */
    render() {
        this.#parent.innerHTML = this.HTML();
        const insertBlock = this.#parent.querySelector('.main-page-window');
        insertBlock.innerHTML += this.#renderTracks();
        insertBlock.innerHTML += this.#renderArtists();
        insertBlock.innerHTML += this.#renderAlbums();
    }

    /**
     * If cfg is given then return compiled template with cfg else with inner config
     * @param {object} cfg -- external configure object
     * @returns Html string of template to place
     */
    HTML(cfg = '') {
        const template1 = Handlebars.compile(templateHtml);
        if (cfg === '') {
            return template1(this.#config);
        }

        return template1(cfg);
    }

    /**
     * Render Tracks component
     * @returns html string
     */
    #renderTracks() {
        const tracks = new TracksComp(this.#parent, this.#config);
        return tracks.HTML(this.#config);
    }

    /**
     * Render Artists component
     * @returns html string
     */
    #renderArtists() {
        const artists = new ArtistsComp(this.#parent, this.#config);
        return artists.HTML(this.#config);
    }

    /**
     * Render Albums component
     * @returns html string
     */
    #renderAlbums() {
        const albums = new AlbumsComp(this.#parent, this.#config);
        return albums.HTML(this.#config);
    }
}

/**
 * Create HomePageContent
 * @param {HTMLElement} parent -- where to render
 * @param {Object} items -- what items to render
 */
export function createHomePageContent(parent, items) {
    Handlebars.registerHelper('convert', (options) => convertImgSrc(options.fn(this)));

    const mainPage = new MainWindowContent(parent, homeSetup(items));
    mainPage.render();
}
