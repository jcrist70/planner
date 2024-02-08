import React from 'react';

const DebtBar = ({ debt = {label: 'googleWorkspace', value: 1300}, index = 0 }) => {
    // console.log("---> ChapterBar: chapter", chapter)

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

            <div className="debt-bar-element-index">{index}</div>
            <div className="debt-bar-element-title">{debt.label}</div>
            <div className="debt-bar-element-amount">{debt.value}</div>
            <div className="debt-bar-element-x" style={{ color: "red" }} onClick={handleRemoveDebt}>
            <p className="chapter-ber-element">X</p></div>  
            
        </div>
    );
};

export default DebtBar;