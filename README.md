# NestJS-Skeleton

This repository contains a basic skeleton for a project using TypeScript, NestJS, TypeORM, PostgreSQL, and JWT for authentication.

## Features

- **Typescript**: Syntactic superset of Javascript that adds static typing.
- **NestJS**: A Node.js framework for building server-side applications..
- **TypeORM**: An ORM to handle the PostgreSQL database.
- **PostgreSQL**: A relational database used to store data.
- **JWT**: JSON Web Tokens for authentication and authorization.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v13 or higher)
- Yarn

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Skt-Alvaro/nestjs-skeleton.git
    ```

2. Install the dependencies:

    ```bash
    cd nestjs-skeleton
    yarn install
    ```

3. Set up the environment variables:

    Copy the `.env.example file` and rename it to `.env`. Make sure to set up the variables with your own credentials and configuration.

    ```bash
    cp .env.example .env
    ```

## Configuration

- **Database Config**: Set up the variables related to the database in the`.env` file:

    ```plaintext
    POSTGRES_HOST=localhost
	POSTGRES_DB=database_name
    POSTGRES_PORT=5432
    DB_USERNAME=user
    DB_PASSWORD=password
    ```

- **JWT Config**: Set up the variables for the JWT:
  
    ```plaintext
    JWT_ACCESS_SECRET=access_secret
    JWT_ACCESS_EXPIRATION=1d
	JWT_REFRESH_SECRET=refresh_secret
	JWT_REFRESH_EXPIRATION=10d
    ```

- **Frontend**: Set up the variables for the frontend:
  
    ```plaintext
    FRONTEND_HOST=localhost
	FRONTEND_URL=http://localhost:3001
    ```

## Usage

1. Run migrations

    ```bash
    yarn migrations:run
    ```

2. Running the app:
    ```bash
    # development
	$ yarn run start

	# watch mode
	$ yarn run start:dev

	# production mode
	$ yarn run start:prod
    ```

3. Test:
    ```bash
    # unit tests
	$ yarn run test

	# e2e tests
	$ yarn run test:e2e

	# test coverage
	$ yarn run test:cov
    ```

Server will run in `http://localhost:3000`.

## Available Scripts

- `start`: Starts the application in production mode.
- `start:dev`: Starts the application in development mode with automatic reloading.
- `migrations:create`: Creates an empty migration.
- `migrations:generate`: Generates a new migration based on entities changes.
- `migrations:run`: Runs the database migrations.
- `migrations:show`: Show the migrations.
- `migrations:drop`: Drop the migrations schema.
- `migrations:revert`: Reverts the last migration.

## Project Structure

```plaintext
src/
│
├── auth/               # Authentication and JWT module
├── config/             # Configuration module for .env
├── database/           # Configuration module for TypeORM connection
├── types/              # Custom types interfaces
├── users/              # Users module
├── utils/              # Shared code, such as functions, decorators, constants, etc.
├── app.module.ts       # App module
└── main.ts             # Entry point
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
