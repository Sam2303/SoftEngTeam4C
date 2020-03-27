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
// voteOnAnswer     DONE
// searchQuestions

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
        expect(await db.getQuestion(-1)).toStrictEqual([]);
    });
});


describe('getAnswers method', () => {
    test('Call getAnswers with correct ID', async () => {
        expect(await db.getAnswers(1, 1)).toStrictEqual([{
            id: 1,
            score: 1,
            text: 'leave the smoking area then..',
            user_id: 1,
            currentUserHasVoted: true,
        }]);
    });

    test('Call getAnswers with incorrect ID', async () => {
        expect(await db.getAnswers(-1, 1)).toStrictEqual([]);
    });
});


describe('validQuestionId method', () => {
    test('Call validQuestionId with correct ID', async () => {
        expect(await db.validQuestionId(1)).toBe(true);
    });

    test('Call validQuestionId with incorrect ID', async () => {
        expect(await db.validQuestionId(-1)).toBe(false);
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
        )).toEqual(expect.any(Number));
    });
});


describe('insertQuestion method', () => {
    test('Call insertQuestion with new details', async () => {
        expect(await db.insertQuestion(
            1,
            'Test question, please ignore',
            'Test Question - Working',
        )).toEqual(expect.any(Number));
    });

    // test('Call insertQuestion with incorrect details', async () => {
    //     expect(await db.insertQuestion(
    //         'one',
    //         2,
    //         3,
    //     )).mockReturnValue(new Error('error: column "one" does not exist'));
    // });
});


describe('insertAnswer method', () => {
    test('Call insertAnswer to insert new answer', async () => {
        expect(await db.insertAnswer(2,
            2,
            'Have you tried turning it off and on again?'));
    });
    test('Call getAnswers with newly inserted answer', async () => {
        expect(await db.getAnswers(2, 2)).not.toBe([]);
    });
});


describe('voteOnAnswer method', () => {
    test('Call voteOnAnswer with a downvote', async () => {
        expect(await db.voteOnAnswer(1, 1));
    });
    test('Call getAnswers to check new score', async () => {
        expect(await db.getAnswers(1, 1)).toStrictEqual([{
            id: 1,
            score: 0,
            text: 'leave the smoking area then..',
            user_id: 1,
            currentUserHasVoted: false,
        }]);
    });

    test('Call voteOnAnswer with an upvote', async () => {
        expect(await db.voteOnAnswer(1, 1));
    });
    test('Call getAnswers to check new score', async () => {
        expect(await db.getAnswers(1, 1)).toStrictEqual([{
            id: 1,
            score: 1,
            text: 'leave the smoking area then..',
            user_id: 1,
            currentUserHasVoted: true,
        }]);
    });
});


describe('searchQuestions method', () => {
  test('Call searchQuestions without a value. Show all items, newest first', async () => {
      expect(await db.searchQuestions('')).not.toBe([]);
  });

  test('Call searchQuestions with criteria in order of similarity', async () => {
      expect(await db.searchQuestions("I need air! I can''t breath!"));
  });
});
