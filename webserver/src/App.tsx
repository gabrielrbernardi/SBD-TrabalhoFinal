import React, { FormEvent, useState } from 'react';
import api from './api';
import './App.css';
import Discipline from './Discipline';
import Transaction from './Transaction';
import Student from './Student';

function App() {
  const [getListContent, setListContent] = useState('');

  const [getCreateDiscipline, setCreateDiscipline] = useState(Number);
  const [getCreateStudent, setCreateStudent] = useState(Number);
  const [getUpdateDiscipline, setUpdateDiscipline] = useState(Number);
  const [getUpdateStudent, setUpdateStudent] = useState(Number);
  const [getList, setList] = useState(Number);
  const [getDelete, setDelete] = useState(Number);
  const [getTransaction, setTransaction] = useState(Number);
  
  const [getPkDelete, setPkDelete] = useState('');
  const [getPlaceholder, setPlaceHolder] = useState('');
  const [getLabel, setLabel] = useState('');

  const [getStatusMessage, setStatusMessage] = useState('');
  
  async function listComponents(valor: Number){
    if(valor == 1){ //Listagem de Aluno
      await api.get('/aluno').then(response => {
        var contentList = JSON.stringify(response.data);
        setListContent(contentList)
      })
    }else if(valor == 2){ //Listagem de Disciplina
      await api.get('/disciplina').then(response => {
        var contentList = JSON.stringify(response.data);
        setListContent(contentList)
      })
    }else if(valor == 3){ //Listagem de Turma
      await api.get('/turma').then(response => {
        var contentList = JSON.stringify(response.data);
        setListContent(contentList)
      })
    }else if(valor == 4){ //Listagem de Faculdade
      await api.get('/faculdade').then(response => {
        var contentList = JSON.stringify(response.data);
        setListContent(contentList)
      })
    }
  }

  async function handleSubmitDelete(event: FormEvent){
    event.preventDefault();
    if(getDelete == 1){ //Exclusao de disciplina
      await api.put('/disciplina/delete', {
        siglaDisciplina: getPkDelete,
      }).then(() => {
        setStatusMessage("Disciplina exclu??da com sucesso.")
      }).catch(err => {
        setStatusMessage(err.response.data.error);
      })
    }else if(getDelete == 2){ //Exclusao de aluno
      var id = parseInt(getPkDelete)
      await api.put(`/aluno/delete/${id}`).then(() => {
        setStatusMessage("Aluno exclu??do com sucesso.")
      }).catch(err => {
        setStatusMessage(err.response.data.error);
      })
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <a className="mb-2">Trabalho Final SBD</a>
        { getCreateDiscipline === 1
          ?
            <>
              <Discipline create="1"/>
                <div className="bg-dark">
                  <button className="btn btn-info my-2 form col-2" onClick={() => setCreateDiscipline(0)}>Voltar</button>
                </div>
            </>
          : <></>
        }

        { getCreateStudent === 1
          ?
            <>
              <Student create="1"/>
              <div className="bg-dark">
                <button className="btn btn-info my-2 form col-2" onClick={() => setCreateStudent(0)}>Voltar</button>
              </div>
            </>
          : <></>
        }

        { getUpdateDiscipline === 1
          ?
          <>
              <Discipline create="2"/>
              <div className="bg-dark">
                <button className="btn btn-info my-2 form col-2" onClick={() => setUpdateDiscipline(0)}>Voltar</button>
              </div>
            </>
          : <></>
        }

        { getUpdateStudent === 1
          ?
            <>
              <Student create="2"/>
              <div className="bg-dark">
                <button className="btn btn-info my-2 form col-2" onClick={() => setUpdateStudent(0)}>Voltar</button>
              </div>
            </>
          : <></>
        }


        { getList === 1
          ?
          <>
              <div className="d-flex justify-content-center container col-6">
                <div className="row">
                  <button className="btn btn-primary col mx-2" onClick={() => listComponents(1)}>Listar Alunos</button>
                  <button className="btn btn-primary col mx-2" onClick={() => listComponents(2)}>Listar Disciplinas</button>
                  <button className="btn btn-primary col mx-2" onClick={() => listComponents(3)}>Listar Turmas</button>
                  <button className="btn btn-primary col mx-2" onClick={() => listComponents(4)}>Listar Faculdades</button>
                  <br/>
                  <textarea disabled className="mt-2 textarea" value={getListContent}></textarea>
                    <button className="btn btn-primary col-2 mx-auto" onClick={() => setListContent('')}>Limpar</button>
                  <div className="">
                    <button className="btn btn-info my-2 form col-2" onClick={() => setList(0)}>Voltar</button>
                  </div>
                </div>
              </div>
            </>
          : <></>
        }
        
        { getDelete === 1
          ?
          <>
            <form className="bg-dark px-4 form" onSubmit={handleSubmitDelete}>
              <a className="h5">{getStatusMessage}</a>
              <div className="bg-dark">
                <div className="form-group">
                  <a className="h5">{getLabel}</a>
                  <input type="text" className="my-2 form-control" placeholder={getPlaceholder} value={getPkDelete} onChange={e => setPkDelete(e.target.value)}/>
                </div>            
              </div>
              <button type="submit" className="btn btn-danger">Excluir</button>
            </form>
            <div className="bg-dark">
              <button className="btn btn-info my-2 form col-2" onClick={() => {setDelete(0); setStatusMessage(''); setPkDelete('')}}>Voltar</button>
            </div>
          </>
          : getDelete === 2
            ?
            <>
              <form className="bg-dark px-4 form" onSubmit={handleSubmitDelete}>
                <a className="h5">{getStatusMessage}</a>
                <div className="bg-dark">
                  <div className="form-group">
                    <a className="h5">{getLabel}</a>
                    <input type="text" className="my-2 form-control" placeholder={getPlaceholder} value={getPkDelete} onChange={e => setPkDelete(e.target.value)}/>
                  </div>            
                </div>
                <button type="submit" className="btn btn-danger">Excluir</button>
              </form>
              <div className="bg-dark">
                <button className="btn btn-info my-2 form col-2" onClick={() =>{setDelete(0); setStatusMessage('');  setPkDelete('')}}>Voltar</button>
              </div>
            </>
            :<></>

        }
        
        { getTransaction === 1
          ?
            <>
              <Transaction/>
              <div className="bg-dark">
                <button className="btn btn-info my-2 form col-2" onClick={() => setTransaction(0)}>Voltar</button>
              </div>
            </>
          : <></>
        }

        { getCreateDiscipline === 0 && getCreateStudent === 0 && getUpdateDiscipline === 0 && getUpdateStudent === 0 && getList === 0 && getDelete === 0 && getTransaction === 0
          ?
            <div className="d-flex justify-content-center container">
              <div className="row">
                <button className="btn btn-success col mx-2" onClick={() => setCreateDiscipline(1)}>Criar Disciplina</button>
                <button className="btn btn-success col mx-2" onClick={() => setCreateStudent(1)}>Criar Aluno</button>
                <button className="btn btn-primary col mx-2" onClick={() => setUpdateDiscipline(1)}>Atualizar Disciplina</button>
                <button className="btn btn-primary col mx-2" onClick={() => setUpdateStudent(1)}>Atualizar Aluno</button>

                <button className="btn btn-secondary col mx-2" onClick={() => setList(1)}>Listar</button>
                
                <button className="btn btn-danger col mx-2" onClick={() => {setDelete(1); setLabel('Sigla da disciplina a ser exclu??da'); setPlaceHolder('Digite a Sigla');}}>Excluir Disciplina</button>
                <button className="btn btn-danger col mx-2" onClick={() => {setDelete(2); setLabel('ID do aluno a ser exclu??do'); setPlaceHolder('Digite o ID');}}>Excluir Aluno</button>
                <button className="btn btn-light col mx-2" onClick={() => {setTransaction(1)}}>Transa????o</button>
              </div>
            </div>
          :<></>
        }
        <a className="mt-2 link" href="https://github.com/gabrielrbernardi/SBD-TrabalhoFinal" target="_blank">Github</a>

      </div>
    </div>
  );
}

export default App;
