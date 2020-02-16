create database team4c;
create user postgres;
alter user postgres with superuser;
alter user postgres password 'postgres';

\c team4c;

create table test(
    test_pk serial primary key,
    test_string varchar(255),
    test_integer integer
);

insert into test(test_string, test_integer) values
('Hello', 123),
('World', 456);
