
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments()
    tbl.string('username')
        .notNullable()
        .unique()
    tbl.string('password')
        .notNullable()
    tbl.string('role')
})
    .createTable('stories' , tbl => {
      tbl.increments()
        .unique()
      tbl.string('title')
        .notNullable()
      tbl.string('contents')
        .notNullable()
      tbl.string('name')
      tbl.string('email')
      tbl.boolean('pending')
        .notNullable()
      tbl.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
  })
    .createTable('comments', tbl => {
        tbl.increments()
            .unique()
        tbl.string('contents')
            .notNullable()
        tbl.integer('story_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('stories')
        tbl.integer('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
    })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('comments')
    .dropTableIfExists('stories')
    .dropTableIfExists('users')  
};
