import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('IniciacaoCientifica', table => {
        table.integer("idAluno").unsigned().notNullable(); // FK
        table.integer("idProfessor").unsigned().notNullable(); // FK

        table.foreign("idAluno").references("idAluno").inTable("Aluno");
        table.foreign("idProfessor").references("idProfessor").inTable("Professor");
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('IniciacaoCientifica');
}