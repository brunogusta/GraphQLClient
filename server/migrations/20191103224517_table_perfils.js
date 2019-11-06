exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('perfils', table => {
      table.increments('id').primary();
      table
        .string('name')
        .notNull()
        .unique();
      table.string('label').notNull();
    })
    .then(function() {
      return knex('perfils').insert([
        { name: 'comum', label: 'Comum' },
        { name: 'admin', label: 'Administrador' }
      ]);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('perfils');
};
