import { BaseComponent } from '@components/BaseComponent';
import { imgPath } from '@config/pathConfig';
import { METHOD } from '@config/config';
import template from './notification.handlebars';
import './notification.less';

/** All variants of notifications */
export const TypeOfNotification = {
    success: 'success',
    failure: 'failure',
    warning: 'warning',
};

/** Text notification */
export class Notification extends BaseComponent {
    /** Name of notification */
    private readonly nameOfNotification;

    /** Where to render */
    private readonly parent;

    /** Parent where to render. Text to display. Name for js to search.
     * Element will have class 'js__notification-"name"'
     * Timer to remove notification 3.5s.
     */
    constructor(parent, textNotification = 'notifyText', name = 'notify', variant = TypeOfNotification.success) {
        let displayName;
        switch (variant) {
        case TypeOfNotification.failure:
            displayName = 'Failure!';
            break;
        case TypeOfNotification.warning:
            displayName = 'Warning!';
            break;
        default:
            displayName = 'Success!';
        }
        const setup = {
            name,
            textNotification,
            displayName,
            closeButtonSrc: imgPath.closeOppositeMain,
        };
        super(parent, setup, template);
        this.nameOfNotification = name;
        this.parent = parent;
    }

    /** Append element to parent */
    override appendElement() {
        super.appendElement();

        const clearNotification = () => {
            const element = document.querySelector(`.js__notification-${this.nameOfNotification}`);
            if (!element || !this.parent) return;

            this.parent.removeChild(element);
        };

        const closeButton = document.querySelector(`.js__notification-${this.nameOfNotification}__close-button`);
        if (!closeButton) return;
        closeButton.addEventListener(METHOD.BUTTON, clearNotification);

        setTimeout(clearNotification, 3500);
    }

    /** Get element in DOM */
    public get element() {
        return document.querySelector(`.js__notification-${this.nameOfNotification}`);
    }
}
