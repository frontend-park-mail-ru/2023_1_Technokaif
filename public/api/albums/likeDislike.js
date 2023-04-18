"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unLikeAlbum = exports.likeAlbum = void 0;
const Ajax_js_1 = __importDefault(require("../../modules/Ajax.js"));
const apiUrls_js_1 = require("../../utils/config/apiUrls.js");
const urlGenerators_1 = require("../../utils/functions/urlGenerators");
/**
 * Like album
 */
function likeAlbum(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${`${(0, urlGenerators_1.generatePageById)(apiUrls_js_1.apiUrl.LIKE_ALBUM, id)}like`}`;
        yield Ajax_js_1.default.post({
            url,
            reject: (message) => {
                console.error('Album request api error:', message);
            },
        });
    });
}
exports.likeAlbum = likeAlbum;
/**
 * Dislike album
 */
function unLikeAlbum(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${`${(0, urlGenerators_1.generatePageById)(apiUrls_js_1.apiUrl.UNLIKE_ALBUM, id)}unlike`}`;
        yield Ajax_js_1.default.post({
            url,
            reject: (message) => {
                console.error('Album request api error:', message);
            },
        });
    });
}
exports.unLikeAlbum = unLikeAlbum;
