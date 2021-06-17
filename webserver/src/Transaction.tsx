import React, { FormEvent, useState } from 'react';

import api from './api';

const Transaction = (props: any) => {
    const [getAno, setAno] = useState('');
    const [getNroAlunos, setNroAlunos] = useState('');
    const [getSiglaFaculdade, setSiglaFaculdade] = useState('');
    const [getIdTurma, setIdTurma] = useState('');
    const [getStatusMessage, setStatusMessage] = useState('');

    async function handleSubmitCreateDiscipline(event: FormEvent){
        event.preventDefault();
        await api.put('/transacao', {
            ano: getAno, 
            nroAlunos: getNroAlunos, 
            siglaFaculdade: getSiglaFaculdade, 
            idTurma: getIdTurma
        }).then(response => {
            if(response.data.transactioned){
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
            <form className="bg-dark px-4 form" onSubmit={handleSubmitCreateDiscipline}>
                <a>Transação</a>
                <a className="h5"><br/>{getStatusMessage}</a>
                <div className="form-group">
                    <a className="h5">ID da turma a ser atualizado</a>
                    <input type="text" className="my-2 form-control" placeholder="Digite o id da turma" value={getIdTurma} onChange={e => setIdTurma(e.target.value)}/>
                </div>
                <div className="form-group">
                    <a className="h5">Ano da turma a ser atualizado</a>
                    <input type="text" className="my-2 form-control" placeholder="Digite o ano" value={getAno} onChange={e => setAno(e.target.value)}/>
                </div>
                <div className="form-group">
                    <a className="h5">Sigla da faculdade a ser atualizada</a>
                    <input type="text" className="my-2 form-control" placeholder="Digite a sigla" value={getSiglaFaculdade} onChange={e => setSiglaFaculdade(e.target.value)}/>
                </div>
                <div className="form-group">
                    <a className="h5">Número de alunos a ser atualizado</a>
                    <input type="text" className="my-2 form-control" placeholder="Digite o número de alunos" value={getNroAlunos} onChange={e => setNroAlunos(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Transacionar</button>
            </form>
        </>
    );
}

export default Transaction;