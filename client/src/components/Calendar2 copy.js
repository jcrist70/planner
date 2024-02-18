import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import dayjs from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { range } from "ramda";
import classNames from "classnames";

const daysOfWeek = [
    {index: 0, label: "Sunday"},
    {index: 1, label: "Monday"},
    {index: 2, label: "Tuesday"},
    {index: 3, label: "Wednesday"},
    {index: 4, label: "Thursday"},
    {index: 5, label: "Friday"},
    {index: 6, label: "Saturday"}
  ];

const Calendar = () => {
    const date = new Date();
    const [ year, setYear ] = useState(date.getFullYear());
    const [ month, setMonth ] = useState(date.getMonth());
    const [ firstDay, setFirstDay ] = useState('')
    const [ skipNumber, setSkiopNumber ] = useState(0);
    const [ daysInMonth, setDaysInMonth ] = useState(30);
    
    useEffect(() => {
      console.log('date:', year, month, date) 
      let day = new Date(year + "-" + month + 1 + "-01").getDay();
      console.log('firstDay:', daysOfWeek[day]) 
      setSkiopNumber(day)
      setFirstDay(daysOfWeek[day]);
      let days = new Date(year, month + 1, 0).getDate();
      console.log('days:', days) 
      setDaysInMonth(days);
    }, [year, month])
     
    const renderDays = () => {
      console.log('daysInMonth, skipNumber, daysInMonth+skipNumber, daysOfWeek:', daysInMonth, skipNumber, daysInMonth+skipNumber, daysOfWeek)
      const dayList = [];
      for (let i = 0; i < daysInMonth+skipNumber; i++) {
        // console.log('i:', i)
        if (i < skipNumber) {  
          dayList.push(<div></div>);
        } else {
          console.log(i%7)
          dayList.push(<div>{i-skipNumber+1}</div>);
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
        </div>

        <div class="calendar__dates">
            {renderDays()}
        </div>
      </div>
      </div>
        
    )
}

export default Calendar;
 