/**
 * Function to swap two nodes of one parent
 * @param node1
 * @param node2
 */
export default function swapSiblingNodes(node1, node2) {
    const parent = node1.parentNode;
    const { nextSibling } = node2;
    parent.insertBefore(node2, node1);
    parent.insertBefore(node1, nextSibling);
}
