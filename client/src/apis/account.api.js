import axios from 'axios';


export const getAccountsApi = async (debt) => {
    // console.log('-----> getAccountsApi')
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.get(
        process.env.REACT_APP_SERVER + '/get/accounts'
      );
      resolve(response);
    });
    // console.log('----------> getAccountsApi response:', promise)
    return promise;
  };
  export const addAccountApi = async (account) => {
    // console.log('-----> addAccountApi account:', account)
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.post(
        process.env.REACT_APP_SERVER + '/add/account',
        { account },
      );
      resolve(response);
    });
    // console.log('----------> addAccountApi response:', promise)
    return promise;
  };