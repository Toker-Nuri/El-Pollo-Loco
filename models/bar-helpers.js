/**
 * Berechnet den Index eines 6-stufigen Balkens (0–100%) anhand der Prozentzahl.
 * Stufen: 0, 20, 40, 60, 80, 100.
 *
 * @param {number} percentage
 * @returns {number} Index 0–5
 */
function resolveBarIndex(percentage) {
    if (percentage >= 100) {
        return 5;
    } else if (percentage >= 80) {
        return 4;
    } else if (percentage >= 60) {
        return 3;
    } else if (percentage >= 40) {
        return 2;
    } else if (percentage >= 20) {
        return 1;
    } else {
        return 0;
    }
}