import axios from 'axios';

//This is the service class to make REST requests to backend

const BACKEND_API_URL = "http://localhost:8080/v1";
const ENDPT_TRANSACTION = "transaction"
const ENDPT_ENTITY = "entity"
const ENDPT_USER = "user"

class UserService{

    addOrUpdateUser(user){
        return axios.put(`${BACKEND_API_URL}/${ENDPT_USER}`,user);
    }

}

export default new UserService();