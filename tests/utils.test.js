const utils = require('../src/utils');

describe('isTextString method', () => {
    test('Call isTextString with a string', async () => {
        expect(await utils.isTextString(
            'This is a string',
        )).toBe(true);
    });

    test('Call isTextString with an integer', async () => {
        expect(await utils.isTextString(
            5,
        )).toBe(false);
    });
});
