import { Request, Response } from "express";
import knex from "../../database/connection";

class Controller{
    //Exercicio 1
    //Criacao
    async createDisciplina(request: Request, response: Response){
        try{
            const {siglaDisciplina, nomeDisciplina, nroCreditos, idTurma} = request.body;
            const disciplina = {
                siglaDisciplina,
                nomeDisciplina,
                nroCreditos,
                idTurma,
            }
            await knex("Disciplina").insert(disciplina).then(responseDiscipline => {
                if(responseDiscipline){
                    return response.json({createdDsicipline: true, message: "Disciplina criada com sucesso."});
                }else{
                    return response.status(400).json({createdDsicipline: false, error: "Não foi possível criar a Disciplina."});
                }
            }).catch(err => {
                throw err;
            })
        }catch(err){
            return response.status(400).json({createdDsicipline: false, error: "Não foi possível criar a Disciplina.", errorStatus: err});
        }
    }
    
    async createAluno(request: Request, response: Response){
        try{
            const {nome, dataNascimento, cra, telefone, siglaFaculdade} = request.body;
            const aluno = {
                nomeAluno: nome,
                dataNascimento,
                cra,
                telefone,
                siglaFaculdade
            }
            await knex("Aluno").insert(aluno).then(responseStudent => {
                if(responseStudent){
                    return response.json({createdStudent: true});
                }else{
                    return response.json({createdStudent: false, error: "Não foi possível criar o Aluno."});
                }
            }).catch(err => {
                throw err;
            })
        }catch(err){
            return response.status(400).json({createdStudent: false, error: "Não foi possível criar o Aluno.", errorStatus: err});
        }
    }
    
    //Alteracao
    async updateDisciplina(request: Request, response: Response){
        try{
            const {siglaDisciplina, nomeDisciplina, nroCreditos} = request.body;
            const disciplinaDB = await knex('Disciplina').where('siglaDisciplina', siglaDisciplina).update({
                nomeDisciplina,
                nroCreditos
            }).catch(err => {
                throw err;
            });
            if (disciplinaDB) {
                return response.json({ updatedDisciplina: true, disciplinaDB });
            } else {
                return response.json({
                    updatedDisciplina: false,
                    error: "Não foi possível alterar as informações da Disciplina.",
                });
            }
        }catch(err){
            return response.status(400).json({updatedDisciplina: false, error: "Não foi possível alterar as informações da Disciplina.", errorStatus: err});
        }
    }

    async updateAluno(request: Request, response: Response){
        try{
            const {nome, dataNascimento, cra, telefone} = request.body;
            const id = request.params.id;
            const idInt = parseInt(id)
            const alunoDB = await knex('Aluno').where('idAluno', idInt).update({
                nomeAluno: nome,
                dataNascimento,
                cra,
                telefone
            }).catch(err => {
                throw err;
            });
            if (alunoDB) {
                return response.json({ updatedAluno: true, alunoDB });
            } else {
                return response.json({
                    updatedAluno: false,
                    error: "Não foi possível alterar as informações do Aluno.",
                });
            }
        }catch(err){
            return response.status(400).json({updatedDisciplina: false, error: "Não foi possível alterar as informações do Aluno.", errorStatus: err});
        }
    }

    //Exclusao
    async deleteDisciplina(request: Request, response: Response){
        try{
            const {siglaDisciplina} = request.body;
            const disciplinaDB = await knex('Disciplina').where('siglaDisciplina', siglaDisciplina).del().catch(err => {
                throw err;
            });
            if(disciplinaDB){
                return response.json({deletedDisciplina: true});
            }else{ 
                throw 'Não foi possível excluir a Disciplina.'
            }
        }catch(err){
            return response.status(400).json({updatedDisciplina: false, error: "Não foi possível excluir a Disciplina.", errorStatus: err});
        }
    }

    async deleteAluno(request: Request, response: Response){
        try{
            const {id} = request.params;
            const idInt = parseInt(id);
            const alunoDB = await knex('Aluno').where('idAluno', idInt).del().catch(err => {
                throw err;
            });
            if(alunoDB){
                return response.json({deletedAluno: true});
            }else{ 
                throw 'Não foi possível excluir o Aluno.'
            }
        }catch(err){
            return response.status(400).json({updatedDisciplina: false, error: "Não foi possível excluir o Aluno.", errorStatus: err});
        }
    }

    //Consultas
    async showAlunos(request: Request, response: Response){
        const alunos = await knex("Aluno").select("*");
        return response.json(alunos);
    }

    async showFaculdades(request: Request, response: Response){
        const faculdades = await knex("Faculdade").select("*");
        return response.json(faculdades);
    }

    async showTurma(request: Request, response: Response){
        const turmas = await knex("Turma").select("*");
        return response.json(turmas);
    }
    
    async showDisciplina(request: Request, response: Response){
        const disciplinas = await knex("Disciplina").select("*");
        return response.json(disciplinas);
    }

    //Exercicio 2
    async transactionExample(request: Request, response: Response){
        try{
            const {ano, nroAlunos, siglaFaculdade, idTurma} = request.body;
            if(!ano || !nroAlunos || !siglaFaculdade || !idTurma){
                throw 'Preencha todos os campos';
            }
            const trx = await knex.transaction();
            await trx('Turma').where("idTurma", idTurma).update({ano: ano}).catch(err => {throw err});
            await trx('Faculdade').where("siglaFaculdade", siglaFaculdade).update({nroAlunos: nroAlunos}).catch(err => {throw err});
            await trx.commit();
            return response.json({transactioned: true, message: "Transação realizada com sucesso."});
        }catch(err){
            response.status(400).json({transactioned: false, error: err})
        }
    }
}

export default Controller;