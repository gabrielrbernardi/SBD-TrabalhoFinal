import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.alterTable('Faculdade', table => {
        table.string("siglaDisciplina").references("siglaDisciplina").inTable("Disciplina").alter();
        
        //table.integer("IdCiclo").references("IdCiclo").inTable("Ciclo").unsigned().notNullable();
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('Faculdade');
}