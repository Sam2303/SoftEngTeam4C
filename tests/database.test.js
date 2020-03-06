const db = require('../src/database');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

test('Call checkUser with default test user', async () => {
    expect(await db.checkUser(
        'test-email@test.ac.uk',
        '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    )).toBe(1);
});

test('Call checkUser with incorrect email', async () => {
    expect(await db.checkUser(
        'incorrect-email@test.ac.uk',
        '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    )).toBe(-1);
});

test('Call checkUser with incorrect password', async () => {
    expect(await db.checkUser(
        'incorrect-email@test.ac.uk',
        // 6 instead of 5!
        '6e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    )).toBe(-1);
});
