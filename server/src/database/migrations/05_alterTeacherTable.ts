import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.alterTable('Professor', table => {
        table.string("siglaFaculdade").references("siglaFaculdade").inTable("Faculdade").alter();
        
        //table.integer("IdCiclo").references("IdCiclo").inTable("Ciclo").unsigned().notNullable();
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('Professor');
}