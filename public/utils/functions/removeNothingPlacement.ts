/** Remove all elements inside Element with class js__nothing-found-search */
export function removeNothingPlacementInSearch() {
    const nothingPlacement = document.querySelector('.js__nothing-found-search');
    if (!nothingPlacement) {
        console.error('Can\'t find nothing placement');
        return;
    }

    nothingPlacement.innerHTML = '';
}
