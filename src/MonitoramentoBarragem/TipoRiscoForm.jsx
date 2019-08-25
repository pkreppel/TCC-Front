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
                nomeTipoRisco: this.props.tipotipoRiscoEdit ? this.props.tipoRiscoEdit.nomeTipoRisco : "",
                //tipoRiscoID: this.props.tipoRiscoEdit ? this.props.tipoRiscoEdit.tipoRiscoID : "",
                criticidade: this.props.tipoRiscoEdit ? this.props.tipoRiscoEdit.criticidade : "",
                localTipoRisco: this.props.tipoRiscoEdit ? this.props.tipoRiscoEdit.localTipoRisco : "",
            },
            submitted: false
        };        

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            
            if(this.props.tipoRiscoEdit != null) {
                //this.props.tipoRiscoEdit.nomeTipoRisco = risco.descricaoRisco;
                //this.props.tipoRiscoEdit.tipoRiscoID = risco.tipoRiscoID;
            
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
        const { tipoRisco, submitted } = this.state;
        return (
            <div>
                <form name="form">
                    <div className={'form-group' + (submitted && !tipoRisco.nomeTipoRisco ? ' has-error' : '')}>
                        <label htmlFor="nomeTipoRisco">Nome do Tipo de Risco</label>
                        <input type="text" className="form-control" name="nomeTipoRisco" value={tipoRisco.nomeTipoRisco} onChange={this.handleChange}/>
                        {submitted && !tipoRisco.nomeTipoRisco &&
                            <div className="help-block">Nome do Tipo de Risco é obrigatório</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !tipoRisco.criticidade ? ' has-error' : '')}>
                        <label htmlFor="criticidade">Criticidade</label>
                        <input type="text" className="form-control" name="criticidade" value={tipoRisco.criticidade} onChange={this.handleChange}/>
                        {submitted && !tipoRisco.criticidade &&
                            <div className="help-block">Criticidade é obrigatório</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !tipoRisco.localTipoRisco ? ' has-error' : '')}>
                        <label htmlFor="localTipoRisco">Local onde se aplica</label>
                        <input type="text" className="form-control" name="localTipoRisco" value={tipoRisco.localTipoRisco} onChange={this.handleChange} />
                        {submitted && !tipoRisco.localTipoRisco &&
                            <div className="help-block">Local onde se aplica é obrigatório</div>
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