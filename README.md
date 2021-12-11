# UWE API

> API for UML Web Editor

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker 

```
cp .env.prod .env
docker build -t uwe-api .
docker run -d --env-file .env --network=host uwe-api
```

## Database Migrations

Migrations are managed with typeorm and stored at `resources/migrations`. Migrations are applied automatically as the system starts

To create a new migration:

```bash
# must have "typeorm" installed globally
$ npm i -g typeorm

# then can create a js migration
$ typeorm migration:create -n MigrationName -o
```
