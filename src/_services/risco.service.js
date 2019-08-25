import config from 'config';
import { authHeader } from '../_helpers';
import { userService } from './user.service';

export const riscoService = {
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

    const datax = fetch(`${config.apiUrl}/api/Risco`, requestOptions)
    .then(userService.handleResponse);
    return datax;
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/Risco/${id}`, requestOptions)
    .then(userService.handleResponse);
}

function post(risco) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(risco)
    };

    return fetch(`${config.apiUrl}/api/Risco/`, requestOptions)
    .then(userService.handleResponse);
}

function update(id, risco) {    
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(risco)
    };

    return fetch(`${config.apiUrl}/api/Risco/${id}`, requestOptions)
    .then(userService.handleResponse);
}
