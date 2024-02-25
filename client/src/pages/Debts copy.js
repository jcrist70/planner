import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuid }from 'uuid';

import TableDebts from '../components/TableDebts';
import DebtBar from '../components/DebtBar';
// APIS
import { getDebtsApi, addDebtApi } from '../apis/debt.api';
import { getFamilyApi } from '../apis/family.api';

const types = [
  {label: 'grocery', value: 'grocery'},
  {label: 'household', value: 'household'},
  {label: 'dining', value: 'dining'},
  {label: 'gas', value: 'gas'},
  {label: 'parking', value: 'parking'},
  {label: 'utility', value: 'util'},
  {label: 'clothing', value: 'clothing'},
  {label: 'gym', value: 'gym'},
  {label: 'insurance', value: 'insurance'},
  {label: 'tuition', value: 'tuition'},
]
const cycles = [
  {label: 'one time', value: 'one-time'},
  {label: 'day', value: 'day'},
  {label: 'week', value: 'week'},
  {label: 'month', value: 'month'},
  {label: 'year', value: 'year'},
  {label: 'multi-year', value: 'multi-year'},
]
const accounts = [
  {label: 'savings', value: 'savings'},
  {label: 'checking-blue', value: 'checking-blue'},
  {label: 'checking-red', value: 'checking-red'},
  {label: 'cc', value: 'cc'},
]
let suppliers = [
  {label: 'Amazon', value: '65c92a5790c8801d72a514f6'},
  {label: 'Market Basket', value: '65c9001790c8801d72a514ea'},
  {label: 'Hannaford', value: '65c92a1890c8801d72a514f5'},
  {label: 'COOP Hanover', value: '65c92a6590c8801d72a514f7'},
  {label: 'COOP Concord', value: '65c92a7890c8801d72a514f9'},
  {label: 'COOP Littleton', value: '65c92a7090c8801d72a514f8'},
  {label: 'NH Liquor', value: '65c92c1890c8801d72a514fc'},
  {label: 'Ralph Lauren', value: '65c92a8c90c8801d72a514fb'},
  {label: 'Target', value: '65c92c4290c8801d72a514fd'},
  {label: 'Wallmart', value: '65c92a8290c8801d72a514fa'},
  {label: 'Other', value: '65c92a0890c8801d72a514f4'},
]

const Debts = () => {
  const [ type, setType ] = useState(null);
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());
  const [ item, setItem ] = useState(null);
  const [ price, setPrice ] = useState(null);
  const [ cycle, setCycle ] = useState(null);
  const [ freq, setFreq ] = useState(null);
  const [ supplier, setSupplier ] = useState('default');
  const [ account, setAccount ] = useState(null);
  const [ tableData, setTableData ] = useState([]);
  // {type: 'grocery', item: '', price: 1, cycle: 'mo', frequency: 4, startDate: "02/09/24"}

  const { email } = useSelector((state) => state.user, shallowEqual);
  
  useEffect(() => {
    // getDebts();
    getFamily();
  }, [])

  useEffect(() => {
    console.log('date:', startDate)
  }, [startDate])

  useEffect(() => {
    console.log('cycle:', cycle)
    if (cycle && cycle.value === 'one-time') {
      console.log('setFreq 1')
      setFreq(1);
    }
  }, [cycle])

  const getFamily = async () => {
    const dbFamily = await getFamilyApi();
    console.log('dbFamily:', dbFamily.data.debtItems)
    if (dbFamily && dbFamily.data.debtItems.length > 0) {
      setTableData(dbFamily.data.debtItems);
    }
  }

  const DebtForm = () => {
    return (
      <div>
        Debt Form
      </div>
    )
  }

  // Add to an existing dar OR create a day to add it to
  // AND, if created a day, add that day to its week.  Creating
  // the week if it does not exist AND adding the week to its month.
  // Creating the month if it does not exist AND adding it to its year
  // creating the year if it sdoes not exist.
  const addDebt = () => {
    
    let formattedStartDate = startDate.toISOString().split('T')[0];
    let dateArr = formattedStartDate.split('-');
    formattedStartDate = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];
    let formattedEndDate = startDate.toISOString().split('T')[0];
    dateArr = formattedEndDate.split('-');
    formattedEndDate = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];

    const debt = {
      debtId: uuid(),
      type: type.label,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      item,
      price,
      cycle: cycle.label,
      frequency: freq,
      supplier: supplier.value,
      account: account.label,
    }
    console.log('addDebt debt:', debt)
    console.log('addDebt tableData:', tableData)
    // if (!Object.values(debt).includes(null)) {
    if (debt.type != null && debt.startDate != null && debt.item != null && debt.price != null && debt.account != null) {
      const data = [...tableData];
      data.push(debt);
      // data.push({type: 'util', item: 'firewood', price: 1410, cycle: 'mo', frequency: 1, date: "02/09/24"});
      console.log('addDebt data:', data)
      setTableData(data);
      addDebtApi(debt);
    } else {
      caches.delete('Every field must have a value!')
    }
    
  }

  return (
      <div className='app-debt-section'>
        <div className='app-debt-container'>
          <div className='debt-page-grid'>
            <div className='debt-page-header color-0p5-gry-1'>Debts</div>
            <div className='grid-2r1c-2h13w space-around color-1-orn-1'>

              {false && <DebtBar addDebt={addDebt} />}
              <Select maxMenuHeight={150} 
              className=""
              placeholder='select type'
              value={type} 
              options={types} 
              onChange={(option) => setType(option)} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />  
              <DatePicker className="debt-bar-element-start-date" selected={startDate} onChange={(date) => setStartDate(date)} />
              <DatePicker className="debt-bar-element-end-date" selected={endDate} onChange={(date) => setEndDate(date)} />
              <input className="debt-bar-element-item" placeholder='item' onChange={(e) => setItem(e.target.value)} />
              <input className="debt-bar-element-price" placeholder='price' onChange={(e) => setPrice(e.target.value)} />   
              <Select maxMenuHeight={150} 
              className=""
              placeholder='select cycle'
              value={cycle} 
              options={cycles} 
              onChange={(option) => setCycle(option)} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />       
              {false && <input className="debt-bar-element-cycle" placeholder='cycle' onChange={(e) => setCycle(e.target.value)} />}
              <input className="debt-bar-element-freq" style={{ display: cycle && cycle.value === 'one-time' ? 'none' : 'flex' }} placeholder='freq' onChange={(e) => setFreq(e.target.value)} />
              {false && <input className="debt-bar-element-supplier" placeholder='supplier' onChange={(e) => setSupplier(e.target.value)} />}
              <Select maxMenuHeight={150} 
              className=""
              placeholder='select supplier'
              value={supplier} 
              options={suppliers} 
              onChange={(option) => setSupplier(option)} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />  
              <Select maxMenuHeight={150} 
              className=""
              placeholder='select account'
              value={account} 
              options={accounts} 
              onChange={(option) => setAccount(option)} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />  
              <div className="debt-bar-element-add" style={{ color: "green" }} onClick={addDebt}>Add</div>  
            
            </div>
            <div className='grid-4r1c-13h11w'>
              <TableDebts data={tableData} />
            </div>
            <div className='grid-4r12c-13h2w color-0p4-orn-3'>
            </div>

          </div>
        </div>
      </div>
    );
};

export default Debts;