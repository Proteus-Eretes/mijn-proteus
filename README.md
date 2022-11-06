# Mijn Proteus

## Development

### Dependencies

To start development, you need some dependencies to get it all up and running.
Most actual dependencies are run with Docker, so it should be fairly simple to run.
The dependencies are:

- [NodeJS](https://nodejs.org/) (recent version, 18.x+).
- [Yarn 1.x](https://yarnpkg.com/) (higher is tested and works, but 1.x is recommended).
- [Docker](https://www.docker.com/).
- [Docker Compose](https://docs.docker.com/compose/).

It's advised to develop using a UNIX based operating system (Linux or macOS mostly), as Windows can sometimes give weird issues.
You are welcome to still use Windows, but know that only limited support can be given.

### Starting Up

Development is done locally, with the services it depends on running with Docker.
To start the dependencies, a Docker compose file is provided.
This can be start with:

```bash
docker-compose up
```

This exposes several services:

- The Postgres database to connect to, accesible at the default port `5432`.
- An Adminer instance, to explore the database, accesible at [localhost:8080](http://localhost:8080).
- Mailcatcher SMTP server, at port 1025.
- Mailcatcher to view the outgoing email at [localhost:8081](http://localhost:8081).

Now to start the actual application, install the dependencies first:

```bash
yarn install
```

The database has to be set up separately.
Fortunally it's also very simple, to create the structure you can run the following command:

```bash
yarn migrate-dev
```

Now to seed the database with some sample data found in `server/database/seeders`, you can run the following command.

```bash
yarn seed
```

Now you can start the server and visit it on [localhost:3000](http://localhost:3000):

```bash
yarn dev
```

### Resetting

It's possible that the database enters an invalid state because of an programming error.
You can either fix this manual at the [database interface](http://localhost:8080), but it's easier to just reset.

This can be done by stopping the development server, running the following command, and start the server again:

```bash
yarn migrate-reset
```

You should now be able to start the server again with a fresh database.
The seeding script is also run for you.
