import knex from 'knex';

export async function up(knex: knex){
    await knex('Turma').insert(
        {
            semestre: 2,
            ano: 2021,
            localTurma: '1B',
        }
    );
}

export async function down(knex: knex) {
    return knex('Faculdade').where('siglaFaculdade', 'UFU').del();
}