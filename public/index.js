import './static/css/style.less';
import { prePageRender } from './utils/functions/prePageRender.js';
import { renderHome } from './pages/home/home.js';

/**
 * Render main page of app
 */
function renderMainPage() {
    prePageRender();
    renderHome(document.getElementById('main'));
}

renderMainPage();
