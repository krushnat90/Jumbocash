import axios from 'axios';

//This is the service class to make REST requests to backend

const BACKEND_API_URL = "http://localhost:8080/v1";
const ENDPT_USER = "user"
const ENDPT_SUMMARY = "summary"

class UserService{

    addOrUpdateUser(user){
        return axios.put(`${BACKEND_API_URL}/${ENDPT_USER}`,user);
    }

    getUserSummaryInfo(userId){
        return axios.get(`${BACKEND_API_URL}/${ENDPT_USER}/${ENDPT_SUMMARY}/${userId}`);
    }

}

export default new UserService();