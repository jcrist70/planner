import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuid }from 'uuid';
import Modal from 'react-modal';


import TableAccounts from '../components/TableAccounts'
// APIS
import { getFamilyApi } from '../apis/family.api';
import { getAccountsApi, addAccountApi } from '../apis/account.api';
// REDUX 
import { setLoginStatus } from '../redux/user.slice';
import { setContext, setPage } from '../redux/app.slice';

const types = [
  {label: 'checking', value: 'checking'},
  {label: 'savings', value: 'savings'},
  {label: '401k', value: '401k'},
  {label: 'investment', value: 'investment'},
]

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {zIndex: 5000}
};

const Accounts = () => {
  const dispatch = useDispatch();
  const [ accounts, setAccounts ] = useState([]);
  const [ type, setType ] = useState(null);
  const [ institutuion, setInstitutuion ] = useState(null);
  const [ ballance, setBallance ] = useState(0);
  const [ transactions, setTransactions ] = useState([]);
  const [ targets, setTargets] = useState([]);
  const [ holders, setHolders] = useState([]);
  const [ tableData, setTableData ] = useState([]);
  const [ newHolder, setNewHolder ] = useState('');
  
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
    if (dbAccounts.data.err === 'Invalid or expired token') {
      console.log('NOT LOGGED IN')
      dispatch(setContext('login'));
      window.history.pushState({}, '', '/') ;
    }
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

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenNewChapter, setIsOpenNewChapter] = useState(false);
  function openModal() {
          setIsOpen(true);
        }
  function openModalNewChapter() {
        setIsOpenNewChapter(true);
    }
  function afterOpenModal() {
          // references are now sync'd and can be accessed.
          subtitle.style.color = '#f00';
        }
    async function closeModal() {
          setIsOpen(false);
          console.log('--> closeModal newHolder:', newHolder)
          // let newModule = {
          //   label: newModuleType.label + ": " + newModuleName,
          //   index: sortedModuleArr.length,
          //   visible: true,
          //   moduleType: newModuleType.label,
          //   value: null,
          // }
          // let newDbModule = null;
          // console.log("newModuleType:", newModuleType)
          
          // let update  = [...sortedModuleArr, newDbModule];
          // setSortedModuleArr(update);
          // const response = await updateModuleApi(idToken, db, newDbModule);
          // console.log("**response:", response.data)
          // newDbModule._id = response.data._id;
          // newDbModule.value = response.data._id;
          // console.log("**newDbModule:", newDbModule)
    }

    async function abortModal() {
        setIsOpen(false);
    }

  return (
      <div className='app-accounts-section'>
        <div className='app-accounts-container'>
          <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Create Module"
                ariaHideApp={false}
            >
                <h2 style={{ color: 'black' }} ref={(_subtitle) => (subtitle = _subtitle)}>Add Holder:</h2>
                
                <input type='text' placeholder='enter holder name' style={{ paddingLeft: '5px', margin: '3px',height: '35px', width: '250px' }} onChange={(e) => setNewHolder(e.target.value)}/>
                <br/><button style={{ margin: '3px', marginLeft: '25%', height: '35px', width: '120px' }} onClick={closeModal}>Done</button>
                <button style={{ margin: '3px', marginLeft: '25%', height: '35px', width: '120px' }} onClick={abortModal}>Cancle</button>
                
            </Modal>
          <div className='accounts-page-grid'>
            <div className='accounts-page-header'>Accounts</div>
            <div className='debts-2r1c-2h13w'>

              <Select maxMenuHeight={150} 
              className=""
              placeholder='select type'
              value={type} 
              options={types} 
              onChange={(option) => setType(option)} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} /> 

              <input className="account-bar-element-item" placeholder='institutuion' onChange={(e) => setInstitutuion(e.target.value)} />
              <input className="account-bar-element-ballance " placeholder='ballance' onChange={(e) => setBallance(e.target.value)} />   
               
              <div className="account-bar-element-add-holder" style={{ color: "green" }} onClick={openModal}>Add Holder</div>  
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