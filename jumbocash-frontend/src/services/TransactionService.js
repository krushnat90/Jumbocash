import axios from 'axios';

//This is the service class to make REST requests to backend

const BACKEND_API_URL = "http://localhost:8080/v1";
const ENDPT_TRANSACTION = "transaction"
const ENDPT_SUMMARY = "summary"
const ENDPT_user = "user"
const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")


class TransactionService {

    //retrieve transactions based on user id
    getTransactionsByUserId(userId) {
        return axios.get(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}/${ENDPT_user}/${userId}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

    getTransactionsByUserIdWithLimit(userId,limit) {
        return axios.get(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}/${ENDPT_user}/${userId}?limit=${limit}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

    addTransaction(transaction){
        return axios.post(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}`,transaction, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }
    
    getLastSixMonthsTransactionSummary(userId){
        return axios.get(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}/${ENDPT_SUMMARY}/${ENDPT_user}/${userId}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

}

export default new TransactionService()