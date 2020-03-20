const db = require('../src/database');

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();
});

// checkUser        DONE
// getId            DONE
// insertUser       DONE
// insertQuestion   DONE
// getQuestion      DONE
// validQuestionId  DONE
// getAnswers       DONE
// insertAnswer     DONE

// Reset: psql -U postgres -f "src/setup.sql

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



describe('validQuestionId method', () => {
    test('Call validQuestionId with correct ID', async () => {
        expect(await db.validQuestionId(1)).toBe(true);
    });

    test('Call validQuestionId with incorrect ID', async () => {
        expect(await db.validQuestionId(2)).toBe(false);
    });
});



describe('insertUser method', () => {
    test('Call insertUser with already taken details', async () => {
        expect(await db.insertUser(
            'test-email@test.ac.uk',
            '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        )).toBe(-1);
    });

    test('Call insertUser with new details', async () => {
        expect(await db.insertUser(
            'Sams-email@test.ac.uk',
            '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        )).toBe(2);
    });
});



describe('insertQuestion method', () => {
    test('Call insertQuestion with new details', async () => {
        expect(await db.insertQuestion(
            1,
            'Test question, please ignore',
            'Test Question - Working',
        )).toBe(2);
    });
});



describe('insertAnswer method', () => {
  test('Call getAnswers with newly inserted question', async () => {
      expect(await db.insertAnswer(2,
        2,
        'Have you tried turning it off and on again?',
      ));
  });
    test('Call getAnswers with newly inserted question', async () => {
        expect(await db.getAnswers(2)).toStrictEqual([{"id": 2,
        "score": 0,
        "text": 'Have you tried turning it off and on again?',
        "user_id": 2}]);
    });
});
