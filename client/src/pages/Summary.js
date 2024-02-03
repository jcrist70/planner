import React, { useEffect, useState } from 'react';
import { inc } from 'semver';

const Summary = () => {

    // BoA1, BoA2, Citi, Discover
    const [ creditCards, setCreditCards ] =  useState(14167+12232+7000+7000);
    const [ rent, setRent ] = useState(3500);
    // elec, verizon, storage
    const [ utilities, setUtilities ] = useState(241+283+75);
    // StateFarm, Unum
    const [ insurance, setInsurance ] = useState(140+120);
    // satRadio, 
    const [ subscriptions, setSubscriptions ] = useState(8);
    // 
    const [ tuition, setTuition ] = useState(1954);
    const [ debtArray, setDebtArray ] = useState([{label: "creditCards", value: creditCards}, {label: "rent", value: rent}, {label: "utilities", value: utilities}, {label: "insurance", value: insurance}, {label: "subscriptions", value: subscriptions}, {label: "tuition", value: tuition}]);

    // J, S
    const [ income, setIncome ] = useState(10167+4432);
    const [ checking, setChecking ] =  useState(8681);
    const [ savings, setSavings ] =  useState(19543);
    const [ creditsArray, setCreditsArray ] = useState([{label: "income", value: income}, {label: "checking", value: checking}, {label: "savings", value: savings}]);

    const [ totalCredits, setTotalCredits ] =  useState(0);
    const [ totalDebit, setTotalDebt ] = useState(0);


    useEffect(() => {
        setTotalCredits(checking+savings+income);
        const sortedArr = creditsArray.sort((a, b) => {return b.value-a.value})
        console.log('sortedArr:', sortedArr)
        setCreditsArray(sortedArr);
    }, [checking, savings, income]);
    useEffect(() => {
        setTotalDebt(creditCards+rent+utilities+insurance+subscriptions+tuition);
        const sortedArr = debtArray.sort((a, b) => {return b.value-a.value})
        console.log('sortedArr:', sortedArr)
        setDebtArray(sortedArr);
    }, [creditCards, rent, utilities, insurance, subscriptions, tuition]);

    return (
        <div className='app-planner-section'>
        <div className='app-planner-container'>
          <div className='app-planner-grid'>
            <div className='app-planner-header'>Summary</div>
            <div className="summary-headline"></div>
            <div className='app-planner-2r1c-1h1w'></div>
            <div className='app-planner-2r2c-1h1w'></div>
            <div className='app-planner-3r2c-1h1w'></div>
            <div className='app-planner-4r2c-9h1w'></div>

            <div className='summary-container'></div>
            <div className='summary-headline'>Total Worth: {totalCredits-totalDebit}</div>
            <div></div>
            <div className='app-planner-4r3c-1h9w'>
                <div className='summary-label'>Total Credits:</div>
                <div className='summary-value'>${totalCredits}</div>
            </div>
            <div className='app-planner-5r3c-1h9w'>
                <div className='summary-label'>Total Debt:</div>
                <div className='summary-value'>${totalDebit}</div>
            </div>
            <div className='app-planner-6r3c-1h9w'>
                <div className='summary-label'>Delta:</div>
                <div className='summary-value'>${totalCredits}-${totalDebit} = {totalCredits-totalDebit}</div>
            </div>

            <div className='app-planner-7r3c-1h9w summary-section-title'>Credits</div>
            <div className='app-planner-8r3c-3h9w'>
            <ul>
                {creditsArray && creditsArray.map((c) => {
                    return (
                        <li className='li-wrapper'>
                            <div className='summary-label'>+ {c.label}</div>
                            <div className='summary-value'>${c.value}</div>
                        </li>
                    )
                })}
            </ul>    
            </div>
            <div className="app-planner-11r3c-1h9w summary-section-title">Debts</div>
            <div className='app-planner-12r3c-3h9w'>
            <ul>
                {debtArray && debtArray.map((d) => {
                    return (
                        <li className='li-wrapper'>
                            <div className='summary-label'>- {d.label}</div>
                            <div className='summary-value'>${d.value}</div>
                        </li>
                    )
                })}  
            </ul>    
            </div>
            

            <div className='app-planner-4r12c-9h1w'></div>
            <div className='app-planner-2r11c-1h1w'></div>
            <div className='app-planner-2r10c-1h1w'></div>
            <div className='app-planner-3r10c-1h1w'></div>

          </div>
        </div>
      </div>
    );
};

export default Summary;


// <div className='app-planner-9r3c-1h9w'></div>
// <div className='app-planner-10r3c-1h9w'></div>
// <div className='app-planner-12r3c-1h9w'></div>

// <li className='li-wrapper'>
//                     <div className='summary-label'>- CreditCards</div>
//                     <div className='summary-value'>${creditCards}</div>
//                 </li>
//                 <li className='li-wrapper'>
//                     <div className='summary-label'>- rent</div>
//                     <div className='summary-value'>${rent}</div>
//                 </li>
//                 <li className='li-wrapper'>
//                     <div className='summary-label'>- utilities</div>
//                     <div className='summary-value'>${utilities}</div>
//                 </li>
//                 <li className='li-wrapper'>
//                     <div className='summary-label'>- insurance</div>
//                     <div className='summary-value'>${insurance}</div>
//                 </li>
//                 <li className='li-wrapper'>
//                     <div className='summary-label'>- subscriptions</div>
//                     <div className='summary-value'>${subscriptions}</div>
//                 </li>
//                 <li className='li-wrapper'>
//                     <div className='summary-label'>- tuition</div>
//                     <div className='summary-value'>${tuition}</div>
//                 </li>