import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-c1e56.firebaseio.com/'
})

export default instance;