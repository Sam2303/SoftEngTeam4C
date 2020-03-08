/** This module is for utility functions.
 * @module utils
 */

// From https://www.regextester.com/95011.
const sha256RegEx = /^[A-Fa-f0-9]{64}$/g;

/**
 * Check if a string is a valid SHA256 hash.
 * @param {string} hash - The string to validate.
 * @returns {boolean} - true if it is valid, otherwise false.
 */
function isSHA256(hash) {
    // https://stackoverflow.com/a/9436948
    if (typeof hash === 'string' || hash instanceof String) {
        // Some JS magic - https://stackoverflow.com/a/784946
        return !!hash.match(sha256RegEx);
    }
    return false;
}

module.exports = {
    isSHA256,
};
