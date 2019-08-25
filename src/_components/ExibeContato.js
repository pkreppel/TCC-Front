import React, { Component } from 'react';
import config from 'config';
import { Link } from 'react-router-dom';
import { authHeader } from '../_helpers';

export class ExibeContato extends Component {
    constructor() {
        super();    
        this.state = { contatoLista: [], carregando: true };
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        fetch(`${config.apiUrl}/api/Contatos/`, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ contatoLista: data, carregando: false });
            });
        // este binding é necessário para que o 'this' funcione no callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    render() {
        let contents = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderContatoTable(this.state.contatoLista);
        return <div>
            <h1>Contatos</h1>
            <p>Dados dos contatos obtidos do servidor.</p>
            <p>
                <Link to="/addcontato">Criar Novo</Link>
            </p>
            {contents}
        </div>;
    }
    // Trata a solicitação Delete  para um contato  
    handleDelete(id) {
        if (!window.confirm("Deseja deletar o contato com id : " + id))
            return;
        else {
            const requestOptions = {
                method: 'DELETE',
                headers: authHeader()
            };
            fetch(`${config.apiUrl}/api/Contatos/Delete/` + id, requestOptions
            ).then(data => {
                this.setState(
                    {
                        contatoLista: this.state.contatoLista.filter((rec) => {
                            return (rec.contatoId != id);
                        })
                    });
            });
        }
    }
    handleEdit(id) {
        this.props.history.push("/contato/edit/" + id);
    }
    // Retorna uma tabela HTML para o método render().  
    renderContatoTable(contatoLista) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>ContatoId</th>
                    <th>Nome</th>
                    <th>Sexo</th>
                    <th>Email</th>
                    <th>Cidade</th>
                </tr>
            </thead>
            <tbody>
                {contatoLista.map(emp =>
                    <tr key={emp.contatoId}>
                        <td></td>
                        <td>{emp.contatoId}</td>
                        <td>{emp.nome}</td>
                        <td>{emp.sexo}</td>
                        <td>{emp.email}</td>
                        <td>{emp.cidade}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(emp.contatoId)}>Editar</a>  |
                                <a className="action" onClick={(id) => this.handleDelete(emp.contatoId)}>Deletar</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
