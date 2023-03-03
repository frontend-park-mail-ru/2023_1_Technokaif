'use strict';

import { feedAjax } from '../../api/feed.js';

export function renderHome (parent) {
    feedAjax(parent);
}
