import axios from "axios";
import config from '../../config'
// const BASE_URL = "http://3.22.188.65:8080"
const BASE_URL = config.apiUrl





  // const UpdateAccount = async (Data,Token) => {
  //   const options = {
  //     baseURL: BASE_URL,
  //     responseType: 'json',
  //     headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         'Access-Control-Allow-Origin':"*/*",
  //         'Authorization': `Bearer ${Token}`
  //     },
  // }
  
  // const instance = axios.create(options)
  //   try {
  //     const response = await instance.post("/account/Updateaccount",Data); 
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };



  const AuthLogin = async (email, password) => {
    const Data = {
      "email" : email,
      "password": password
    }
    const options = {
      baseURL: BASE_URL,
      responseType: 'json',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':"*/*",
      },
  }
  
  const instance = axios.create(options)
    try {
      const response = await instance.post("/api/auth/signin",Data); 
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  const AuthSignup = async (fullname,email, password,role) => {
    const Data = {
      "email" : email,
      "password": password,
      "fullname": fullname,
      "role": role
    }
    console.log(Data)
    const options = {
      baseURL: BASE_URL,
      responseType: 'json',
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':"*/*",
      },
  }
  
  const instance = axios.create(options)
    try {
      const response = await instance.post("/api/auth/signup",Data); 
      return response.data;
    } catch (error) {
      throw error;
    }
  };






  

  export {AuthLogin,AuthSignup};