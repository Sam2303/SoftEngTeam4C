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
