# Brikl backend engineer assignment

### Setup

This is the instruction to setup this project and run in your local machine. Note that this instruction uses `pnpm` as a package manager. You may replace these commands corresponding to your package manager.

1. Copy `.env.finish` file and rename it to `.env`.
2. Install dependencies.
3. Run `docker compose up -d` to start docker containers in background.
4. Run `pnpm db:migrate` to initiate database.
5. Run `pnpm codegen` to generate TypeScript definition for GraphQL and Prisma client.
6. Run `pnpm start` to start the project.
7. Go to `http://localhost:4000`, you should see Apollo Playground with two queries `users` and `user`. You may change the port according to `GATEWAY_PORT` in your `.env` file.

### How to run test suite

The test suite should run the following tests and passed.

  ✓ should create a new list 
  ✓ should create a new task 
  ✓ should update a task title 
  ✓ should update a task status 
  ✓ should move a task upwards 
  ✓ should move a task downwards 

1. Navigate to the root of the project.
2. Run `npm run test` in the command line.
3. Sit back and enjoy.
