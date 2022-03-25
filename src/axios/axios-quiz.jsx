import axios from 'axios'

export default axios.create({
    baseURL: 'https://reactquiz-62bc6-default-rtdb.firebaseio.com/'
})