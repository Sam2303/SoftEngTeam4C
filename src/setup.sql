drop database if exists team4c;
create database team4c;
drop user if exists team4c;
create user team4c;
alter user team4c with superuser;
alter user team4c password 'team4c';

\c team4c;

create table test(
    test_pk serial primary key,
    test_string varchar(255),
    test_integer integer
);

insert into test(test_string, test_integer) values
('Hello', 123),
('World', 456);

-- create user table  (email, password, (PK - userID))
-- create thread table (question-text, date, (PK - threadID))

-- create user-thread (userID, threadID, (PK - thread-userID))  handles relationship between user and their threads.

-- create response table (response-text, up/down-score, (PK - responseID))

-- create user-response table (userID, responseID, (PK - user-responseID)) handles relationship between user and their responses
