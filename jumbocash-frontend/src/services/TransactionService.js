import axios from 'axios';

//This is the service class to make REST requests to backend

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
const ENDPT_TRANSACTION = "transaction"
const ENDPT_SUMMARY = "summary"
const ENDPT_user = "user"

class TransactionService {

    //retrieve transactions based on user id
    getTransactionsByUserId(userId) {
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.get(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}/${ENDPT_user}/${userId}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

    getTransactionsByUserIdWithLimit(userId,limit) {
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.get(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}/${ENDPT_user}/${userId}?limit=${limit}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

    addTransaction(transaction){
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.post(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}`,transaction, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

    editTransaction(transaction){
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.patch(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}`,transaction, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

    deleteTransaction(transactionId){
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.delete(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}/${transactionId}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }
    
    getLastSixMonthsTransactionSummary(userId){
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.get(`${BACKEND_API_URL}/${ENDPT_TRANSACTION}/${ENDPT_SUMMARY}/${ENDPT_user}/${userId}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

}

export default new TransactionService()