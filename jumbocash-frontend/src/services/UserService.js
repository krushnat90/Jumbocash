import axios from 'axios';

//This is the service class to make REST requests to backend

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
const ENDPT_USER = "user"
const ENDPT_SUMMARY = "summary"

class UserService{

    addOrUpdateUser(user){
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.put(`${BACKEND_API_URL}/${ENDPT_USER}`,user, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          });
    }

    getUserSummaryInfo(userId){
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.get(`${BACKEND_API_URL}/${ENDPT_USER}/${ENDPT_SUMMARY}/${userId}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          });
    }

}

export default new UserService();