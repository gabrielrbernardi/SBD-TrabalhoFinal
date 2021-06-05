import knex from 'knex';

export async function up(knex: knex){
    await knex('Faculdade').insert(
        {
            siglaFaculdade: 'UFU',
            blocoFaculdade: '1B',
            nroProfessores: 40,
            nroAlunos: 500,
            orcamento: 1000.00,
        }
    );
}

export async function down(knex: knex) {
    return knex('Faculdade').where('siglaFaculdade', 'UFU').del();
}