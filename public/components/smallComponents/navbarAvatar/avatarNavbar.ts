import { BaseComponent } from '@components/BaseComponent';
import API from '@store/API';
import { EventTypes } from '@config/EventTypes';
import UserActions from '@API/UserActions';
import templateHTML from './avatarNavbar.handlebars';
import './avatarNavbar.less';

/** Setup class for avatar in navbar */
export interface AvatarSetup {
    mainDiv: string,
    imgDiv: string,
    imgSrc: string,
    imgClass: string,
    textDiv: string,
    textClass: string,
    text: string,
}

/**
 * Create element with track-oriented line with img, title, duration, optionally (listens).
 */
export class AvatarNavbar extends BaseComponent {
    /**
     * Create Line component.
     * @param {HTMLElement} parent - place where to render
     * @param {JSON} config - to template
     */
    constructor(parent, config:AvatarSetup) {
        super(parent, config, templateHTML, 'avatar navbar');
    }

    /** subscribe for store */
    private subscribe() {
        API.subscribe(
            () => {
                setTimeout(() => {
                    UserActions.user(localStorage.getItem('userId'));
                }, 2000);
            },
            EventTypes.UPDATE_DATA_WITH_AVATAR_RECEIVED,
            this.name,
        );
    }

    /** append element to parent */
    override appendElement() {
        super.appendElement();
        this.subscribe();
    }
}
