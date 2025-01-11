module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations', // Corrected path to migrations inside data
    },
    seeds: {
      directory: './data/seeds', // Corrected path to seeds inside data
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
