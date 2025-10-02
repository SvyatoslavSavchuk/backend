import { useEffect } from "react";
import { ServerUrl } from "./constants";


export const fetchData = (url, method, data, callback) => {
    const params = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (method === 'POST' && data && typeof data === 'object') {
        params['body'] = JSON.stringify(data);
    }

    fetch(`${ServerUrl}/api/${url}`, params)
        .then(async (response) => {
            const results = await response.json();
            if (callback) {
                callback(results); // возвращаем весь объект
            }
        })
        .catch((e) => {
            console.log('error: ', e);
        });
};



export const fetchDataToken = (url, method, data, callback) => {
    const token = localStorage.getItem('token'); 
    const params = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    };

    if (method === 'POST' && data && typeof data === 'object') {
        params['body'] = JSON.stringify(data);
    }

    fetch(`${ServerUrl}/api/${url}`, params)
        .then(async (response) => {
            const results = await response.json();

            if (response.status === 401 || response.status === 403) {
                const msg = results?.message?.toLowerCase();

                if (msg?.includes('token') || msg?.includes('expired') || msg?.includes('invalid')) {
                    alert('Сессия истекла. Пожалуйста, войдите снова.');
                    localStorage.removeItem('token');
                    window.location.href = '/login'; 
                    return;
                }
            }
            if (callback) {
              callback(results);
            }
        })
        .catch((e) => {
            console.log('fetchDataToken error: ', e);
            if (callback) {
                callback({ status: 'FAILED', message: 'Ошибка сети' });
            }
        });
};

export const fetchDataFileToken = (url, method, data, callback, isFormData = false) => {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const params = {
        method,
        headers,
    };

    if (method === 'POST' && data) {
        if (isFormData) {
            // Ничего не делаем, браузер сам установит Content-Type с boundary
            params.body = data;
        } else {
            headers['Content-Type'] = 'application/json';
            params.body = JSON.stringify(data);
        }
    }

    fetch(`${ServerUrl}/api/${url}`, params)
        .then(async (response) => {
            const results = await response.json();

            if (response.status === 401 || response.status === 403) {
                const msg = results?.message?.toLowerCase();

                if (msg?.includes('token') || msg?.includes('expired') || msg?.includes('invalid')) {
                    alert('Сессия истекла. Пожалуйста, войдите снова.');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    return;
                }
            }

            if (callback) {
                callback(results);
            }
        })
        .catch((e) => {
            console.log('fetchDataFileToken error: ', e);
            if (callback) {
                callback({ status: 'FAILED', message: 'Ошибка сети' });
            }
        });
};

