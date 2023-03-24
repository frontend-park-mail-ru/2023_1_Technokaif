import { PATH } from '../../utils/config/urls.js';
import { redirect } from '../../modules/redirects.js';
import { sidebarConfig } from '../../utils/config/config.js';
import { clearBars } from '../../utils/functions/prePageRender.js';
import Ajax from '../../modules/Ajax';

const logout = () => {
    localStorage.removeItem('jwt');
    clearBars();
    redirect(sidebarConfig.feed);
};

/**
 * Api-oriented logout function.
 */
export function logoutAjax() {
    Ajax.get({
        url: PATH.logout,
        resolve: logout,
        reject: logout,
    });
}
