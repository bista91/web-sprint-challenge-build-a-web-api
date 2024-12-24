exports.seed = function(knex) {
    return knex('projects').insert([
      { name: 'Test Project 1', description: 'A test project', completed: false },
      { name: 'Test Project 2', description: 'Another test project', completed: true },
    ]);
  };
  