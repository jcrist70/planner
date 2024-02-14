import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuid }from 'uuid';

import TableAccounts from '../components/TableAccounts'
// APIS
import { getFamilyApi } from '../apis/family.api';
import { getAccountsApi, addAccountApi } from '../apis/account.api';

const types = [
  {label: 'checking', value: 'checking'},
  {label: 'savings', value: 'savings'},
  {label: '401k', value: '401k'},
  {label: 'investment', value: 'investment'},
]

const Accounts = () => {
  const [ accounts, setAccounts ] = useState([]);
  const [ type, setType ] = useState(null);
  const [ institutuion, setInstitutuion ] = useState(null);
  const [ ballance, setBallance ] = useState(0);
  const [ transactions, setTransactions ] = useState([]);
  const [ targets, setTargets] = useState([]);
  const [ holders, setHolders] = useState([]);
  const [ tableData, setTableData ] = useState([]);
  
  const { email } = useSelector((state) => state.user, shallowEqual);
  
  useEffect(() => {
    getFamily();
    getAccounts();
  }, [])

  const getFamily = async () => {
    const dbFamily = await getFamilyApi();
    console.log('dbFamily:', dbFamily.data.debtItems)
    if (dbFamily) {
      if (dbFamily.data.debtItems.length > 0) {
        setTableData(dbFamily.data.debtItems);
      }
    }
  }
  const getAccounts = async () => {
    console.log('GET ACCOUNTS')
    const dbAccounts = await getAccountsApi();
    console.log('getAccounts dbAccounts.data:', dbAccounts.data)
    if (dbAccounts.data) {
      if (dbAccounts.data.length > 0) {
        console.log('getAccounts dbAccounts.data:', dbAccounts.data)
        setAccounts(dbAccounts.data);
      }
    }
  }

  const addAccount = () => {
    
    const account = {
      accountId: uuid(),
      type: type.label,
      institutuion,
      ballance,
      transactions,
      targets,
      holders: [],
    }
    console.log('addAccounts account:', account)
    console.log('addAccounts tableData:', tableData)
    if (!Object.values(account).includes(null)) {
      const data = [...tableData];
      data.push(account);
      console.log('addAccounts data:', data)
      setTableData(data);
      addAccountApi(account);
    } else {
      console.log('Every field must have a value!')
    }
    
  }

  const addHolder = () => {

  }

  return (
      <div className='app-planner-section'>
        <div className='app-planner-container'>
          <div className='debt-page-grid'>
            <div className='debt-page-header'>Accounts</div>
            <div className='debts-2r1c-2h13w'>

              <Select maxMenuHeight={150} 
              className=""
              placeholder='select type'
              value={type} 
              options={types} 
              onChange={(option) => setType(option)} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} /> 

              <input className="debt-bar-element-item" placeholder='institutuion' onChange={(e) => setInstitutuion(e.target.value)} />
              <input className="debt-bar-element-price" placeholder='ballance' onChange={(e) => setBallance(e.target.value)} />   
              
              
              <div className="account-bar-element-add-holder" style={{ color: "green" }} onClick={addHolder}>Add Holder</div>  
            
              <div className="account-bar-element-add-account" style={{ color: "green" }} onClick={addAccount}>Add</div>  
            
            </div>
            <div className='debts-4r1c-13h11w'>
              <TableAccounts data={accounts} />
            </div>
            <div className='debts-4r12c-13h2w'>
            </div>

          </div>
        </div>
      </div>
    );
};

export default Accounts;