import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const productUrl = `${publicRuntimeConfig.apiUrl}/product`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    logout,
    register,
    update,
    getProductlist,
    delete: _delete
};

function login(username, password) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
        .then(user => {
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

function register(user) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
}

function getProductlist() {
    
    return fetchWrapper.CusPost(`${productUrl}/list`);
    
}


function update(id, params) {
    return fetchWrapper.put(`${baseUrl}/${id}`, params)
        .then(x => {

            if (id === userSubject.value.id) {
                const user = { ...userSubject.value, ...params };
                localStorage.setItem('user', JSON.stringify(user));
                userSubject.next(user);
            }
            return x;
        });
}

function _delete(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}