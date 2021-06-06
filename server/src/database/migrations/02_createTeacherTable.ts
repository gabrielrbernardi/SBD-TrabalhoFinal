import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('Professor', table => {
        table.increments("idProfessor").primary();
        table.string("nomeProfessor").notNullable();
        table.string("dataNascimento").notNullable();
        table.float("salario").notNullable();
        table.string("siglaFaculdade"); //FK
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('Professor');
}