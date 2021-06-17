import React, { FormEvent, useState } from 'react';

import api from './api';

const Student = (props: any) => {
    const [getIdAluno, setIdAluno] = useState('');
    const [getNomeAluno, setNomeAluno] = useState('');
    const [getNascimentoAluno, setNascimentoAluno] = useState('');
    const [getCraAluno, setCraAluno] = useState('');
    const [getTelefoneAluno, setTelefoneAluno] = useState('');
    const [getSiglaFaculdade, setSiglaFaculdade] = useState('');
    const [getStatusMessage, setStatusMessage] = useState('');

    async function handleSubmitCreateDiscipline(event: FormEvent){
        event.preventDefault();
        await api.post('/aluno', {
            nome: getNomeAluno, 
            dataNascimento: getNascimentoAluno, 
            cra: getCraAluno, 
            telefone: getTelefoneAluno, 
            siglaFaculdade: getSiglaFaculdade
        }).then(response => {
            if(response.data.createdStudent){
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
        var id = parseInt(getIdAluno);
        await api.put(`/aluno/${id}`, {
            nome: getNomeAluno, 
            dataNascimento: getNascimentoAluno, 
            cra: getCraAluno, 
            telefone: getTelefoneAluno, 
        }).then(response => {
            if(response.data.updatedAluno){
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
        { props.create == 1
            ?
                <form className="bg-dark px-4 form" onSubmit={handleSubmitCreateDiscipline}>
                    <a>Cadastro de Aluno</a>
                    <a className="h5"><br/>{getStatusMessage}</a>
                    <div className="form-group">
                        <a className="h5">Nome do aluno</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite o nome" value={getNomeAluno} onChange={e => setNomeAluno(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <a className="h5">Data de nascimento</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite a data de nascimento" value={getNascimentoAluno} onChange={e => setNascimentoAluno(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <a className="h5">CRA</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite o CRA" value={getCraAluno} onChange={e => setCraAluno(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <a className="h5">Telefone</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite o telefone" value={getTelefoneAluno} onChange={e => setTelefoneAluno(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <a className="h5">Sigla Faculdade</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite a sigla" value={getSiglaFaculdade} onChange={e => setSiglaFaculdade(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            :
                <form className="bg-dark px-4 form" onSubmit={handleSubmitUpdateDiscipline}>
                    <a>Atualização de Aluno</a>
                    <a className="h5"><br/>{getStatusMessage}</a>
                    <div className="form-group">
                        <a className="h5">Id do Aluno</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite o nome" value={getIdAluno} onChange={e => setIdAluno(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <a className="h5">Nome do aluno</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite o nome" value={getNomeAluno} onChange={e => setNomeAluno(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <a className="h5">Data de nascimento</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite a data de nascimento" value={getNascimentoAluno} onChange={e => setNascimentoAluno(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <a className="h5">CRA</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite o CRA" value={getCraAluno} onChange={e => setCraAluno(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <a className="h5">Telefone</a>
                        <input type="text" className="my-2 form-control" placeholder="Digite o telefone" value={getTelefoneAluno} onChange={e => setTelefoneAluno(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
        }
        </>
    );
}

export default Student;