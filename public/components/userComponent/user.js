import templateHtml from './user.handlebars';
import { Button } from '../Button/button';
import { Avatar } from '../avatar/avatar';
import { Form } from '../form/form';
import { dateSetup, sexSetup } from '../../utils/setup/registrationSetup';
import './user.less';

/**
 * Class for artists content in main page.
 * @constructor
 * @param {HTMLElement} parent - Element where to render.
 * @param {json} config - Config with json general fields.
 * @param {json} sexConf - Config with json fields for gender.
 * @param {json} dateConf - Config with json fields for date fields.
 */
export class User {
    #parent;

    #config;

    /**
     *
     * @param {HTMLElement} parent -- html element where User page will be placed
     * @param {Object} config -- config for User component
     */
    constructor(parent, config) {
        this.#parent = parent;
        this.#config = config;
    }

    /**
     *  @description render User in parent element
     */
    render() {
        const html = templateHtml(this.#config);
        this.#parent.innerHTML += html;

        const avatarPlacement = this.#parent.querySelector('.js__placement__avatar');
        const formsPlacement = this.#parent.querySelector('.js__placement__where__form');
        const buttonsPlacement = this.#parent.querySelector('.js__placement__buttons');

        const avatar = new Avatar(avatarPlacement, this.#config);
        avatar.render();

        const formLeft = new Form(formsPlacement, this.#config.leftForm, sexSetup(), dateSetup());
        formLeft.render();

        const formPassword = new Form(formsPlacement, this.#config.passwordForm);
        formPassword.render();

        const buttonCancel = new Button(buttonsPlacement, this.#config.buttons[0]);
        buttonCancel.appendElement();

        const buttonSubmit = new Button(buttonsPlacement, this.#config.buttons[1]);
        buttonSubmit.appendElement();
    }
}
