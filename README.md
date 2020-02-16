# Software Engineering Theory and Practice (Coursework)

GitHub Username|Name|UP Number
-|-|-
Harry-Martin|Harry Martin|UP896106
psidex|Simon Jenner|UP897821
username|name|UPxxxxxx
username|name|UPxxxxxx
username|name|UPxxxxxx
username|name|UPxxxxxx

## Database
Run the setup file using PostgreSQL.

This can be achieved using:
```bash
$ psql -f src/setup.sql

```
Please note that this must run as one of the Postgres super users for your current Postgres cluster.
By default (on linux) this is the user 'postgres'.
This can be achieved by running `$ sudo su postgres'.
Alternatively, running the following single command will yeild the same result as running the previous two:
```bash
$ sudo -u postgres psql -f src/setup.sql
```



## Server

```bash
npm i
npm start
```

## Frontend

`src/pages` and `src/static`
