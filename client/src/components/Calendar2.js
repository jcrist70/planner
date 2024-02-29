import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import dayjs from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { range } from "ramda";
import classNames from "classnames";

const daysOfWeek = [
    {index: 0, label: "#"},
    {index: 1, label: "Monday"},
    {index: 2, label: "Tuesday"},
    {index: 3, label: "Wednesday"},
    {index: 4, label: "Thursday"},
    {index: 5, label: "Friday"},
    {index: 6, label: "Saturday"},
    {index: 7, label: "Sunday"},
  ];

// Generate calendar
// iff year, month exist load it (RTKq?)
// else generate days, weeks, month and year in DB by user/holder
const Calendar = ({ selectedDate, data }) => {
    console.log('!!!! selectedDate:',selectedDate)
    console.log('!!!! data:', data)
    console.log('!!!! data.months:', data.months)
     const date = new Date(selectedDate);
    // const [ date, setDate ] = useState(new Date(selectedDate));
    const [ year, setYear ] = useState(date.getFullYear());
    const [ month, setMonth ] = useState(date.getMonth());
    const [ monthData, setMonthData ] = useState({});

    const [ dbYear, setDbYear ] = useState({});
    const [ firstDay, setFirstDay ] = useState('')
    const [ skipNumber, setSkiopNumber ] = useState(0);
    const [ daysInMonth, setDaysInMonth ] = useState(30);
    const [ weekNumber, setWeekNumber ] = useState(0);

    const [ months, setmonths ] = useState(data.months);
    const [ weeks, setWeeks ] = useState(null);

    useEffect(() => {
      // getYear();
      const allMonthData = data.months;
      console.log('allMonthData:', allMonthData)
      console.log('month selected:', month+1)
      let selectedMonthData = {};
      allMonthData && allMonthData.forEach((m, i) => {
        console.log('i, m:', i, m)
        if (m.number === month+1) {
          selectedMonthData = m;
        }   
      })
      console.log('selectedMonthData:', selectedMonthData)
      setMonthData(selectedMonthData);
      setmonths(allMonthData);
      renderDays();
    }, [data])
    // const getYear = async (year) => {
    //   const yr = await getYearApi(year);
    //   setDbYear(yr);
    // }

    
    useEffect(() => {
      console.log('date:', year, date.getMonth(), month, date) 
      let day = new Date(year + "-" + month + 1 + "-01").getDay();
      console.log('firstDay:', daysOfWeek[day]) 
      setSkiopNumber(day)
      setFirstDay(daysOfWeek[day]);
      let days = new Date(year, date.getMonth()+1, 0).getDate();
      console.log('days:', days) 
      setDaysInMonth(days);
      var first = new Date(date.getFullYear(), date.getMonth(), 1)
      console.log('first:', first) 
      var currentWeekNumber = first.getWeek();
      setWeekNumber(currentWeekNumber);
      console.log('currentWeekNumber:', currentWeekNumber);
      // let monthDbData = data.months.find(e => e.number == month);
      // console.log('-------> monthDbData:', month, monthDbData)
   
    }, [year, month, selectedDate])
     
    Date.prototype.getWeek = function() {
      var onejan = new Date(this.getFullYear(),0,1);
      var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
      var dayOfYear = ((today - onejan + 86400000)/86400000);
      return Math.ceil(dayOfYear/7)
    };

    const dayClickHandler = async (target) => {
      console.log('dayClickHandler:', target)
      const id = JSON.parse(target.id);
      console.log('--> dayClickHandler week, day:', id.week, id.day)
    }

    let weekCount = weekNumber;
    let adjust = 0;
    const renderDays = () => {
      // console.log('daysInMonth, skipNumber, daysInMonth+skipNumber, daysOfWeek:', daysInMonth, skipNumber, daysInMonth+skipNumber, daysOfWeek)
      let dayList = [];
      let weekData = [];
      for (let i = 0; i < daysInMonth+skipNumber-1; i++) {
        console.log('i, i%8, weekCount:', i, i%8, weekCount)
        // console.log('weekCount, data:', weekCount, data.find(e => e.number === weekCount))
        if (i === 0 || i%8-skipNumber-2+adjust-2 === 0) { 
          dayList.push(<div>wk {weekCount}</div>);
          if (data.months != null && monthData.weeks != null) {
            weekData = monthData.weeks.find(e => e.number === weekCount);
            console.log('weekCount-1, weekData:', weekCount, weekData)
          }
          weekCount++;
          adjust++;
        }
        
        if (i < skipNumber -1) {  
          dayList.push(<div></div>);
        } else if ((i%8+adjust) !== 0) {
          let dayData = {};
          if (weekData != null && weekData.days != null) {
            dayData = weekData.days.find(e => e.number === i-skipNumber+2);
            console.log('day, dayData:', i-skipNumber+2, dayData, dayData && dayData.debtItems && dayData.debtItems.length, dayData && dayData.debtItems)
          }
          let dayDebt = 0;
          dayData && dayData.debtItems && dayData.debtItems.forEach((dbt) => {
            dayDebt += dbt.price;
            console.log('dayDebt:', i-skipNumber+2, dbt, dayDebt)
          })
          let dayCredit = 0;
          dayData && dayData.creditItems && dayData.creditItems.forEach((cdt) => {
            dayCredit += cdt.price;
          })
          
          const id = JSON.stringify({day: i-skipNumber+2, week: weekCount-1});
          dayList.push(
          <div id={id} onClick={e => dayClickHandler(e.target)}>
            {i-skipNumber+2}<br/>
            {dayDebt > 0 && <p id={id} className='day-item'>debts ${ dayDebt.toFixed(2) }</p>}
            {dayCredit > 0 && <p id={id} className='day-item'>credits ${ dayCredit.toFixed(2) }</p>}
          </div>
          );
        } 
      }
      return dayList;
    }

    function getWeekday(dateString) {
        // return dayjs(dateString).weekday();
        return date.getDay();
      }

    function isWeekendDay(dateString) {
        return [6, 0].includes(getWeekday(dateString));
      }

    function getNumberOfDaysInMonth(year, month) {
        return dayjs(`${year}-${month}-01`).daysInMonth();
      }

    function createDaysForCurrentMonth(year, month) {
        return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
          return {
            dateString: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: true
          };
        });
      }

    let currentMonthDays = createDaysForCurrentMonth(year, month);

    let calendarGridDayObjects = [
        // ...previousMonthDays,
        ...currentMonthDays,
        // ...nextMonthDays
      ]

    return (
        
      <div className="calendar-wrapper">
      <div className="calendar">
        <div class="calendar__days">
            <div>{daysOfWeek[0].label}</div>
            <div>{daysOfWeek[1].label}</div>
            <div>{daysOfWeek[2].label}</div>
            <div>{daysOfWeek[3].label}</div>
            <div>{daysOfWeek[4].label}</div>
            <div>{daysOfWeek[5].label}</div>
            <div>{daysOfWeek[6].label}</div>
            <div>{daysOfWeek[7].label}</div>
        </div>

        <div class="calendar__dates">
            {renderDays()}
        </div>
      </div>
      </div>
        
    )
}

export default Calendar;
 