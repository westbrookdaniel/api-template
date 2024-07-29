# API Template

A minimal template for building APIs with Fastify.

## Setup

1. `npx degit westbrookdaniel/api-template`
1. Ensure you're using node >=20.16
1. Copy `.env.example` to `.env`
1. `pnpm install`

## Commands

| Script             | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `pnpm dev`         | Starts the development server with hot reloading using tsx |
| `pnpm build`       | Builds the project for production                          |
| `pnpm start`       | Starts the production server                               |
| `pnpm test`        | Runs the test suite using Vitest                           |
| `pnpm coverage`    | Runs tests with coverage report                            |
| `pnpm lint`        | Runs ESLint and Prettier to fix and format code            |
| `pnpm db`          | Runs Drizzle Kit for database operations                   |
| `pnpm db generate` | Creates a new migration                                    |
| `pnpm db studio`   | Starts drizzle studio, a database tool                     |
| `pnpm seed`        | Seeds the database using the seed script                   |

> [!NOTE]  
> Newly added files require a server restart to be found by `@fastify/autoload`
