import axios from 'axios';


export const getYearApi = async (year) => {
    // console.log('-----> getYearApi')
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.post(
        process.env.REACT_APP_SERVER + '/get/year',
        { year });
      resolve(response);
    });
    console.log('----------> getYearApi response:', promise)
    return promise;
  };