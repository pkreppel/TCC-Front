import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users, children } = this.props;
        return (
            <div className="jumbotron">
                <div className="col-md-6 col-md-offset-3">
                    <h1>Olá {user.firstName}!</h1>
                    <p>Seja bem vindo ao Sistema de Controle Ambiental - SICA!</p>
                </div>
            </div>

            
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };