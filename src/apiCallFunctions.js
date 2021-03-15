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

export const createNewAccount = (username, firstName, lastName, city, password) => {
    console.log('attempting to create new user with the following information: ', username, firstName, lastName, city, password);
    return fetch(`${ENDPOINT}/createUser`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            username: username, 
            firstName: firstName, 
            lastName: lastName,
            city: city,
            password: password
        })
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}

export const getUsers = () => {
    console.log('attempting to FETCH all users in the database')
    return fetch(`${ENDPOINT}/all`, {
        method: 'GET'
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}

export const getPosts = () => {
    console.log('attempting to FETCH all posts in database')
    return fetch(`${ENDPOINT}/posts/all`, {
        method: 'GET'
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}

export const submitPost = (message, loggedInUserID) => {
    console.log(`attempting to CREATE a new post with id: ${loggedInUserID} and message: ${message}`)
    return fetch(`${ENDPOINT}/createPost`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            message: message,
            postedByID: loggedInUserID
        })
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}

export const getUser = (_id) => {
    console.log(`attempting to FETCH the user with id: ${_id}`)
    return fetch(`${ENDPOINT}/lookupUser/${_id}`, {
        method: 'GET'
    }).then(res => res.json())
    .then(data => JSON.parse(JSON.stringify(data)))
    .catch(error => error);
}