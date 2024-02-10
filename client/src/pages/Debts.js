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

const Debts = () => {
  const [value, onChange] = useState(new Date());
  const [ type, setType ] = useState(null);
  const [ date, setDate ] = useState(null);
  const [ item, setItem ] = useState(null);
  const [ price, setPrice ] = useState(null);
  const [ cycle, setCycle ] = useState(null);
  const [ freq, setFreq ] = useState(null);
  const [ tableData, setTableData ] = useState([{type: 'grocery', item: '', price: 1, cycle: 'mo', frequency: 4, date: "02/09/24"}])
    
  useEffect(() => {
    console.log('date:', date)
  }, [date])
  const DebtForm = () => {
    return (
      <div>
        Debt Form
      </div>
    )
  }
  const addDebt = () => {
    console.log(date)
    let formattedDate = date.toISOString().split('T')[0];
    const dateArr = formattedDate.split('-');
    formattedDate = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];

    const debt = {
      type: type.label,
      date: formattedDate,
      item,
      price,
      cycle,
      frequency: freq
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
          <div className='app-planner-grid'>
            <div className='app-planner-header'>Debts</div>
            <div className='debts-2r2c-14h11w'></div>
            <div className='debts-2r3c-2h8w'>
              {false && <DebtBar addDebt={addDebt} />}
              <Select maxMenuHeight={150} 
              className=""
              value={type} 
              options={types} 
              onChange={(option) => setType(option)} 
              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />  
         
               <DatePicker className="debt-bar-element-date" selected={date} onChange={(date) => setDate(date)} />
           
              {false && <input className="debt-bar-element-date" placeholder='date' onChange={(e) => setDate(e.target.value)}/>}
              <input className="debt-bar-element-item" placeholder='item' onChange={(e) => setItem(e.target.value)} />
              <input className="debt-bar-element-price" placeholder='price' onChange={(e) => setPrice(e.target.value)} />
              <input className="debt-bar-element-cycle" placeholder='cycle' onChange={(e) => setCycle(e.target.value)} />
              <input className="debt-bar-element-freq" placeholder='freq' onChange={(e) => setFreq(e.target.value)} />
            <div className="debt-bar-element-add" style={{ color: "green" }} onClick={addDebt}>Add</div>  
            
            </div>
            <div className='debts-4r3c-13h8w'>
              <TableBasic data={tableData} />
            </div>
            <div className='debts-4r10c-13h3w'>
            {false && <DebtBar addDebt={addDebt} />}
            {JSON.stringify(date)}
            </div>

          </div>
        </div>
      </div>
    );
};

export default Debts;