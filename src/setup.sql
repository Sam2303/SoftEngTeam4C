drop database if exists team4c;
create database team4c;
drop user if exists team4c;
create user team4c;
alter user team4c with superuser;
alter user team4c password 'team4c';

\c team4c;

create table fpp_user(
    id               serial primary key,
    email            varchar(50) not null,
    -- Passwords are to be hashed using SHA256
    -- Just storing the hash like this is not actually great security but its good enough
    password_hash    char(64) not null
);

create table question(
    id          serial primary key,
    text        text not null,
    title       text not null,
    date        date not null,
    user_id     integer         references fpp_user(id)
);

create table answer(
    id          serial primary key,
    text        text not null,
    score       integer         default 0,
    user_id     integer         references fpp_user(id),
    question_id   integer         references question(id)
);

-- insert test user (password is "password")
insert into fpp_user(email, password_hash) values
(
    'test-email@test.ac.uk',
    '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
);

-- insert test question
insert into question(text, title, date, user_id) values
('I need air! I can''t breath!', 'This is a titleee', now(), 1);

-- insert test answer to question
insert into answer(text, user_id, question_id) values
('leave the smoking area then..', 1, 1);

-- display all questions posted and the email of the user who posted them
select t.text, u.email from fpp_user as u join question as t on t.user_id = u.id;

-- display all answers to question with id 1 and the email of the user who responded
select r.text, u.email from answer as r join  fpp_user as u on r.user_id = u.id
where r.question_id = 1;
