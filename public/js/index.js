'use strict'

import {renderAuth as renderAuth} from './auth/auth.js'
import {config as config} from '../config.js'

function goToPage(configSection) {
    contentElement.innerHTML = '';

    configSection.render(contentElement);
}

renderAuth(document.getElementById('root'));