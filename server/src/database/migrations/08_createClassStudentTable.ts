import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('TurmaAluno', table => {
        table.integer("idAluno").unsigned().notNullable(); // FK
        table.integer("idTurma").unsigned().notNullable(); // FK

        table.foreign("idAluno").references("idAluno").inTable("Aluno");
        table.foreign("idTurma").references("idTurma").inTable("Turma");
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('TurmaAluno');
}