const ENDPOINT = 'http://localhost:9000/users';

export const authenticateUser = (username, password) => {
    return fetch(`${ENDPOINT}/authenticate`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}