/**
 * A RegEx expression that exactly matches a SHA256 hash.
 * From https://www.regextester.com/95011.
 */
const sha256RegEx = /^[A-Fa-f0-9]{64}$/g;

/**
 * Check if a string is a valid SHA256 hash.
 * @param {string} hash - The string to validate.
 * @returns {boolean} - true if it is valid, otherwise false.
 */
function isSHA256(hash) {
    return hash.match(sha256RegEx) ? true: false;
}

module.exports = {
    isSHA256,
};
