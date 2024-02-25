import axios from 'axios';


export const getDebtsApi = async (debt) => {
    // console.log('-----> getDebtsApi')
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.get(
        process.env.REACT_APP_SERVER + '/get/debts'
      );
      resolve(response);
    });
    // console.log('----------> getDebtsApi response:', promise)
    return promise;
  };

export const addDebtApi = async (debt) => {
    // console.log('-----> addDebt debt:', debt)
    const promise = await new Promise((resolve, reject) => {
      const axiosInstance = axios.create({
        withCredentials: true
      });
      const response = axiosInstance.post(
        process.env.REACT_APP_SERVER + '/add/debt',
        { debt },
      );
      resolve(response);
    });
    // console.log('----------> addDebt response:', promise)
    return promise;
  };

  