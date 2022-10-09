
import axios from 'axios';

const url = 'http://localhost:3001/persons';

const create = (person) => {
    const requestPromise = axios.post(url, person);
    const dataPromise = requestPromise.then(response => response.data);
    return dataPromise;
}

const getAll = () => {
    const request = axios.get(url);
    return request.then(response => response.data);
}

const deletePerson = (person) => {
    return axios.delete(url + '/' + person.id);
}

const phonebook = { create, getAll, deletePerson };

export default phonebook;