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
const Calendar = ({ selectedDate }) => {
    console.log('!!!! selectedDate:',selectedDate)
    const date = new Date(selectedDate);
    // const [ date, setDate ] = useState(new Date(selectedDate));
    const [ year, setYear ] = useState(date.getFullYear());
    const [ month, setMonth ] = useState(date.getMonth());
    const [ dbYear, setDbYear ] = useState({});
    const [ firstDay, setFirstDay ] = useState('')
    const [ skipNumber, setSkiopNumber ] = useState(0);
    const [ daysInMonth, setDaysInMonth ] = useState(30);
    const [ weekNumber, setWeekNumber ] = useState();

    // useEffect(() => {
    //   getYear();
    // }, [])
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
    }, [year, month, selectedDate])
     
    Date.prototype.getWeek = function() {
      var onejan = new Date(this.getFullYear(),0,1);
      var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
      var dayOfYear = ((today - onejan + 86400000)/86400000);
      return Math.ceil(dayOfYear/7)
    };

    const dayClickHandler = async (target) => {
      const id = JSON.parse(target.id);
      console.log('--> dayClickHandler week, day:', id.week, id.day)
    }

    let weekCount = weekNumber;
    let adjust = 0;
    const renderDays = () => {
      console.log('daysInMonth, skipNumber, daysInMonth+skipNumber, daysOfWeek:', daysInMonth, skipNumber, daysInMonth+skipNumber, daysOfWeek)
      const dayList = [];
      for (let i = 0; i < daysInMonth+skipNumber-1; i++) {
        // console.log('i, i%8, weekCount:', i, i%8, weekCount)
        if (i === 0 || i%8-skipNumber-2+adjust-2 === 0) { 
          dayList.push(<div>wk {weekCount}</div>);
          weekCount++;
          adjust++;
        }
        if (i < skipNumber -1) {  
          dayList.push(<div></div>);
        } else if ((i%8+adjust) !== 0) {
          const id = JSON.stringify({day: i-skipNumber+2, week: weekCount-1});
          dayList.push(
          <div id={id} onClick={e => dayClickHandler(e.target)}>
            {i-skipNumber+2}
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
 