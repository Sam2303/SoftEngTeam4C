const db = require('../src/database');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

describe('checkUser method', () => {
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
});



describe('getId method', () => {
    test('Call getId with default test user', async () => {
        expect(await db.getId('test-email@test.ac.uk')).toBe(1);
    });

    test('Call getId with incorrect email', async () => {
        expect(await db.getId('incorrect-email@test.ac.uk')).toBe(-1);
    });
});



describe('getQuestion method', () => {
    test('Call getQuestion with correct ID', async () => {
        expect(await db.getQuestion(1)).not.toBe([]);
    });

    test('Call getQuestion with incorrect ID', async () => {
        expect(await db.getQuestion(2)).toStrictEqual([]);
    });
});



describe('getAnswers method', () => {
    test('Call getAnswers with correct ID', async () => {
        expect(await db.getAnswers(1)).toStrictEqual([{"id": 1,
        "score": 0,
        "text": "leave the smoking area then..",
        "user_id": 1}]);
    });

    test('Call getAnswers with incorrect ID', async () => {
        expect(await db.getAnswers(2)).toStrictEqual([]);
    });
});
