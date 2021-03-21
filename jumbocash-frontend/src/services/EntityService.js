import axios from 'axios';

//This is the service class to make REST requests to backend

const BACKEND_API_URL = "http://localhost:8080/v1";
const ENDPT_TRANSACTION = "transaction"
const ENDPT_ENTITY = "entity"
const ENDPT_user = "user"

class EntityService{

    //retrieve transactions based on user id
    getEntitiesByUserId(usesrId) {
        return axios.get(`${BACKEND_API_URL}/${ENDPT_ENTITY}/${ENDPT_user}/${usesrId}`)
    }

}

export default new EntityService();