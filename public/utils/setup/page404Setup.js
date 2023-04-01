import { componentsNames } from '../config/componentsNames';

/**
 * Setup for not found c
 */
export function page404Setup() {
    return {
        headerWithButtonBlock: `${componentsNames.PAGE404}`,

        /** Button components */
        buttonType: 'submit',
        divButton: 'primary',
        textButton: 'Go to main',

        /** Header components */
        formHeader: 'header',
        title: 'title',
        logoSrc: '/static/svg/whiteLogo.svg',
        titleClass: 'title__name',
        titleName: 'Fluire',

        notificationClass: 'title__page-message',
        notificationName: 'Page not found',

        descriptionClass: 'title__page-sub-message',
        descriptionName: 'We couldn\'t find your page ',
    };
}
