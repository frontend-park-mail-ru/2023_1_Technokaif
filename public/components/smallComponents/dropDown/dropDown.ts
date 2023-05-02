import templateHtml from './dropDown.handlebars';
import { BaseComponent } from '../../BaseComponent';
import { METHOD } from '../../../utils/config/config';
import './dropDown.less';

export interface DropDownSetup {
    mainDropDownDiv:string,
    dropdownName: string,
    dropdownTitleDiv: string,
    dropdownOptionsDiv: string,
}

export const DIRECTIONS_DROPDOWN = {
    UP: 'UP',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
};

/** Class for dropDown */
export class DropDown extends BaseComponent {
    /** Flag to see if base structure was rendered */
    private isRendered;

    /** Config to set up basic structure */
    private configDropDown:DropDownSetup;

    /** Listeners on window */
    private listeners;

    /** If need to go in specific direction */
    private readonly whereMustGo;

    /** Parent where render */
    private parent;

    /** Parent for render and config for base setup. Set whereToGo to render in this direction */
    constructor(parent, config, whereToGo = '') {
        super(parent, config, templateHtml, config.dropdownName);
        this.configDropDown = config;
        this.isRendered = false;
        this.listeners = [];
        this.whereMustGo = whereToGo;
        this.parent = parent;
    }

    /**
     * Append element to placement. If event and reaction not null then add listener on element.
     * @param placement will be checked for existence and transform to HTMLElement
     * @param element
     * @param event
     * @param reaction
     * @private
     */
    private addElement(
        placement:HTMLElement|Element|null,
        element:HTMLElement,
        event?:string,
        reaction?: ()=> void,
    ) {
        if (!placement || !(placement instanceof HTMLElement)) {
            return;
        }

        placement.appendChild(element);
        if (event && reaction) {
            element.addEventListener(event, reaction);
        }
    }

    /** Get title element of dropDown */
    get title() {
        return document.querySelector(`.js__${this.configDropDown.dropdownName}-title`);
    }

    /** Get options element of dropDown */
    get options() {
        return document.querySelector(`.js__${this.configDropDown.dropdownName}-options`);
    }

    /** Get all component */
    get menu() {
        return document.querySelector(`.js__dropdown-${this.configDropDown.dropdownName}`);
    }

    /**
     * Add element to Title of dropDown menu.
     * If event and reactions presented then set reaction on this element.
     * @param element
     * @param event
     * @param reaction
     */
    addTitleElement(element:HTMLElement, event?:string, reaction?: ()=> void) {
        if (!this.isRendered) this.render();
        const titlePlacement = this.title;
        this.addElement(titlePlacement, element, event, reaction);
        this.whereToRender();
    }

    /** Clear title element */
    clearTitleElement() {
        if (!this.title) return;
        this.title.innerHTML = '';
    }

    /**
     * Add element to Options of dropDown menu.
     * If event and reactions presented then set reaction on this element.
     * @param element
     * @param event
     * @param reaction
     */
    addOptionsElement(element:HTMLElement, event?:string, reaction?: ()=> void) {
        if (!this.isRendered) this.render();
        const optionsPlacement = this.options;
        this.addElement(optionsPlacement, element, event, reaction);
    }

    /** Show options of dropdown. Set css class 'dropdown-active' */
    showOptions() {
        const { menu } = this;
        if (!menu) {
            console.warn('DropDown doesn\'t exist');
            return;
        }
        menu.classList.add('dropdown-active');
    }

    /** Hide options of dropdown. Remove css class 'dropdown-active' */
    hideOptions() {
        const { menu } = this;
        if (!menu) {
            return;
        }
        menu.classList.remove('dropdown-active');
    }

