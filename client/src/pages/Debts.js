import React from 'react';

import DebtBar from '../components/DebtBar';

const Debts = () => {

  const DebtForm = () => {
    return (
      <div>
      Debt Form
      </div>
    )
  }
    return (
        <div className='app-planner-section'>
        <div className='app-planner-container'>
          <div className='app-planner-grid'>
            <div className='app-planner-header'>Debts</div>
            <div className='debts-2r2c-14h11w'></div>
            <div className='debts-3r3c-12h4w'>
              <DebtForm />
            </div>
            <div className='debts-3r8c-12h4w'>
              <DebtBar index={new Date().toLocaleDateString()}/>
            </div>

          </div>
        </div>
      </div>
    );
};

export default Debts;