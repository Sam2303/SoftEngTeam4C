DROP DATABASE IF EXISTS team4c;
CREATE DATABASE team4c;

DROP USER IF EXISTS team4c;
CREATE USER team4c;
ALTER USER team4c WITH superuser;
ALTER USER team4c PASSWORD 'team4c';

\c team4c;

CREATE TABLE fpp_user (
    id serial PRIMARY KEY,
    email varchar(50) NOT NULL,
    -- Passwords are to be hashed using SHA256
    -- Just storing the hash like this is not actually great security but its good enough
    password_hash char(64) NOT NULL
);

CREATE TABLE question (
    id serial PRIMARY KEY,
    text text NOT NULL,
    title text NOT NULL,
    date date NOT NULL,
    user_id integer REFERENCES fpp_user (id)
);

CREATE TABLE answer (
    id serial PRIMARY KEY,
    text text NOT NULL,
    score integer DEFAULT 0,
    date date NOT NULL,
    user_id integer REFERENCES fpp_user (id),
    question_id integer REFERENCES question (id)
);

-- insert test user (password is "password")
INSERT INTO fpp_user (email, password_hash)
    VALUES ('test-email@test.ac.uk', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8');

-- insert test question
INSERT INTO question (text, title, date, user_id)
    VALUES ('I need air! I can''t breath!', 'This is a titleee', now(), 1);

-- insert test answer to question
INSERT INTO answer (text, date, user_id, question_id)
    VALUES ('leave the smoking area then..', now(), 1, 1);

-- display all questions posted and the email of the user who posted them
SELECT
    t.text,
    u.email
FROM
    fpp_user AS u
    JOIN question AS t ON t.user_id = u.id;

-- display all answers to question with id 1 and the email of the user who responded
SELECT
    r.text,
    u.email
FROM
    answer AS r
    JOIN fpp_user AS u ON r.user_id = u.id
WHERE
    r.question_id = 1;
