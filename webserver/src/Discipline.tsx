import React, { FormEvent, useState } from 'react';

import api from './api';

const Discipline = (props: any) => {
    const [getSiglaDisciplina, setSiglaDisciplina] = useState('');
    const [getDisciplina, setDisciplina] = useState('');
    const [getNroCreditosDisciplina, setNroCreditosDisciplina] = useState('');
    const [getTurmaDisciplina, setTurmaDisciplina] = useState('');
    const [getStatusMessage, setStatusMessage] = useState('');

    async function handleSubmitCreateDiscipline(event: FormEvent){
        event.preventDefault();
        await api.post('/disciplina', {
            siglaDisciplina: getSiglaDisciplina, 
            nomeDisciplina: getDisciplina, 
            nroCreditos: getNroCreditosDisciplina, 
            idTurma: getTurmaDisciplina
        }).then(response => {
            if(response.data.createdDsicipline){
                setStatusMessage(response.data.message);
            }else{
                setStatusMessage(response.data.error);
            }
        }).catch(err => {
            console.log(err.response.data.error)
            setStatusMessage(err.response.data.error);
        })
    }
    
    async function handleSubmitUpdateDiscipline(event: FormEvent){
        event.preventDefault();
        await api.put('/disciplina', {
            siglaDisciplina: getSiglaDisciplina, 
            nomeDisciplina: getDisciplina, 
            nroCreditos: getNroCreditosDisciplina, 
        }).then(response => {
            if(response.data.updatedDisciplina){
                setStatusMessage(response.data.message);
            }else{
                setStatusMessage(response.data.error);
            }
        }).catch(err => {
            console.log(err.response.data.error)
            setStatusMessage(err.response.data.error);
        })
    }

    return(
        <>
            {props.create == 1
                ?
                    <form className="bg-dark px-4 form" onSubmit={handleSubmitCreateDiscipline}>
                        <a>Cadastro de disciplina</a>
                        <a className="h5"><br/>{getStatusMessage}</a>
                        <div className="form-group">
                            <a className="h5">Sigla da disciplina</a>
                            <input type="text" className="my-2 form-control" placeholder="Digite a sigla" value={getSiglaDisciplina} onChange={e => setSiglaDisciplina(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <a className="h5">Nome da disciplina</a>
                            <input type="text" className="my-2 form-control" placeholder="Digite o nome" value={getDisciplina} onChange={e => setDisciplina(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <a className="h5">Quantidade de créditos</a>
                            <input type="text" className="my-2 form-control" placeholder="Digite a quantidade de créditos" value={getNroCreditosDisciplina} onChange={e => setNroCreditosDisciplina(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <a className="h5">Id da turma onde a disciplina será criada</a>
                            <input type="text" className="my-2 form-control" placeholder="Digite o id da turma" value={getTurmaDisciplina} onChange={e => setTurmaDisciplina(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                : 
                    <form className="bg-dark px-4 form" onSubmit={handleSubmitUpdateDiscipline}>
                        <a>Atualização de disciplina</a>
                        <a className="h5"><br/>{getStatusMessage}</a>
                        <div className="form-group">
                            <a className="h5">Sigla da disciplina</a>
                            <input type="text" className="my-2 form-control" placeholder="Digite a sigla" value={getSiglaDisciplina} onChange={e => setSiglaDisciplina(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <a className="h5">Nome da disciplina</a>
                            <input type="text" className="my-2 form-control" placeholder="Digite o nome" value={getDisciplina} onChange={e => setDisciplina(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <a className="h5">Quantidade de créditos</a>
                            <input type="text" className="my-2 form-control" placeholder="Digite a quantidade de créditos" value={getNroCreditosDisciplina} onChange={e => setNroCreditosDisciplina(e.target.value)}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Atualizar</button>
                    </form>
            }
        </>
    );
}

export default Discipline;