import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('Turma', table => {
        table.increments("idTurma").primary();
        table.integer("semestre").notNullable();
        table.integer("ano").notNullable();
        table.string("localTurma");
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('Turma');
}