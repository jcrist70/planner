import React, { useState } from 'react';
import Select from 'react-select';
import dayjs from 'dayjs/locale/es';
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { range } from "ramda";
import classNames from "classnames";

// dayjs.extend(weekday);
// dayjs.extend(weekOfYear);

export const daysOfWeek = [
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
    
    function getYearDropdownOptions(currentYear) {
    let minYear = currentYear - 4;
    let maxYear = currentYear + 5;
    return range(minYear, maxYear + 1).map((y) => ({ label: `${y}`, value: y }));
    }

    function getMonthDropdownOptions() {
    return range(1, 13).map((m) => ({
        value: m,
        label: dayjs()
        .month(m - 1)
        .format("MMMM")
    }));
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

    function createDaysForPreviousMonth(year, month, currentMonthDays) {
        const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].dateString);
        const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");

        const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

        const previousMonthLastMondayDayOfMonth = dayjs(
            currentMonthDays[0].dateString
        )
            .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
            .date();

        return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
            return {
            dateString: dayjs(
                `${previousMonth.year()}-${previousMonth.month() + 1}-${
                previousMonthLastMondayDayOfMonth + index
                }`
            ).format("YYYY-MM-DD"),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
            isPreviousMonth: true
            };
        });
    }

    function createDaysForNextMonth(year, month, currentMonthDays) {
        const lastDayOfTheMonthWeekday = getWeekday(
            `${year}-${month}-${currentMonthDays.length}`
        );
        const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
        const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

        return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
            return {
            dateString: dayjs(
                `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
            ).format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: false,
            isNextMonth: true
            };
        });
    }

    // sunday === 0, saturday === 6
    function getWeekday(dateString) {
        return dayjs(dateString).weekday();
    }

    function isWeekendDay(dateString) {
        return [6, 0].includes(getWeekday(dateString));
    }

    function getNumberOfDaysInMonth(year, month) {
        return dayjs(`${year}-${month}-01`).daysInMonth();
    }

    function createDaysForCurrentMonth(year, month) {
        return [ 
        ...Array(getNumberOfDaysInMonth(year, month))  
        ].map((_, index) => {    
            return { 
            dateString: dayjs(`${year}-${month}-${index + 1}`)
                .format("YYYY-MM-DD"),
            dayOfMonth: index + 1,
            isCurrentMonth: true,
            isNextMonth: false,
            isPreviousMonth: false
            };
        });
    }  

    let currentMonthDays = createDaysForCurrentMonth(year, month);

    // let previousMonthDays = createDaysForPreviousMonth(  
    // year, 
    // month, 
    // currentMonthDays
    // );

    // let nextMonthDays = createDaysForNextMonth(
    // year,   
    // month,   
    // currentMonthDays
    // );

    let calendarGridDayObjects = [ 
    // ...previousMonthDays, 
    ...currentMonthDays,
    // ... nextMonthDays
    ];

    return (
        <div className="calendar-root">  
            <div className="days-of-week">    
                {daysOfWeek.map((day, index) => (      
                <div        
                    key={day}        
                    className="day-of-week-header-cell"    
                >        
                    {day}      
                </div>    
                ))}  
            </div>  
            <div className="days-grid">    
                {calendarGridDayObjects.map((day) => (      
                <div        
                    key={day.dateString}        
                    className={classNames(
                    "day-grid-item-container", 
                    { "current-month": day.isCurrentMonth }
                    )}      
                >        
                    <div className="day-content-wrapper">{renderDay(day)}</div>     
                </div>    
                ))}  
            </div>
            </div>
    );
};

export default Calendar;