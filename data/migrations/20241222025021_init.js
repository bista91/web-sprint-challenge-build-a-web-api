exports.up = function (knex) {
  return knex.schema.hasTable('projects').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('projects', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.boolean('completed').defaultTo(false);
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('projects');
};
