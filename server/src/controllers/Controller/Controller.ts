import { Request, Response } from "express";
import knex from "../../database/connection";

class Controller{
    
    async createDisciplina(request: Request, response: Response){
        const {siglaDisciplina, nomeDisciplina, nroCreditos, idTurma} = request.body;
        const disciplina = {
            siglaDisciplina,
            nomeDisciplina,
            nroCreditos,
            idTurma,
        }
        await knex("Disciplina").insert(disciplina).then(responseStudent => {
            if(responseStudent){
                return response.json({createdDsicipline: true});
            }else{
                return response.json({createdDsicipline: false, error: "Não foi possível criar a Disciplina."});
            }
        })
    }
    
    async createAluno(request: Request, response: Response){
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
        })
    }
    
    async updateDisciplina(request: Request, response: Response){
        const {siglaDisciplina, nomeDisciplina, nroCreditos} = request.body;
        const disciplinaDB = await knex('Disciplina').where('siglaDisciplina', siglaDisciplina).update({
            nomeDisciplina,
            nroCreditos
        });
        if (disciplinaDB) {
            return response.json({ updatedDisciplina: true, disciplinaDB });
        } else {
            return response.json({
                updatedDisciplina: false,
                error: "Não foi possível alterar as informações da Disciplina.",
            });
        }
    }

    async updateAluno(request: Request, response: Response){
        const {nome, dataNascimento, cra, telefone} = request.body;
        const {id} = request.params;
        const idInt = parseInt(id)
        const alunoDB = await knex('Aluno').where('idAluno', idInt).update({
            nomeAluno: nome,
            dataNascimento,
            cra,
            telefone
        });
        if (alunoDB) {
            return response.json({ updatedAluno: true, alunoDB });
        } else {
            return response.json({
                updatedAluno: false,
                error: "Não foi possível alterar as informações do Aluno.",
            });
        }
    }

    async deleteDisciplina(request: Request, response: Response){
        const {siglaDisciplina} = request.body;
        const disciplinaDB = await knex('Disciplina').where('siglaDisciplina', siglaDisciplina).del();
        if(disciplinaDB){
            return response.json({deletedDisciplina: true});
        }else{ 
            return response.json({deletedDisciplina: false});
        }
    }

    async deleteAluno(request: Request, response: Response){
        const {id} = request.params;
        const idInt = parseInt(id);
        const alunoDB = await knex('Aluno').where('idAluno', idInt).del();
        if(alunoDB){
            return response.json({deletedAluno: true});
        }else{ 
            return response.json({deletedAluno: false});
        }
    }

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
}

export default Controller;