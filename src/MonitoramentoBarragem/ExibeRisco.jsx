import React, { Component } from 'react';
import {riscoService} from '../_services/risco.service'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import RiscoForm from './RiscoForm'

export class ExibeRisco extends Component {

    constructor() {
        super();    
        this.state = { 
            riscos: [], 
            carregando: true, 
            modal: false,
            nestedModal: false,
            closeAll: false};

        this.getRiscos();
        
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handelNew = this.handelNew.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getRiscos = this.getRiscos.bind(this);
    }
    getRiscos(){
        riscoService.getAll()
        .then(data => {this.setState({ riscos: data, carregando: false });});
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
    
    handleSave() {
        this.setState({
            carregando : true,
            riscos:[]
        });
        this.getRiscos();
        this.toggleAll();
    }
    handelNew() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            riscoEdit : null
        }));
    }
 
    handleDelete(id) {
        if (!window.confirm("Deseja realmente deletar este Risco?"))
            return;
        else {
           riscoService.delete(id)
            .then(data => {
                this.setState(
                    {
                        riscos: this.state.riscos.filter((rec) => {
                            return (rec.riscoID != id);
                        })
                    });
            });
        }
    }
    handleEdit(riscoEdit) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            riscoEdit : riscoEdit
        }));
    }
    render() {
        let contents = this.state.carregando
            ? <p><em>Carregando...</em></p>
            : this.renderRiscoTable(this.state.riscos);
        return <div>
            <h2 style={{ color :"#892610"}}>Monitoramento de Riscos</h2>
            <p>
                <Button color="primary" onClick={this.handelNew}>Criar Novo</Button>
            </p>
            {contents}
        </div>;
    }
    // Retorna uma tabela HTML para o método render().  
    renderRiscoTable(riscoLista) {
        return <div>
        <div className="table-responsive">
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th></th>
                    <th>Nome do Tipo de Risco</th>
                    <th>Criticidade</th>
                    <th>Local onde se aplica</th>
                    <th>Descrição do Risco</th>
                    <th>Data/Hora Cadastro</th>
                </tr>
            </thead>
            <tbody>
                {riscoLista.map(emp =>
                    <tr key={emp.riscoID}>
                        <td></td>
                        <td>{emp.nomeTipoRisco}</td>
                        <td>{emp.criticidade}</td>
                        <td>{emp.localTipoRisco}</td>
                        <td>{emp.descricaoRisco}</td>
                        <td>{emp.dataCadastro}</td>
                        <td style={{whiteSpace: "nowrap"}}>
                            <Button outline onClick={(id) => this.handleEdit(emp)} size="sm" color="primary">Editar</Button>{' '}
                            <Button outline onClick={(id) => this.handleDelete(emp.riscoID)} size="sm" color="danger">Deletar</Button>
                            
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Risco</ModalHeader>
            <ModalBody>
                <RiscoForm riscoEdit={this.state.riscoEdit} cancel={this.toggle} save={this.handleSave} showSuccesModal={this.toggleNested} />
                <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                    <ModalHeader>Risco</ModalHeader>
                    <ModalBody>Registro Salvo com Sucesso!</ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.handleSave}>OK</Button>
                    </ModalFooter>
                </Modal>
            </ModalBody>
        </Modal>
        </div>
        ;
    }
}
