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

const TimerTime = 30;
const MobileWindowBottom = 72 + 66 + 5;
const DescktopWindowBottom = 72;

/** Class for dropDown */
export class DropDown extends BaseComponent {
    /** Flag to see if base structure was rendered */
    private isRendered;

    /** max width of element inside options */
    private maxWidth;

    private timerForOptionsWidth;

    private timerForBeyond;

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

        clearTimeout(this.timerForOptionsWidth);
        this.timerForOptionsWidth = setTimeout(this.changeWidth.bind(this), TimerTime);
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
            timer = setTimeout(this.whereToRender.bind(this), TimerTime);
        };
        window.addEventListener('resize', resizeDropDown);

        // todo magic
        this.title?.addEventListener(METHOD.BUTTON, () => { this.whereToRender(); });
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

    /** checks for size. If go beyond borders of screen then it will cling to border */
    private checkForBeyond() {
        runAfterFramePaint(() => {
            const boundRectangle = this.title?.getBoundingClientRect();
            if (!boundRectangle) return;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const bottomSize = windowWidth > 1220 ? DescktopWindowBottom : MobileWindowBottom;

            if (!this.options) return;
            const element = (this.options as HTMLElement);
            const widthOfElement = element.offsetWidth;
            const heightOfElement = element.offsetHeight;

            const distanceTop = boundRectangle.top;
            const distanceRight = windowWidth - boundRectangle.right;
            const distanceBottom = windowHeight - boundRectangle.bottom;
            const distanceLeft = boundRectangle.left;

            const heightFree = distanceBottom + boundRectangle.height - bottomSize;
            switch (this.whereMustGo) {
            case DIRECTIONS_DROPDOWN.LEFT:
                if (widthOfElement > distanceLeft) {
                    element.style.left = `-${distanceLeft}`;
                }

                if (heightOfElement > heightFree) {
                    element.style.top = `-${heightOfElement - heightFree}`;
                }
                break;
            case DIRECTIONS_DROPDOWN.DOWN:
                if (widthOfElement > distanceLeft) {
                    element.style.left = `-${distanceLeft}`;
                }

                if (heightOfElement > heightFree) {
                    element.style.top = `-${heightOfElement - heightFree}`;
                }
                break;
            case DIRECTIONS_DROPDOWN.UP:
                if (widthOfElement > distanceLeft) {
                    element.style.left = `-${distanceLeft}`;
                }

                if (heightOfElement > distanceTop) {
                    element.style.top = `${heightOfElement - distanceTop}`;
                }
                break;
            case DIRECTIONS_DROPDOWN.RIGHT:
                if (widthOfElement > distanceRight) {
                    element.style.left = `-${distanceRight + boundRectangle.width - distanceRight}`;
                }

                if (heightOfElement > heightFree) {
                    element.style.top = `-${heightOfElement - heightFree}`;
                }
                break;
            default:
                console.warn('Nowhere to go');
            }
        });
    }

    /**
     * Watch where to render by free space or whereToGo in constructor.
     * Add css option to render options.<br>
     * If doesn't have any free space will render down by default.
     * <b>Watch only on window size! Occupied elements doesn't count.</b>
     */
    private whereToRender(notWaitingPaint?:boolean) {
        const functionOfRendering = () => {
            let whereRender = this.whereMustGo;
            if (whereRender === '') {
                whereRender = this.searchForFreeSpace();
            }
            const optionsDropDown = this.options;
            if (!optionsDropDown || !(optionsDropDown instanceof HTMLElement)) {
                return;
            }
            const { title } = this;
            if (!title || !(title instanceof HTMLElement)) {
                return;
            }

            if (optionsDropDown.offsetWidth > this.maxWidth) {
                this.maxWidth = optionsDropDown.offsetWidth;
            }

            switch (whereRender) {
            case DIRECTIONS_DROPDOWN.DOWN:
                optionsDropDown.style.top = `${title.offsetHeight}`;
                optionsDropDown.style.left = '0';
                break;
            case DIRECTIONS_DROPDOWN.UP:
                optionsDropDown.style.top = `-${optionsDropDown.offsetHeight}`;
                optionsDropDown.style.left = '0';
                break;
            case DIRECTIONS_DROPDOWN.LEFT:
                optionsDropDown.style.top = '0';
                optionsDropDown.style.left = `-${this.maxWidth}`;
                break;
            case DIRECTIONS_DROPDOWN.RIGHT:
                optionsDropDown.style.top = '0';
                optionsDropDown.style.left = `${this.maxWidth}`;
                break;
            default:
                console.warn('Error at dropDown whereToRender', whereRender);
            }

            clearTimeout(this.timerForBeyond);
            this.timerForBeyond = setTimeout(() => { this.checkForBeyond(); }, TimerTime);
        };
        if (!notWaitingPaint) {
            runAfterFramePaint(functionOfRendering);
        } else {
            functionOfRendering();
        }
    }

    /** Render base structure */
    override render() {
        super.appendElement();

        this.parent.classList.add(`js__${this.configDropDown.dropdownName}-title`);
        this.isRendered = true;

        runAfterFramePaint(() => {
            this.addBasicReactions();
        });
    }

    /** get maximum width of all elements inside options */
    private getMaxValue() {
        let localMax = 0;

        const children = this.options?.children;
        if (children) {
            Array.from(children).forEach((el) => {
                if (el instanceof HTMLElement) {
                    const width = el.offsetWidth;
                    localMax = localMax < width ? width : localMax;
                }
            });
        }

        return localMax > this.maxWidth ? localMax : this.maxWidth;
    }

    /** change width options of dropdown */
    private changeWidth() {
        clearTimeout(this.timerForOptionsWidth);
        this.timerForOptionsWidth = setTimeout(
            () => {
                runAfterFramePaint(() => {
                    this.maxWidth = this.getMaxValue();
                    this.whereToRender(true);
                });
            },
            TimerTime,
        );
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
