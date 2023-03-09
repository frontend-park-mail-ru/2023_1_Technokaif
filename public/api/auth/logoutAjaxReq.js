import { redirect } from '../../modules/redirects.js';
import { sidebarConfig } from '../../utils/config/config.js';
import { clearBars } from '../../utils/functions/prePageRender.js';
import { Ajax } from '../../modules/ajax.js';

/**
 * Api-oriented logout function.
 */

export function logoutAjax() {
    const AjaxReq = new Ajax();
    AjaxReq.get({
        url: '/api/auth/logout',
        whatRender: () => {
            localStorage.removeItem('jwt');
            clearBars();
            redirect(sidebarConfig.feed);
        },
    });
}
