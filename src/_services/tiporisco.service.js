import config from 'config';
import { authHeader } from '../_helpers';
import { userService } from './user.service';

export const tipoRiscoService = {
    getAll,
    delete: _delete,
    post,
    update
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const datax = fetch(`${config.apiUrl}/api/TipoRisco/`, requestOptions)
    .then(userService.handleResponse);
    return datax;
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/TipoRisco/${id}`, requestOptions)
    .then(userService.handleResponse);
}

function post(tipoRisco) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(tipoRisco)
    };

    return fetch(`${config.apiUrl}/api/TipoRisco/`, requestOptions)
    .then(userService.handleResponse);
}

function update(id, tipoRisco) {    
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(tipoRisco)
    };

    return fetch(`${config.apiUrl}/api/TipoRisco/${id}`, requestOptions)
    .then(userService.handleResponse);
}
