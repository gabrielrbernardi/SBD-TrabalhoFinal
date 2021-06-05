import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('Faculdade', table => {
        table.string("siglaFaculdade").primary();
        table.string("blocoFaculdade").notNullable();
        table.integer("nroProfessores");
        table.integer("nroAlunos");
        table.float("orcamento");
        table.string("siglaDisciplina"); //FK
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('Faculdade');
}