    /** Add basic reactions to dropDown structure. React on click elsewhere */
    private addBasicReactions() {
        const { title } = this;
        const { options } = this;
        if (!title || !options) {
            console.warn('Title or options doesn\'t exist in page');
        }

        const allWindowReactionOnClick = (e:Event) => {
            if (!e.target || !(e.target instanceof Element)) {
                return;
            }

            const isDropDownTitle = e.target.closest(`.js__${this.configDropDown.dropdownName}-title`);
            if (!isDropDownTitle && e.target.closest(`.js__dropdown-${this.configDropDown.dropdownName}`) != null) return;

            const parentDropDowns: Element[] = [];
            let tmpElement = e.target.closest('.dropdown-menu');
            while (tmpElement) {
                parentDropDowns.push(tmpElement);
                const parent = tmpElement.parentNode;
                if (!parent || !(parent instanceof Element)) {
                    tmpElement = null;
                } else {
                    tmpElement = parent.closest('.dropdown-menu');
                }
            }
            let currentDropDown;
            if (isDropDownTitle) {
                currentDropDown = e.target.closest(`.js__dropdown-${this.configDropDown.dropdownName}`);
                const list = currentDropDown.classList;
                if (list.contains('dropdown-active')) {
                    list.remove('dropdown-active');
                } else {
                    list.add('dropdown-active');
                }
                parentDropDowns.push(currentDropDown);
            }

            document.querySelectorAll('.dropdown-active').forEach((dropDown) => {
                if (dropDown === currentDropDown || parentDropDowns.includes(dropDown)) return;
                dropDown.classList.remove('dropdown-active');
            });

            if (!parentDropDowns.find((dropDown) => dropDown === currentDropDown)) {
                this.hideOptions();
            }
        };

        window.addEventListener(METHOD.BUTTON, allWindowReactionOnClick);
        this.listeners.push({ event: METHOD.BUTTON, reaction: allWindowReactionOnClick });
    }

    /** Search for free space around and render there */
    searchForFreeSpace() {
        const element = this.options;
        if (!element || !(element instanceof HTMLElement)) {
            console.warn('Element doesn\'t exist');
            return DIRECTIONS_DROPDOWN.DOWN;
        }
        const boundingRect = element.getBoundingClientRect();
        const availableSpace = {
            top: boundingRect.top,
            right: window.innerWidth - boundingRect.left,
            bottom: window.innerHeight - boundingRect.bottom,
            left: boundingRect.left,
        };

        if (availableSpace.top > element.offsetHeight) {
            return DIRECTIONS_DROPDOWN.UP;
        }
        if (availableSpace.bottom > element.offsetHeight) {
            return DIRECTIONS_DROPDOWN.DOWN;
        }
        if (availableSpace.right > element.offsetWidth) {
            return DIRECTIONS_DROPDOWN.RIGHT;
        }
        if (availableSpace.left > element.offsetWidth) {
            return DIRECTIONS_DROPDOWN.LEFT;
        }
        return DIRECTIONS_DROPDOWN.DOWN;
    }

    /**
     * Watch where to render by free space or whereToGo in constructor.
     * Add css option to render options.<br>
     * If doesn't have any free space will render down by default.
     * <b>Watch only on window size! Occupied elements doesn't count.</b>
     */
    private whereToRender() {
        let whereRender = this.whereMustGo;
        if (whereRender === '') {
            whereRender = this.searchForFreeSpace();
        }
        const element = this.options;
        if (!element || !(element instanceof HTMLElement)) {
            return;
        }

        const { title } = this;
        if (!title || !(title instanceof HTMLElement)) {
            return;
        }

        element.style.maxWidth = `${title.offsetWidth}`;
        switch (whereRender) {
        case DIRECTIONS_DROPDOWN.DOWN:
            element.style.top = `${title.offsetHeight * 1.3}`;
            element.style.left = '0';
            element.style.transform = 'translateY(-1vh)';
            break;
        case DIRECTIONS_DROPDOWN.UP:
            // todo Change on bottom
            element.style.bottom = `-${element.offsetHeight * 1.3}`;
            element.style.left = '0';
            element.style.transform = 'translateY(-1vh)';
            break;
        case DIRECTIONS_DROPDOWN.LEFT:
            // todo Change on right
            element.style.top = '0';
            element.style.left = `-${element.offsetWidth}`;
            element.style.transform = 'translateX(0.5vw)';
            break;
        case DIRECTIONS_DROPDOWN.RIGHT:
            // todo Change on left
            element.style.top = '0';
            element.style.left = `${title.offsetWidth}`;
            // element.style.transform = 'translateX(0.5vw)';
            break;
        default:
            console.warn('Error at dropDown whereToRender', whereRender);
        }
    }

    /** Render base structure */
    override render() {
        const pr = new Promise((resolve) => {
            super.appendElement();
            this.isRendered = true;
            resolve('');
        });

        pr.then(() => {
            this.addBasicReactions();
            this.whereToRender();
        });
    }

    /** Delete children. Delete listeners of dropDown */
    public override unRender() {
        const { menu } = this;
        this.listeners.forEach((action) => {
            window.removeEventListener(action.event, action.reaction);
        });
        if (!menu || !this.parent || !(this.parent instanceof HTMLElement)) {
            return;
        }

        this.parent.removeChild(menu);
        super.unRender();
    }
}
