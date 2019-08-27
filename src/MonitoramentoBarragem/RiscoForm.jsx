import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import {tipoRiscoService} from '../_services/tiporisco.service';
import {riscoService} from '../_services/risco.service';
import {Button} from 'reactstrap';


export default class RiscoForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            risco: {
                descricaoRisco: this.props.riscoEdit ? this.props.riscoEdit.descricaoRisco : "",
                tipoRiscoID: this.props.riscoEdit ? this.props.riscoEdit.tipoRiscoID : "",
                riscoID: this.props.riscoEdit ? this.props.riscoEdit.riscoID : "",
            },
            submitted: false,
            listaTipoRisco: []
        };        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTipoRisco = this.getTipoRisco.bind(this);
    }

    componentDidMount(){
        this.getTipoRisco();
    }

    getTipoRisco(){
        tipoRiscoService.getAll()
        .then(data => {this.setState({ listaTipoRisco: data });});
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { risco } = this.state;
        this.setState({
            risco: {
                ...risco,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        this.setState({ submitted: true });
        const { risco } = this.state;
        if (risco.descricaoRisco && risco.tipoRiscoID) {
            
            if(this.props.riscoEdit != null) {
                riscoService.update(risco.riscoID, risco)
                .then(this.props.showSuccesModal);
            }
            else{
                risco.riscoID = 0;
                riscoService.post(risco)
                .then(this.props.showSuccesModal);
            }
            
        }
    }   

    render() {
        const { registering  } = this.props;
        const { risco, submitted, listaTipoRisco } = this.state;
        return (
            <div>
                <form name="form">
                    <div className={'form-group' + (submitted && !risco.tipoRiscoID ? ' has-error' : '')}>
                        <label htmlFor="tipoRisco">Tipo de Risco</label>
                        <select className="form-control" name="tipoRiscoID" onChange={this.handleChange}>
                        <option key={0} value={""}>Selecione...</option>
                        {listaTipoRisco.map(item=> 
                            <option key={item.tipoRiscoID} value={item.tipoRiscoID} selected={this.props.riscoEdit && (item.tipoRiscoID == this.props.riscoEdit.tipoRiscoID)} >{item.nomeTipoRisco}</option>
                        )}
                        </select>
                        {submitted && !risco.tipoRiscoID &&
                            <div className="help-block" style={{color:"red"}}>Tipo de Risco é obrigatório</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !risco.descricaoRisco ? ' has-error' : '')}>
                        <label htmlFor="descricaoRisco">Descrição do Risco</label>
                        <textarea type="text" className="form-control" name="descricaoRisco" value={risco.descricaoRisco} onChange={this.handleChange} />
                        {submitted && !risco.descricaoRisco &&
                            <div className="help-block" style={{color:"red"}} >Descrição é Obrigatória</div>
                        }
                    </div>
                    <Button color="danger" id="btnCancel" onClick={this.props.cancel}>Cancelar</Button>{' '}
                    <Button color="primary" type="submit" onClick={this.handleSubmit} id="btnSubmit">Salvar</Button>{' '}
                </form>
            </div>
        );
    }
}

/*function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRiscoPage = connect(mapState, actionCreators)(CadastroRisco);
export { connectedRiscoPage as CadastroRisco };*/