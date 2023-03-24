/**
 * Class for routing urls in app.
 */
class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        this.history = window.history;
        this.onRouteChange = this.onRouteChange.bind(this);
        this.history.pushState(null, null, '/');
        window.addEventListener('popstate', this.onRouteChange);
    }

    onRouteChange() {
        const path = window.location.pathname;
        const route = this.routes.find((r) => r.path === path);
        if (route) {
            this.currentRoute = route;
            this.currentRoute.component();
        } else {
            console.error(`Route not found for path: ${path}`);
        }
    }

    navigateTo(path) {
        this.history.pushState(null, null, path);
        this.onRouteChange();
    }
}

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/contact', component: Contact },
    { path: '*', component: NotFound },
];

const router = new Router(routes);
router.onRouteChange();
