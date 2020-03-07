const utils = require('../src/utils');

test('Call isSHA256 with a valid hash', async () => {
    expect(await utils.isSHA256(
        '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    )).toBe(true);
});

test('Call isSHA256 with an invalid hash', async () => {
    expect(await utils.isSHA256(
        'invalid hash :)',
    )).toBe(false);
});
