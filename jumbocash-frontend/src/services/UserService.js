import axios from 'axios';

//This is the service class to make REST requests to backend

const BACKEND_API_URL = "http://localhost:8080/v1";
const ENDPT_USER = "user"
const ENDPT_SUMMARY = "summary"
const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")

class UserService{

    addOrUpdateUser(user){
        
        return axios.put(`${BACKEND_API_URL}/${ENDPT_USER}`,user, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          });
    }

    getUserSummaryInfo(userId){
        return axios.get(`${BACKEND_API_URL}/${ENDPT_USER}/${ENDPT_SUMMARY}/${userId}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          });
    }

}

export default new UserService();