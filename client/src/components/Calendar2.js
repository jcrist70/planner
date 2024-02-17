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
        
      <div class="calendar">
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
            

            {/* <!-- Week 2 -->
            <!-- Continue with the rest of the days in the month --> */}
        </div>
      </div>
        
    )
}

export default Calendar;
 

// <div className="day-content-wrapper">{JSON.stringify(calendarGridDayObjects[index].dayOfMonth)}</div>

{/* <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>

            <div>8</div>
            <div>9</div>
            <div>10</div>
            <div>11</div>
            <div>12</div>
            <div>13</div>
            <div>14</div>

            <div>15</div>
            <div>16</div>
            <div>17</div>
            <div>18</div>
            <div>19</div>
            <div>20</div>
            <div>21</div>

            <div>22</div>
            <div>23</div>
            <div>24</div>
            <div>25</div>
            <div>26</div>
            <div>27</div>
            <div>28</div>

            <div>29</div> */}