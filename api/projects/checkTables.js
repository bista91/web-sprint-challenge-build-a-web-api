const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3', // Path to your SQLite file
    },
  });
  
  async function checkTables() {
    try {
      // Query to get the names of the tables in the database
      const result = await knex.raw("SELECT name FROM sqlite_master WHERE type='table'");
      
      // Print the tables
      console.log(result);
    } catch (error) {
      // Catch and print any errors
      console.error('Error checking tables:', error);
    } finally {
      // Ensure the connection is closed regardless of success or failure
      knex.destroy();
    }
  }
  
  // Run the function and handle errors
  checkTables().catch(console.error);
  