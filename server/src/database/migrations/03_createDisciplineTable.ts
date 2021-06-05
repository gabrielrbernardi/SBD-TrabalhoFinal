import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('Disciplina', table => {
        table.string("siglaDisciplina").primary();
        table.string("nomeDisciplina").notNullable();
        table.integer("nroCreditos").notNullable();
        table.integer("idTurma").unsigned().notNullable(); // FK

        table.foreign("idTurma").references("idTurma").inTable("Turma");
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('Disciplina');
}