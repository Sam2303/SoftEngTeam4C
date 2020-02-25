drop database if exists team4c;
create database team4c;
drop user if exists team4c;
create user team4c;
alter user team4c with superuser;
alter user team4c password 'team4c';

\c team4c;

create table fpp_user(
    id          serial primary key,
    email       varchar(50) not null,
    password    varchar(50) not null
);

create table thread(
    id          serial primary key,
    text        text not null,
    date        date not null,
    user_id     integer         references fpp_user(id)
);

create table response(
    id          serial primary key,
    text        text not null,
    score       integer         default 0,
    user_id     integer         references fpp_user(id),
    thread_id   integer         references thread(id)
);

-- insert test user
insert into fpp_user(email, password) values
('test-email@test.ac.uk', 'ekfrowgnrjwefr');

-- insert test thread
insert into thread(text, date, user_id) values
('I need air! I can''t breath!', now(), 1);

-- insert test response to thread 
insert into response(text, user_id, thread_id) values
('leave the smoking area then..', 1, 1);

-- display all questions posted and the email of the user who posted them
select t.text, u.email from fpp_user as u join thread as t on t.user_id = u.id;

-- display all responses to thread with id 1 and the email of the user who responded
select r.text, u.email from response as r join  fpp_user as u on r.user_id = u.id where r.thread_id = 1;
