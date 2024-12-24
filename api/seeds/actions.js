exports.seed = function(knex) {
    return knex('actions').insert([
      { project_id: 1, description: 'Action 1', notes: 'This is action 1', completed: false },
      { project_id: 2, description: 'Action 2', notes: 'This is action 2', completed: true },
    ]);
  };
  