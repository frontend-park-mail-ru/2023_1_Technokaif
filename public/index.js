import { prePageRender } from './utils/functions/prePageRender.js';
import { renderHome } from './pages/home/home.js';

function renderMainPage() {
    prePageRender();
    renderHome(document.getElementById('main'));
}

renderMainPage();
