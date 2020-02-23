# Software Engineering Theory and Practice (Coursework)

GitHub Username|Name|UP Number
-|-|-
Harry-Martin|Harry Martin|UP896106
psidex|Simon Jenner|UP897821
Sam200080|Sam Parsons|UP889823
SammyJC|Sam Clifton|UP880264
Bancsii|Daniel McKenna|UP846201
username|name|UPxxxxxx

## Database
Run the setup file using PostgreSQL.

This can be achieved using:
```bash
$ psql -f src/setup.sql

```
Please note that this must run as one of the PostgreSQL super users for your current Postgres cluster.
By default (on linux) this is the user 'postgres'.
This can be achieved by the following command before the previous one:
```bash
$ sudo su postgres
```
Alternatively, running the following single command will yeild the same result as running the previous two:
```bash
$ sudo -u postgres psql -f src/setup.sql
```

## Server

```bash
npm i
npm start
```

### API Routes

WIP

Verb|Path|Parameters
-|-|-
POST|`/api/login`|
POST|`/api/question`|
GET|`/api/question`|
GET|`/api/question/answers`|
POST|`/api/answer`|
