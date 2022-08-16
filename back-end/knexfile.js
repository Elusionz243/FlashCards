// Update with your config settings.

const path = require("path");

require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const { DATABASE_URL = "postgresql://postgres@localhost/postgres" } =
  process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 1, max: 5 },
    migrations: {
      directory: "./src/db/migrations",
    },
    seeds: {
      directory: "./src/db/seeds",
    },
  },
};
