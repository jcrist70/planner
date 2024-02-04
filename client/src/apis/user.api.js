import axios from 'axios';


export const loginUser = async (authtoken, email, user) => {
    // console.log('----------> setCurrentUserloginUser authtoken:', authtoken)
    // console.log('-----> loginUser user:', user)
    const config = {
      headers: {
        authtoken
      }
    };
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.post(
        process.env.REACT_APP_SERVER + '/user/login',
        { email, user },
        config
      );
      resolve(response);
    });
    // console.log('----------> loginUser response:', promise)
    return promise;
  };

  export const dbCheckRegistrationAuthorization = async (email) => {
    // console.log('----------> dbCheckRegistrationAuthorization email:', email)
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.post(
        process.env.REACT_APP_SERVER + '/user/check/registration/authorization',
        { email }
      );
      resolve(response);
    });
    // console.log('----------> loginUser response:', promise)
    return promise;
  };

  export const dbCreateUser = async (authtoken, email, user) => {
    // console.log('----------> dbCreateUser authtoken:', authtoken)
    // console.log('----------> dbCreateUser email:', email)
    // console.log('----------> dbCreateUser user:', user)
    const config = {
      headers: {
        authtoken
      }
    };
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.post(
        process.env.REACT_APP_SERVER + '/user/create',
        { email },
        config
      );
      resolve(response);
    });
    // console.log('----------> loginUser response:', promise)
    return promise;
  };

  export const dbCGetUser = async (authtoken, email) => {
    // console.log('----------> dbCGetUser authtoken:', authtoken)
    // console.log('----------> dbCGetUser email:', email)
    const config = {
      headers: {
        authtoken
      }
    };
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.post(
        process.env.REACT_APP_SERVER + '/user/get',
        { email },
        config
      );
      resolve(response);
    });
    // console.log('----------> dbCGetUser response:', promise)
    return promise;
  };