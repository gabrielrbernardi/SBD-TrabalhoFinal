import knex from 'knex';

export async function up(knex: knex){
    return knex.schema.createTable('InformacoesAlunoDisciplina', table => {
        table.string("siglaDisciplina").references("siglaDisciplina").inTable("Disciplina").primary();        
        table.float("notaAluno");
        table.integer("faltaAluno");
        
        table.integer("idAluno").unsigned().notNullable(); // FK

        table.foreign("idAluno").references("idAluno").inTable("Aluno");
    })
}

export async function down(knex: knex) {
    return knex.schema.dropTable('InformacoesAlunoDisciplina');
}