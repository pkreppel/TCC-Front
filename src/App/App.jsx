import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { Layout } from '../_components';
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

        const LoginContainer = () => (
            <div>
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
            </div>
          )

        const DefaultContainer = () => (
            <div>
            {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
                {window.location.pathname != "/login" && window.location.pathname != "/register" ?
                    <Layout>
                        <PrivateRoute exact path="/" component={HomePage}/>   
                        <PrivateRoute path='/exibe-tipo-risco' component={ExibeTipoRisco} />
                        <PrivateRoute path='/exibe-risco' component={ExibeRisco} />
                        <PrivateRoute path='/monitoramento' component={MonitoramentoBarragem} />
                    </Layout> : <div></div>}
            </div>
         ) 

        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <div>
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} /> 
                            <Route component={DefaultContainer}/> 
                        </div>
                    </Switch>
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