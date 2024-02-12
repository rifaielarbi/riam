import axios from "axios";
import config from '../../config'
// const BASE_URL = "http://3.22.188.65:8080"
const BASE_URL = config.apiUrl

const SaveProfile = async(Token,DataProfile) =>{
    const options = {
        baseURL: BASE_URL,
        responseType: 'json',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':"*/*",
            'Authorization': `Bearer ${Token}`
        },
    }
  
    const instance = axios.create(options)
      try {
        const response = await instance.post("/api/profile/addprofile",DataProfile ); 
        return response.data;
      } catch (error) { 
          throw error.response 
      }
}

const ChangeCompletProfile = async(Token,userId,value) =>{
    const DataPost = {
        userId : userId,
        value : value
    }
    const options = {
        baseURL: BASE_URL,
        responseType: 'json',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin':"*/*",
            'Authorization': `Bearer ${Token}`
        },
    }
  
    const instance = axios.create(options)
      try {
        const response = await instance.post("/api/profile/changecompletProfile",DataPost ); 
        return response.data;
      } catch (error) { 
          throw error.response 
      }
}




export {SaveProfile,ChangeCompletProfile}