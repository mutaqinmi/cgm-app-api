# Cipta Graha Mandiri App

Cipta Graha Mandiri App or CGM App is a web application for Cipta Graha Mandiri residential. it used for check monthly fee for every resident and managed by administrator.

## Getting Started

### Requirements :

> [!NOTE]
> The current version needs manual software installation.

- Node JS v22.11.0 or higher
- NPM v10.9.0 or higher
- PostgreSQL 17

## Installation

First, Clone [github repository](https://github.com/mutaqinmi/cgm-app-api.git) using Git

```bash
git clone https://github.com/mutaqinmi/cgm-app-api.git && cd cgm-app-api
```

Install the dependencies

```bash
npm i
# or
pnpm i
```

For setup database, create new database with database name **cgmapp** or what you like.

Open .env.example file and rename it to **.env** and then edit the variable with your preferences.

> [!TIP]
> .env Example
>
> `API_URL=https://your-api-url.com/api/v1` // your api url
>
> `DATABASE_URL=postgres//username:password@hostname:port/dbname` // adjust it to your PostgreSQL configuration
> `JWT_SECRET_KEY=example_key` // choose strong secret key for token generation

Migrate database, back to terminal or command line. Run this following command after installation setup at the first step.

Generate migration file

```bash
npm exec drizzle-kit generate
# or
pnpm exec drizzle-kit generate
```

Migrate to database

> [!CAUTION]
> make sure your database configuration on .env file is correct

```bash
npm exec drizzle-kit migrate
# or
pnpm exec drizzle-kit migrate
```

If successfull, build the web app using following command

```bash
npm run build
# or
pnpm build
```

> [!IMPORTANT]
> Before continue to next step, create new administrator first in database at administrators table.

And finally, start your application

```bash
npm run start
# or
pnpm start
```