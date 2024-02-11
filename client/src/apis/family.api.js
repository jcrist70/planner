import axios from 'axios';


export const getFamilyApi = async (debt) => {
    // console.log('-----> getFamilyApi')
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.get(
        process.env.REACT_APP_SERVER + '/get/family'
      );
      resolve(response);
    });
    // console.log('----------> getFamilyApi response:', promise)
    return promise;
};