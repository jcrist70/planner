import React, { useEffect, useState } from 'react';
import { inc } from 'semver';

const Summary = () => {

    // BoA1, BoA2, Citi, Discover
    const [ creditCards, setCreditCards ] =  useState(14167+12232+7000+7000);
    const [ creditCardsMonthly, setCreditCardsMonthly ] =  useState(373+100+82+136);
    const [ creditCardTotalsArray, setCreditCardTotalsArray ] = useState([{label: "BoA1", value: 14167, interest: 16}, {label: "BoA2", value: 12232, interest: 0}, {label: "Citi", value: 7000, interest: 0}, {label: "Discover", value: 7000, interest: 0}])
    const [ creditCardMonthlyArray, setCreditCardMonthlyArray ] = useState([{label: "BoA1", value: 373, interest: 16}, {label: "BoA2", value: 100, interest: 0}, {label: "Citi", value: 82, interest: 0}, {label: "Discover", value: 136, interest: 0}])
    
    const [ rent, setRent ] = useState(3500);
    // Cadillac
    const [ carPayment, setCarPayment ] = useState(448.35);
    const [ carLoan, setCarLoan ] = useState(24720);
    // elec, verizon, storage, oil
    const [ utilities, setUtilities ] = useState(241+283+75+0);
    const [ utilitiesArray, setUtilitiesArray ] = useState([{label: "electric", value: 241}, {label: "verizon", value: 283}, {label: "storage", value: 75}, {label: "oil", value: 0}])
    // StateFarm, Unum
    const [ insurance, setInsurance ] = useState(140+120);
    // netflix, satRadio, googleWorkspace, googleCloud, AWS, DigitalOcean
    const [ subscriptions, setSubscriptions ] = useState(16 + 8 + 6 + 14 + 24 + 15);
    const [ subscriptionArray, setSubscriptionArray ] = useState([{label: "netflix", value: 16}, {label: "satRadio", value: 8}, {label: "googleWorkspace", value: 6}, {label: "googleCloud", value: 14}, {label: "AWS", value: 24}, {label: "digitalOcean", value: 15}, {label: "chatGPT", value: 0}, {label: "AmazonPrime", value: 12}])
    // 
    const [ tuition, setTuition ] = useState(1954);
    // grocery, autoGass, resturant, clothing, gym
    const [ living, setLiving ] = useState(936+252+840+458+135);
    const [ livingArray, setLivingArray ] = useState([{label: "grocery", value: 936}, {label: "autoGas", value: 252}, {label: "resturant", value: 840}, {label: "clothing", value: 458}, {label: "gym", value: 135}]);
    const [ debtArray, setDebtArray ] = useState([{label: "carPayment", value: carPayment}, {label: "creditCardsMonthly", value: creditCardsMonthly}, {label: "rent", value: rent}, {label: "utilities", value: utilities}, {label: "insurance", value: insurance}, {label: "subscriptions", value: subscriptions}, {label: "tuition", value: tuition}, {label: "living", value: living}]);
    const [ sumDebtArray, setSumDebtArray ] = useState(0);
    // J, S, Scar
    const [ income, setIncome ] = useState(10167+4432+476);
    const [ checking, setChecking ] =  useState(8681);
    const [ savings, setSavings ] =  useState(19543);
    // Sarah, Jason
    const [ investment401k, setInvestment401k ] = useState(84875+47);
    const [ creditsArray, setCreditsArray ] = useState([{label: "income", value: income}, {label: "checking", value: checking}, {label: "savings", value: savings}, {label: '401k', value: investment401k}]);

    const [ totalCredits, setTotalCredits ] =  useState(0);
    const [ totalDebit, setTotalDebt ] = useState(0);


    useEffect(() => {
        setTotalCredits(checking+savings+income+investment401k);
        const sortedArr = creditsArray.sort((a, b) => {return b.value-a.value})
        console.log('sortedArr:', sortedArr)
        setCreditsArray(sortedArr);
    }, [checking, savings, income]);
    useEffect(() => {
        // Total Debt Monthly
        setTotalDebt(carLoan+creditCards+rent+utilities+insurance+subscriptions+tuition+living);
        
        let sortedArr = debtArray.sort((a, b) => {return b.value-a.value})
        console.log('debt sortedArr:', sortedArr)
        setDebtArray(sortedArr);

        const sum = debtArray.map(item => item.value).reduce((prev, next) => prev + next);
        setSumDebtArray(sum);
        sortedArr = subscriptionArray && subscriptionArray.sort((a, b) => {return b.value-a.value})
        console.log('subscription sortedArr:', sortedArr)
        setSubscriptionArray(sortedArr);
        sortedArr = livingArray && livingArray.sort((a, b) => {return b.value-a.value})
        console.log('livingArray sortedArr:', sortedArr)
        setLivingArray(sortedArr);
        sortedArr = utilitiesArray && utilitiesArray.sort((a, b) => {return b.value-a.value})
        console.log('utilitiesArray sortedArr:', sortedArr)
        setUtilitiesArray(sortedArr);
    }, [creditCards, rent, utilities, insurance, subscriptions, tuition]);

    return (
        <div className='app-planner-section'>
        <div className='app-planner-container'>
          <div className='app-planner-grid'>
            <div className='summary-header'>Summary</div>
            <div className='app-planner-2r1c-1h1w'></div>
            <div className='app-planner-2r2c-1h1w'></div>
            <div className='app-planner-3r2c-1h1w'></div>
            <div className='app-planner-4r2c-9h1w'></div>

            <div className='summary-container'>
                <div className='summary-headline'><div>Total Worth: {totalCredits-totalDebit}</div><div>Total Worth wo/401k: {totalCredits-totalDebit-investment401k}</div></div>
            </div>

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
            <ul style={{ marginLeft: -12 }}>
                {creditsArray && creditsArray.map((c) => {
                    return (
                        <li key={c.label} className='li-wrapper'>
                            <div className='summary-label'>+ {c.label}</div>
                            <div className='summary-value'>${c.value}</div>
                        </li>
                    )
                })}
            </ul>    
            </div>
            <div className="app-planner-11r3c-1h9w summary-section-title">Debts</div>
            <div className='app-planner-12r3c-3h9w'>
            <ul style={{ marginLeft: -12 }}>
                {debtArray && debtArray.map((d) => {
                    return (
                        <li key={d.label} className='li-wrapper'>
                            <div className='summary-label'>- {d.label}</div>
                            <div className='summary-value'>${d.value}</div>
                        </li>
                    )
                })} 
                <li className='li-wrapper'>
                    <div className='summary-label'>- Total Monthly Expenses:</div>
                    <div className='summary-value'>${sumDebtArray}</div>
                </li> 
            </ul>    
            </div>
            <div className='app-planner-15r3c-1h9w'>
                <div className='summary-label'>Current CC Debt:</div>
                <div className='summary-value'>${creditCards}</div>
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