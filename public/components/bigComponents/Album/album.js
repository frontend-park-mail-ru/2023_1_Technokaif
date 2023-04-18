"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Album_id;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Album = void 0;
const album_handlebars_1 = __importDefault(require("./album.handlebars"));
require("./album.less");
const line_1 = require("../../smallComponents/Line/line");
const componentsNames_1 = require("../../../utils/config/componentsNames");
const BaseComponent_1 = require("../../BaseComponent");
const EventTypes_1 = require("../../../utils/config/EventTypes");
const ContentStore_1 = __importDefault(require("../../../stores/ContentStore"));
const Actions_1 = __importDefault(require("../../../actions/Actions"));
const ApiActions_1 = __importDefault(require("../../../actions/ApiActions"));
const pageNames_1 = require("../../../utils/config/pageNames");
const artistSetup_1 = require("../../../utils/setup/artistSetup");
const SongStore_1 = __importDefault(require("../../../stores/SongStore"));
const setupLine_ts_1 = require("../../../utils/setup/setupLine.ts");
const pathConfig_1 = require("../../../utils/config/pathConfig");
/** Class for Album */
class Album extends BaseComponent_1.BaseComponent {
    /**
     * Create Album. Empty innerHtml before placement
     * @param {HTMLElement} parent -- where to place Album
     * @param {JSON} config
     */
    constructor(parent, config) {
        super(parent, config, album_handlebars_1.default, componentsNames_1.componentsNames.ALBUM);
        /** id of Album */
        _Album_id.set(this, void 0);
        this.parent = parent;
        this.lineConfigs = [];
        this.isPlaying = SongStore_1.default.isPlaying;
        this.isAlbumLoaded = false;
        this.firstPlay = false;
    }
    /**
     * Function to render track lines by input configs.
     */
    renderLines(tracks) {
        const linesPlacement = document.querySelector('.js__placement-tracks');
        let pos = 0;
        tracks.forEach((track) => {
            pos += 1;
            const line = new line_1.Line(linesPlacement, (0, setupLine_ts_1.setupLine)(track, pos));
            line.appendElement();
        });
    }
    /**
     * Function to subscribe to all events from Stores
     */
    addSubscribes() {
        ContentStore_1.default.subscribe(() => {
            const { id } = ContentStore_1.default.state[pageNames_1.pageNames.ALBUM];
            __classPrivateFieldSet(this, _Album_id, id, "f");
            const buttons = document.querySelector('.js__button__play');
            const imgLike = document.querySelector('.albumLike');
            if (!buttons || !imgLike) {
                console.warn('Button doesn\'t\'exist on Album');
                return;
            }
            this.playButton = buttons;
            imgLike.addEventListener('click', () => {
                const state = ContentStore_1.default.state.ALBUM;
                if (state.isLiked) {
                    imgLike.src = pathConfig_1.imgPath.notLiked;
                    ApiActions_1.default.unLikeAlbum(__classPrivateFieldGet(this, _Album_id, "f"));
                }
                else {
                    imgLike.src = pathConfig_1.imgPath.liked;
                    ApiActions_1.default.likeAlbum(__classPrivateFieldGet(this, _Album_id, "f"));
                }
                state.isLiked = !state.isLiked;
            });
            buttons.addEventListener('click', () => {
                this.firstPlay = true;
                if (!this.isAlbumLoaded) {
                    this.isAlbumLoaded = true;
                    Actions_1.default.playArtist(id);
                }
                if (!SongStore_1.default.isPlaying) {
                    Actions_1.default.createPlay(true);
                }
                else {
                    Actions_1.default.createPlay(false);
                }
            });
            if (id !== undefined) {
                ApiActions_1.default.getAlbum(id);
            }
        }, EventTypes_1.EventTypes.ID_CAN_BE_VIEWED, super.name);
        ContentStore_1.default.subscribe((instance) => {
            if (instance === 'tracks') {
                const { tracks } = ContentStore_1.default.state[pageNames_1.pageNames.ALBUM];
                this.lineConfigs.push((0, artistSetup_1.setupLineList)(tracks));
                this.renderLines(tracks);
            }
        }, EventTypes_1.EventTypes.ALBUM_CONTENT_DONE, super.name);
        ContentStore_1.default.subscribe(() => {
            const state = ContentStore_1.default.state.ALBUM;
            const img = document.querySelector('.album__img');
            const name = document.querySelector('.headerNameOfElementClass');
            const author = document.querySelector('.ArtistClass');
            const imgLike = document.querySelector('.albumLike');
            if (!img || !name || !author || !imgLike) {
                console.warn('Error at album. Doesnt have header');
                return;
            }
            img.src = `/static/img${state.cover}`;
            if (state.isLiked) {
                imgLike.src = pathConfig_1.imgPath.liked;
            }
            name.textContent = state.name;
            let artistsText = state.artists[0].name;
            if (state.artists.length > 2) {
                artistsText = state.artists.reduce((acc, value, index) => {
                    if (index !== state.artists.length) {
                        return `${acc} ${value.name},`;
                    }
                    return `${acc} ${value.name}`;
                });
            }
            author.textContent = artistsText;
        }, EventTypes_1.EventTypes.GOT_ONE_ALBUM, super.name);
        SongStore_1.default.subscribe(this.changeStatePlayer.bind(this), EventTypes_1.EventTypes.CHANGE_PLAY_STATE, componentsNames_1.componentsNames.ALBUM);
    }
    /** Change state of Play button */
    changeStatePlayer(newState) {
        if (this.firstPlay) {
            if (newState) {
                this.firstPlay = true;
                this.playButton.src = pathConfig_1.imgPath.pauseAlbum;
            }
            else {
                this.isPlaying = false;
                this.playButton.src = pathConfig_1.imgPath.playAlbum;
            }
        }
    }
    /**
     * @description render MainWindowContent in parent
     */
    render() {
        const renderProcess = new Promise((resolve) => {
            super.appendElement();
            resolve();
        });
        renderProcess.then(() => {
            this.addSubscribes();
            Actions_1.default.checkID(pageNames_1.pageNames.ALBUM);
        });
    }
}
exports.Album = Album;
_Album_id = new WeakMap();
