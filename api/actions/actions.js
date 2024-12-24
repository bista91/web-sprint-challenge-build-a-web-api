exports.up = function(knex) {
    return knex.schema.createTable('actions', table => {
      table.increments();
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').notNullable();
      table.string('description', 128).notNullable();
      table.text('notes').notNullable();
      table.boolean('completed').defaultTo(false);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('actions');
  };