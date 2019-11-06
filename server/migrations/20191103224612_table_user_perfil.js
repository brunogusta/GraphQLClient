exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_perfils', table => {
    table.integer('user_id').unsigned();
    table.integer('perfil_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.foreign('perfil_id').references('perfils.id');
    table.primary(['user_id', 'perfil_id']);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_perfils');
};
