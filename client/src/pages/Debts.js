import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TableBasic from '../components/TableBasic';
import DebtBar from '../components/DebtBar';

const types = [
  {label: 'grocery', value: 'grocery'},
  {label: 'dining', value: 'dining'},
  {label: 'gas', value: 'gas'},
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
  {label: 'Amazon', value: 'amazon'},
  {label: 'Market Basket', value: 'market-basket'},
  {label: 'Hannaford', value: 'hannaford'},
  {label: 'COOP Hanover', value: 'coop-hanover'},
  {label: 'COOP Concord', value: 'coop-concord'},
  {label: 'COOP Littleton', value: 'coop-littleton'},
  {label: 'NH Liquor', value: 'nh-liquor'},
  {label: 'Ralph Lauren', value: 'ralph-lauren'},
  {label: 'Target', value: 'target'},
  {label: 'Wallmart', value: 'wallmart'},
  {label: 'Other', value: 'other'},
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

  const DebtForm = () => {
    return (
      <div>
        Debt Form
      </div>
    )
  }
  const addDebt = () => {
    console.log(startDate)
    let formattedDate = startDate.toISOString().split('T')[0];
    const dateArr = formattedDate.split('-');
    formattedDate = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];

    const debt = {
      type: type.label,
      startDate: formattedDate,
      item,
      price,
      cycle: cycle.label,
      frequency: freq,
      supplier: supplier.label,
      account: account.label,
    }
    console.log('addDebt debt:', debt)
    if (!Object.values(debt).includes(null)) {
      const data = [...tableData];
      data.push(debt);
      // data.push({type: 'util', item: 'firewood', price: 1410, cycle: 'mo', frequency: 1, date: "02/09/24"});
      console.log('addDebt data:', data)
      setTableData(data);
    } else {
      caches.delete('Every field must have a value!')
    }
    
  }

  return (
      <div className='app-planner-section'>
        <div className='app-planner-container'>
          <div className='debt-page-grid'>
            <div className='debt-page-header'>Debts</div>
            <div className='debts-2r1c-2h13w'>

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
              <input className="debt-bar-element-freq" style={{ display: cycle.value === 'one-time' ? 'none' : 'flex' }} placeholder='freq' onChange={(e) => setFreq(e.target.value)} />
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
            <div className='debts-4r1c-13h11w'>
              <TableBasic data={tableData} />
            </div>
            <div className='debts-4r12c-13h2w'>
            {false && <DebtBar addDebt={addDebt} />}
            </div>

          </div>
        </div>
      </div>
    );
};

export default Debts;