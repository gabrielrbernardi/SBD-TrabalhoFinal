import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('DisciplinaPreRequisito', table => {
        table.string("siglaDisciplina").references("siglaDisciplina").inTable("Disciplina"); // FK
        table.string("siglaDisciplinaPreRequisito").references("siglaDisciplina").inTable("Disciplina"); // FK
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('DisciplinaPreRequisito');
}