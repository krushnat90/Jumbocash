import axios from 'axios';

//This is the service class to make REST requests to backend

const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
const ENDPT_ENTITY = "entity"
const ENDPT_user = "user"

class EntityService{

    //retrieve transactions based on user id
    getEntitiesByUserId(usesrId) {
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.get(`${BACKEND_API_URL}/${ENDPT_ENTITY}/${ENDPT_user}/${usesrId}`, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          })
    }

    addEntity(entity){
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.post(`${BACKEND_API_URL}/${ENDPT_ENTITY}`,entity, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          });
    }

    editEntity(entity){
      const TOKEN_ID = sessionStorage.getItem("JUMBO_TOKEN_ID")
        return axios.patch(`${BACKEND_API_URL}/${ENDPT_ENTITY}`,entity, {
            headers: {
              'AUTH_GOOGLE_TOKEN': TOKEN_ID
            }
          });
    }

}

export default new EntityService();