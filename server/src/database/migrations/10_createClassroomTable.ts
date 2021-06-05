import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('SalaDeAula', table => {
        table.integer("nroSala").primary();
        table.string("nomeBloco");
        table.integer("capacidadeSala");
        table.string("siglaFaculdade").references("siglaFaculdade").inTable("Faculdade");
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('SalaDeAula');
}