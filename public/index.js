// import './index.html';
// import './static/css/style.css';
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
