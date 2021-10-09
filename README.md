# CollectorHive API

## Introduction

CollectorHive is a RESTful API for managing CollectorHive data.

## Development

1. Copy `env.template` to `.env`

```
cp env.template .env
```

2. Customize data in `.env`
3. Run `npm install`
4. Run `npm run dev`

## Usage

1. Visit `http://localhost:8000` (or whatever `CH_PORT` you specified in `.env`)

## Database

You need to have Postgres installed and running.

1. `npx sequelize db:create`
2. `npx sequelize db:migrate`
3. Optionally run seeders `npm run seed`

## Testing

1. Create the test database `NODE_ENV=test npx sequelize db:create`
2. Run the tests `npm test` or `npm run test:watch` if you want to watch for changes while developing
