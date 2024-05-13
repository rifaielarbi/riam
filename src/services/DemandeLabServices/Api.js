import axios from "axios";
import config from '../../config'
const BASE_URL = config.apiUrl


const AddDemande = async(Token,formData) =>{
 
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
        const response = await instance.post("/api/DemandeLab/addDemande",formData ); 
        return response.data;
      } catch (error) { 
          throw error.response 
      }
}


const GetliseDemandes = async (Token) =>{

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
        const response = await instance.get("/api/DemandeLab/GetDemandesList"); 
        return response.data;
      } catch (error) { 
          throw error.response 
      }
}

const DownloadDmFile = async (filename, Token) => {
  const options = {
    baseURL: BASE_URL,
    responseType: 'blob',
    headers: {
      // Accept: 'application/json',
      // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin': '*/*',
      Authorization: `Bearer ${Token}`,
    },
  };

  const instance = axios.create(options);

  try {
    const response = await instance.get(`/api/DemandeLab/DownloadFile?filename=${filename}`);
    return response;
  } catch (error) {
    throw error.response;
  }
};




export {AddDemande,GetliseDemandes,DownloadDmFile}
