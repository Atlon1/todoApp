import {API_URL, API_KEY} from "./data";


export const getTasks = (successCallback) => {
    fetch(`${API_URL}/tasks`, {
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


export const createTask = async (task, successCallback) => {
    fetch(`${API_URL}/tasks`, {
        headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(task)
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

export const updateTask = async (id, task, successCallback) => {
    fetch(`${API_URL}/tasks/${id}`, {
        headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(task)
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

export const deleteTask = async (id, successCallback) => {
    fetch(`${API_URL}/tasks/${id}`, {
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