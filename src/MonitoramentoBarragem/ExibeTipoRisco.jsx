import React, { Component } from 'react';
import {tipoRiscoService} from '../_services/tiporisco.service';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import TipoRiscoForm from './TipoRiscoForm'

export class ExibeTipoRisco extends Component {
    constructor() {
        super();    
        this.state = { tiposRisco: [], carregando: true };
        
        this.getTiposRisco();
        
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handelNew = this.handelNew.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getTiposRisco = this.getTiposRisco.bind(this);
    }

    getTiposRisco(){
        tipoRiscoService.getAll()
        .then(data => {this.setState({ tiposRisco: data, carregando: false });});
    }

    toggleNested() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }

    toggleAll() {
        this.setState({
            nestedModal: false,
            modal: false,
            closeAll: true
        });
    }
    handelNew() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            tipoRiscoEdit : null
        }));
    }
    handleDelete(id) {
        if (!window.confirm("Deseja realmente deletar este Tipo de Risco"))
            return;
        else {
            tipoRiscoService.delete(id)
            .then(data => {
                this.setState(
                    {
                        tiposRisco: this.state.tiposRisco.filter((rec) => {
                            return (rec.tipoRiscoID != id);
                        })
                    });
            });
        }
    }
    handleEdit(tipoRiscoEdit) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            tipoRiscoEdit : tipoRiscoEdit
        }));
    }
    handleSave() {
        this.setState({
            carregando : true,
            tiposRisco:[]
        });
        this.getTiposRisco();
        this.toggleAll();
    }
    render() {
        let contents = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderTipoRiscoTable(this.state.tiposRisco);
        return <div>
            <h2 style={{ color :"#892610"}}>Tipos de Risco</h2>
            <p>
                <Button color="primary" onClick={this.handelNew}>Criar Novo</Button>
            </p>
            {contents}
        </div>;
    }
    // Retorna uma tabela HTML para o método render().  
    renderTipoRiscoTable(tipoRiscoLista) {
        return <div>
        <div className="table-responsive">
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nome do Tipo de Risco</th>
                    <th>Criticidade</th>
                    <th>Local onde se aplica</th>
                </tr>
            </thead>
            <tbody>
                {tipoRiscoLista.map(emp =>
                    <tr key={emp.tipoRiscoID}>
                        <td></td>
                        <td>{emp.nomeTipoRisco}</td>
                        <td>{emp.critidadeNome}</td>
                        <td>{emp.localTipoRisco}</td>
                        <td>
                            <Button outline disabled={!emp.editDelete} onClick={(id) => this.handleEdit(emp)} size="sm" color="primary">Editar</Button>{' '}
                            <Button outline disabled={!emp.editDelete} onClick={(id) => this.handleDelete(emp.tipoRiscoID)} size="sm" color="danger">Deletar</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Tipo de Risco</ModalHeader>
            <ModalBody>
                <TipoRiscoForm tipoRiscoEdit={this.state.tipoRiscoEdit} cancel={this.toggle} save={this.handleSave} showSuccesModal={this.toggleNested} />
                <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                    <ModalHeader>Tipo de Risco</ModalHeader>
                    <ModalBody>Registro Salvo com Sucesso!</ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.handleSave}>OK</Button>
                    </ModalFooter>
                </Modal>
            </ModalBody>
        </Modal>
        </div>;
       
    }
}
