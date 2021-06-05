import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('Universidade', table => {
        table.integer("nroSala").references("nroSala").inTable("SalaDeAula"); // FK
        table.string("siglaFaculdade").references("siglaFaculdade").inTable("Faculdade"); // FK
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('Universidade');
}