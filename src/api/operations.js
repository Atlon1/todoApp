import {API_URL, API_KEY} from "./data";


export const getOperations = async (id, successCallback) => {
    fetch(`${API_URL}/tasks/${id}/operations`, {
        headers: {
            'Authorization': API_KEY,
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.error === false && typeof successCallback === 'function') {
                successCallback(data.data);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

export const createOperation = async (id, operation, successCallback) => {
    fetch(`${API_URL}/tasks/${id}/operations`, {
        headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(operation)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error === false && typeof successCallback === 'function') {
                successCallback(data.data);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

export const updateOperation = async (id, operation, successCallback) => {
    fetch(`${API_URL}/operations/${id}`, {
        headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(operation)
    })
        .then(response => response.json())
        .then(data => {
            if (data.error === false && typeof successCallback === 'function') {
                successCallback(data.data);
            }
        })
        .catch(err => {
            console.log(err);
        })
}

export const deleteOperation = async (id, successCallback) => {
    fetch(`${API_URL}/operations/${id}`, {
        headers: {
            'Authorization': API_KEY,
        },
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            if (data.error === false && typeof successCallback === 'function') {
                successCallback(data.data);
            }
        })
        .catch(err => {
            console.log(err);
        })
}