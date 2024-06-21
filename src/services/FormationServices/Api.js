import axios from "axios";
import config from '../../config'

const BASE_URL = config.apiUrl


const AddFormation = async(Token,formData) =>{
 
    const options = {
        baseURL: BASE_URL,
        responseType: 'json',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${Token}`

          },
    }
  
    const instance = axios.create(options)
      try {
        const response = await instance.post("api/Formation/PostFormation",formData ); 
        return response.data;
      } catch (error) { 
          throw error.response 
      }
}

export {AddFormation}
