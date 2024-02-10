import React, { useState } from 'react';
import Select from 'react-select';

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

const DebtBar = ({ addDebt }) => {
    // console.log("---> ChapterBar: chapter", chapter)
    const [ type, setType ] = useState(null);
    const [ date, setDate ] = useState(new Date().toLocaleDateString());
    const [ item, setItem ] = useState(null);
    const [ price, setPrice ] = useState(null);
    const [ cycle, setCycle ] = useState(null);
    const [ freq, setFreq ] = useState(null);

    const handleAddDebt = async () => {
        const debt = {
            type,
            date,
            item,
            price,
            cycle,
            frequency: freq
        }
        console.log('debt:', debt)
        addDebt(debt);
    }
    const handleRemoveDebt = async () => {
        // await removeModule(module);
    }
    const handleUpArrow = () => {
        // console.log('UP:', chapter.label)
        // upArrow(module);
    }
    const handleDownArrow = () => {
        // console.log('DOWN:', chapter.label)
        // downArrow(module);
    }
    const edit = () => {
        // handleDebtEdit(module);
    }


    return (
        <div className="debt-bar" onClick={edit}>

            {false &&<input className="debt-bar-element-type" placeholder='type' onChange={(e) => setType(e.target.value)}/> }
            
            

            <input className="debt-bar-element-date" placeholder='date' onChange={(e) => setDate(e.target.value)}/>
            <input className="debt-bar-element-item" placeholder='item' onChange={(e) => setItem(e.target.value)} />
            <input className="debt-bar-element-price" placeholder='price' onChange={(e) => setPrice(e.target.value)} />
            <input className="debt-bar-element-cycle" placeholder='cycle' onChange={(e) => setCycle(e.target.value)} />
            <input className="debt-bar-element-freq" placeholder='freq' onChange={(e) => setFreq(e.target.value)} />
            <div className="debt-bar-element-add" style={{ color: "green" }} onClick={handleAddDebt}>Add</div>  
            
        </div>
    );
};

export default DebtBar;