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

1. `npx db-migrate db:create collectorhive_api_development` (or whatever `CH_DB_NAME` you specified in `.env`)
2. `npx db-migrate up`
