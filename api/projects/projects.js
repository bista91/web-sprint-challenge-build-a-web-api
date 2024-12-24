exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
      table.increments();
      table.string('name', 128).notNullable();
      table.string('description', 256).notNullable();
      table.boolean('completed').defaultTo(false);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('projects');
  };