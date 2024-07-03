import axios from "axios";
import config from '../../config'
// const BASE_URL = "http://3.22.188.65:8080"
const BASE_URL = config.apiUrl


const SaveFile = async (formData) =>{
    // const DataFile = {
    //     "UserId" : UserId,
    //     "fileName" : fileName,
    //     "filepath" : filepath,
    //     "acces" : acces
    // }
    // console.log(DataFile)

    const options = {
        baseURL: BASE_URL,
        responseType: 'json',
        headers: {
            'Content-Type': 'multipart/form-data',
          },
    }
  
    const instance = axios.create(options)
      try {
        const response = await instance.post("/api/files/saveFile",formData ); 
        return response.data;
      } catch (error) { 
          throw error.response 
      }
}

const SaveUserFile = async (formData) =>{
  // const DataFile = {
  //     "UserId" : UserId,
  //     "fileName" : fileName,
  //     "filepath" : filepath,
  //     "acces" : acces
  // }
  // console.log(DataFile)

  const options = {
      baseURL: BASE_URL,
      responseType: 'json',
      headers: {
          'Content-Type': 'multipart/form-data',
        },
  }

  const instance = axios.create(options)
    try {
      const response = await instance.post("/api/UserFile/saveFile",formData ); 
      return response.data;
    } catch (error) { 
        throw error.response 
    }
}


const GetlistFiles = async (Role,Token)  => {
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
    const response = await instance.get("/api/files/listFiles?Role=" + Role ); 
    return response.data;
  } catch (error) { 
      throw error.response 
  }
}

const GetlistUserFiles = async (userId,Token)  => {
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
    const response = await instance.get("/api/UserFile/listFiles?userId=" + userId ); 
    return response.data;
  } catch (error) { 
      throw error.response 
  }
}


const DownloadFile = async (filename, Token) => {
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
    const response = await instance.get(`/api/files/download?filename=${filename}`);
    return response;
  } catch (error) {
    throw error.response;
  }
};



export {SaveFile,GetlistFiles,DownloadFile,SaveUserFile,GetlistUserFiles}
