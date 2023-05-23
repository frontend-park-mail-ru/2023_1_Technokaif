import { METHOD } from '@config/config';
import { BaseComponent } from '@components/BaseComponent';
import { runAfterFramePaint } from '@functions/renderAfterPaintDone';
import { mainTrigger } from './triggerMain';
import templateHtml from './dropDown.handlebars';
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

    private maxWidth;

    /** Config to set up basic structure */
    private configDropDown:DropDownSetup;

    /** Listeners on window */
    private listeners;

    /** If need to go in specific direction */
    private readonly whereMustGo;

    /** Parent for render and config for base setup. Set whereToGo to render in this direction */
    constructor(parent, config, whereToGo = '') {
        super(parent, config, templateHtml, config.dropdownName);
        this.configDropDown = config;
        this.isRendered = false;
        this.listeners = [];
        this.whereMustGo = whereToGo;
        this.parent.classList.add('dropdown-title');
        this.maxWidth = 0;
        this.parent.classList.add(`js__${this.configDropDown.dropdownName}-title`);
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
            console.warn('Placement doesn\'t exist');
            return;
        }

        placement.appendChild(element);
        if (event && reaction) {
            element.addEventListener(event, reaction);
        }
    }

    /** Get class name */
    get nameClass() {
        return `js__${this.configDropDown.dropdownName}-title`;
    }

    /** Get title element of dropDown */
    get title() {
        return this.parent;
    }

    /** Get options element of dropDown */
    get options() {
        return document.querySelector(`.js__${this.configDropDown.dropdownName}-options`);
    }

    /**
     * Add element to Options of dropDown menu.
     * If event and reactions presented then set reaction on this element.
     */
    addOptionsElement(element:HTMLElement, eventTrigger?:string, reaction?: (event?:Event)=> void) {
        if (!this.isRendered) this.render();
        const optionsPlacement = this.options;
        this.addElement(optionsPlacement, element, eventTrigger, reaction);
        this.whereToRender();
    }

    /** Show options of dropdown. Set css class 'dropdown-active' */
    showOptions() {
        const { title } = this;
        if (!title) {
            console.warn('DropDown doesn\'t exist');
            return;
        }
        title.classList.add('dropdown-active');
    }

    /** Hide options of dropdown. Remove css class 'dropdown-active' */
    hideOptions() {
        const { title } = this;
        if (!title) {
            return;
        }
        title.classList.remove('dropdown-active');
    }

    /** Toggle between show and hide */
    toggleOptions() {
        const list = this.title.classList;
        if (list.contains('dropdown-active')) {
            list.remove('dropdown-active');
        } else {
            list.add('dropdown-active');
        }
    }

    /** Add basic reactions to dropDown structure. React on click elsewhere */
    private addBasicReactions() {
        const { title } = this;
        const { options } = this;
        if (!title || !options) {
            console.warn('Title or options doesn\'t exist in page');
        }

        title.addEventListener(METHOD.HIDE, () => this.hideOptions());
        title.addEventListener(METHOD.SHOW, () => this.showOptions());
        title.addEventListener(METHOD.TOGGLE, () => this.toggleOptions());

        window.removeEventListener(METHOD.BUTTON, mainTrigger);
        window.addEventListener(METHOD.BUTTON, mainTrigger);

        let timer;
        const resizeDropDown = () => {
            if (!this.options) {
                window.removeEventListener('resize', resizeDropDown);
            }

            clearTimeout(timer);
            timer = setTimeout(this.whereToRender.bind(this), 100);
        };
        window.addEventListener('resize', resizeDropDown);
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
        runAfterFramePaint(() => {
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

            if (element.offsetWidth > this.maxWidth) {
                this.maxWidth = element.offsetWidth;
            }

            const padding = 5;
            switch (whereRender) {
            case DIRECTIONS_DROPDOWN.DOWN:
                element.style.top = `${title.offsetHeight + padding}`;
                element.style.left = '0';
                break;
            case DIRECTIONS_DROPDOWN.UP:
                element.style.top = `-${element.offsetHeight + padding}`;
                element.style.left = '0';
                break;
            case DIRECTIONS_DROPDOWN.LEFT:
                element.style.top = `-${padding}`;
                element.style.left = `-${this.maxWidth + padding}`;
                break;
            case DIRECTIONS_DROPDOWN.RIGHT:
                element.style.top = `-${padding}`;
                element.style.left = `${this.maxWidth + padding}`;
                break;
            default:
                console.warn('Error at dropDown whereToRender', whereRender);
            }
            if (title.offsetWidth <= 200 && this.maxWidth < 200) {
                if (title.offsetWidth < this.maxWidth) {
                    element.style.width = this.maxWidth;
                } else {
                // @ts-ignore
                    element.style.width = title.offsetWidth;
                }
            }
            setTimeout(this.whereToRender, 100);
        });
    }

    /** Render base structure */
    override render() {
        super.appendElement();

        this.parent.classList.add(`js__${this.configDropDown.dropdownName}-title`);
        this.isRendered = true;

        runAfterFramePaint(() => {
            this.addBasicReactions();
            this.whereToRender();
        });
    }

    /** Delete children. Delete listeners of dropDown */
    public override unRender() {
        const { title } = this;
        this.listeners.forEach((action) => {
            window.removeEventListener(action.event, action.reaction);
        });
        if (!title || !this.parent || !(this.parent instanceof HTMLElement)) {
            return;
        }

        super.unRender();
    }
}
