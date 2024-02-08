import axios from "axios";
import config from '../../config'
// const BASE_URL = "http://3.22.188.65:8080"
const BASE_URL = config.apiUrl


const GetlisteMembers = async (UserId,Token) =>{
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
        const response = await instance.get("/api/Members/GetListMembers?UserId=" + UserId ); 
        return response.data;
      } catch (error) { 
          throw error.response 
      }
}

const UpdateMemberRole = async (UserId,MemberID,Role,Token) =>{
    const DataPost = {
        "UserId" : UserId,
        "MemberId" : MemberID,
        "Role" : Role
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
        const response = await instance.post("/api/Members/UpdateRoleMember",DataPost ); 
        return response.data;
      } catch (error) { 
          throw error.response 
      }
}

export {GetlisteMembers,UpdateMemberRole}
