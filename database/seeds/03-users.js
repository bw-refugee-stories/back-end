exports.seed = function(knex, promise) {
    return knex('users').insert([
        {username: `admin`, password: `root`, role: 'admin'}
    ])
}