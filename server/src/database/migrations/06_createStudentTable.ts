import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('Aluno', table => {
        table.increments("idAluno").primary();
        table.string("nomeAluno").notNullable();
        table.string("dataNascimento").notNullable();
        table.float("cra");
        table.string("telefone");
        table.string("siglaFaculdade").references("siglaFaculdade").inTable("Faculdade");
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('Aluno');
}