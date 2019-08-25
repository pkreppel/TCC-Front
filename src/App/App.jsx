import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ExibeContato, FetchData, Counter } from '../_components';
import { ExibeTipoRisco, ExibeRisco, MonitoramentoBarragem } from '../MonitoramentoBarragem'

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage}/>
                        <PrivateRoute path='/exibe-contato' component={ExibeContato} />
                        <PrivateRoute path='/counter' component={Counter} />
                        <PrivateRoute path='/fetch-data' component={FetchData} />
                        <PrivateRoute path='/exibe-tipo-risco' component={ExibeTipoRisco} />
                        <PrivateRoute path='/exibe-risco' component={ExibeRisco} />
                        <PrivateRoute path='/monitoramento' component={MonitoramentoBarragem} />
                        
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                    </div>
                </Router>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };