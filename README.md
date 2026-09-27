# Naturotopia

Naturotopia is a Vite storefront with a PostgreSQL-backed product catalogue, customer accounts, and per-user carts.

## PostgreSQL setup

1. Make sure your local PostgreSQL server is running. In pgAdmin, create a database named `naturotopia` or let the setup command create it.

   `pgcrypto` is not a database. It is an extension installed inside the `naturotopia` database and will be enabled automatically by the schema.

2. Create `.env` from `.env.example`. Update `DATABASE_URL` if your local PostgreSQL username, password, port, or database name differs.

3. Create the database, tables, extension, and products:

   ```bash
   npm run db:setup
   ```

   If your PostgreSQL user cannot create databases, create `naturotopia` manually in pgAdmin first, then run `npm run seed`.

4. Start the API and frontend in separate terminals:

   ```bash
   npm start
   npm run dev
   ```

The API runs on `http://localhost:3001`; Vite runs on its usual local port. When a user submits signup, the record is inserted into the `users` table and the password is stored as a bcrypt hash.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
