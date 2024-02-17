import React, { useState } from 'react';
import Select from 'react-select';
import dayjs from 'dayjs';
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { range } from "ramda";
import classNames from "classnames";

const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

const Calendar = () => {
    const date = new Date();
    const [ year, setYear ] = useState(date.getFullYear());
    const [ month, setMonth ] = useState(date.getMonth());
    
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
        
        <div className="calendar-root">  
            <div className="days-grid color-0p4-blu-1"> 
                {daysOfWeek.map((day, index) => (
                  <div
                      key={day}
                      className={classNames("day-of-week-header-cell", {"weekend-day": [6, 0].includes(index)})}>
                      {day}
                  </div>
                ))}
                <div className="days-grid">
                  {calendarGridDayObjects.map((day) => (
                    <div key={day.dateString} className="day-grid-item-container">
                        <div className="day-content-wrapper">{JSON.stringify(day.dayOfMonth)}</div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
        
    )
}

export default Calendar;
 

// <div className="day-content-wrapper">{JSON.stringify(calendarGridDayObjects[index].dayOfMonth)}</div>