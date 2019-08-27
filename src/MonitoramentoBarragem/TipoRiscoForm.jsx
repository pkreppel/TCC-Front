import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {tipoRiscoService} from '../_services/tiporisco.service';
import {Button} from 'reactstrap';


export default class TipoRiscoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tipoRisco: {
                nomeTipoRisco: this.props.tipoRiscoEdit ? this.props.tipoRiscoEdit.nomeTipoRisco : "",
                //tipoRiscoID: this.props.tipoRiscoEdit ? this.props.tipoRiscoEdit.tipoRiscoID : "",
                criticidade: this.props.tipoRiscoEdit ? this.props.tipoRiscoEdit.criticidadeID : "",
                localTipoRisco: this.props.tipoRiscoEdit ? this.props.tipoRiscoEdit.localTipoRisco : "",
                tipoRiscoID: this.props.tipoRiscoEdit ? this.props.tipoRiscoEdit.tipoRiscoID : "",
            },
            submitted: false,
            listaCriticidade: []
        };        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCriticidade = this.getCriticidade.bind(this);
    }

    componentDidMount(){
        this.getCriticidade();
    }

    getCriticidade(){
        tipoRiscoService.getAllCriticidade()
        .then(data => {this.setState({ listaCriticidade: data });});
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { tipoRisco } = this.state;
        this.setState({
            tipoRisco: {
                ...tipoRisco,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.setState({ submitted: true });
        const { tipoRisco } = this.state;
        if (tipoRisco.nomeTipoRisco && tipoRisco.criticidade && tipoRisco.localTipoRisco ) {
            debugger;
            if(this.props.tipoRiscoEdit != null) {
                tipoRiscoService.update(tipoRisco.tipoRiscoID, tipoRisco)
                .then(this.props.showSuccesModal);
            }
            else{
                tipoRisco.tipoRiscoID = 0;
                tipoRiscoService.post(tipoRisco)
                .then(this.props.showSuccesModal);
            }
            
        }
    }   

    render() {
        const { registering  } = this.props;
        const { tipoRisco, submitted, listaCriticidade } = this.state;
        return (
            <div>
                <form name="form">
                    <div className={'form-group' + (submitted && !tipoRisco.nomeTipoRisco ? ' has-error' : '')}>
                        <label htmlFor="nomeTipoRisco">Nome do Tipo de Risco</label>
                        <input type="text" className="form-control" name="nomeTipoRisco" value={tipoRisco.nomeTipoRisco} onChange={this.handleChange}/>
                        {submitted && !tipoRisco.nomeTipoRisco &&
                            <div className="help-block" style={{color:"red"}}>Nome do Tipo de Risco é obrigatório</div>
                        }
                    </div>
                    
                    <div className={'form-group' + (submitted && !tipoRisco.criticidade ? ' has-error' : '')}>
                        <label htmlFor="criticidade">Criticidade</label>
                        <select className="form-control" name="criticidade" onChange={this.handleChange}>
                        <option key={0} value={""}>Selecione...</option>
                        {listaCriticidade.map(item=> 
                            <option key={item.criticidadeID} value={item.criticidadeID} selected={this.props.tipoRiscoEdit && (item.criticidadeID == this.props.tipoRiscoEdit.criticidadeID)} >{item.tituloCriticidade}</option>
                        )}
                        </select>
                        {submitted && !tipoRisco.criticidade &&
                            <div className="help-block" style={{color:"red"}}>Criticidade é obrigatório</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !tipoRisco.localTipoRisco ? ' has-error' : '')}>
                        <label htmlFor="localTipoRisco">Local onde se aplica</label>
                        <input type="text" className="form-control" name="localTipoRisco" value={tipoRisco.localTipoRisco} onChange={this.handleChange} />
                        {submitted && !tipoRisco.localTipoRisco &&
                            <div className="help-block" style={{color:"red"}}>Local onde se aplica é obrigatório</div>
                        }
                    </div>
                    <Button color="danger" id="btnCancel" onClick={this.props.cancel}>Cancelar</Button>{' '}
                    <Button color="primary" type="submit" onClick={this.handleSubmit} id="btnSubmit">Salvar</Button>{' '}
                </form>
            </div>
        );
    }
}
