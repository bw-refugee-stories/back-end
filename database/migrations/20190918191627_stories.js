
exports.up = function(knex) {
  return knex.schema
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
  })
    .createTable('comments', tbl => {
        tbl.increments()
            .unique()
        tbl.string('contents')
        tbl.integer('story_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('stories')
    })
    .createTable('users', tbl => {
        tbl.increments()
        tbl.string('username')
            .notNullable()
            .unique()
        tbl.string('password')
            .notNullable()
        tbl.string('role')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('comments')
    .dropTableIfExists('stories')
};
