/**
 * Function to check auth state.
 * @return return true if jwt token exist in localStorage
 */
export function checkAuth() {
    return (localStorage.getItem('jwt') !== null);
}
