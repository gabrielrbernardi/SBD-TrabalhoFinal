import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('ProfessorDisciplina', table => {
        table.integer("idProfessor").unsigned().notNullable(); // FK
        table.string("siglaDisciplina").references("siglaDisciplina").inTable("Disciplina"); // FK

        table.foreign("idProfessor").references("idProfessor").inTable("Professor");
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('ProfessorDisciplina');
}