exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNull();
    table.string('avatar').defaultTo('https://i.imgur.com/bbiRo9M.jpg')
    table
      .string('email')
      .notNull()
      .unique();
    table.string('password', 60);
    table
      .boolean('active')
      .notNull()
      .defaultTo(true);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
