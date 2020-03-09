/** This module is for utility functions.
 * @module utils
 */

const crypto = require('crypto');

/**
 * Hash a string using SHA256.
 * @param {string} toHash - The string to hash.
 * @returns {string} - The hex value of the SHA256 hash of the given string.
 */
function sha256(toHash) {
    return crypto.createHash('sha256').update(toHash).digest('hex');
}

/**
 * Determine if a variable is a string that contains text.
 * @param {string} maybe - The variable that might be a string and might contain text.
 * @returns {boolean} - Is it a string that contains text?
 */
function isTextString(maybe) {
    // https://stackoverflow.com/a/9436948
    if (typeof maybe === 'string' || maybe instanceof String) {
        if (maybe.trim().length > 0) {
            return true;
        }
    }
    return false;
}

module.exports = {
    sha256,
    isTextString,
};
