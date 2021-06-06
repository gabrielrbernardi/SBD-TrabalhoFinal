import express from "express";
import Controller from "../controllers/Controller/Controller";

const routes = express.Router();
const controller = new Controller();

routes.post("/aluno", controller.createAluno);
routes.post("/disciplina", controller.createDisciplina);

routes.put("/aluno/:id", controller.updateAluno);
routes.put("/disciplina", controller.updateDisciplina);

routes.delete("/aluno/:id", controller.deleteAluno);
routes.delete("/disciplina", controller.deleteDisciplina);

routes.get("/aluno", controller.showAlunos);
routes.get("/faculdade", controller.showFaculdades);
routes.get("/turma", controller.showTurma);
routes.get("/disciplina", controller.showDisciplina);



routes.put("/transacao", controller.transactionExample);

export default routes;
