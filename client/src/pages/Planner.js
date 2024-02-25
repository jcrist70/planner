import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuid }from 'uuid';


// COMPONENTS
import TableDebts from '../components/TableDebts';
import DebtBar from '../components/DebtBar';
import Calendar from '../components/Calendar2';
// APIS
import { getDebtsApi, addDebtApi } from '../apis/debt.api';
import { getFamilyApi } from '../apis/family.api';
import { getYearApi } from '../apis/calendar.api';

const periods = [
  {label: 'Day', value: 'day'},
  {label: 'Week', value: 'week'},
  {label: 'Month', value: 'month'},
  {label: 'Semi-Annual', value: 'half-year'},
  {label: 'Two Year', value: 'two-year'},
  {label: 'Five Year', value: 'five-year'},
  {label: 'Decade', value: 'decade'},
  {label: 'All Time', value: 'all'},
]
const types = [
  {label: 'grocery', value: 'grocery'},
  {label: 'household', value: 'household'},
  {label: 'dining', value: 'dining'},
  {label: 'gas', value: 'gas'},
  {label: 'parking', value: 'parking'},
  {label: 'utility', value: 'util'},
  {label: 'clothing', value: 'clothing'},
  {label: 'gym', value: 'gym'},
  {label: 'insurance', value: 'insurance'},
  {label: 'tuition', value: 'tuition'},
]
const cycles = [
  {label: 'one time', value: 'one-time'},
  {label: 'day', value: 'day'},
  {label: 'week', value: 'week'},
  {label: 'month', value: 'month'},
  {label: 'year', value: 'year'},
  {label: 'multi-year', value: 'multi-year'},
]
const accounts = [
  {label: 'savings', value: 'savings'},
  {label: 'checking-blue', value: 'checking-blue'},
  {label: 'checking-red', value: 'checking-red'},
  {label: 'cc', value: 'cc'},
]
let suppliers = [
  {label: 'Amazon', value: '65c92a5790c8801d72a514f6'},
  {label: 'Market Basket', value: '65c9001790c8801d72a514ea'},
  {label: 'Hannaford', value: '65c92a1890c8801d72a514f5'},
  {label: 'COOP Hanover', value: '65c92a6590c8801d72a514f7'},
  {label: 'COOP Concord', value: '65c92a7890c8801d72a514f9'},
  {label: 'COOP Littleton', value: '65c92a7090c8801d72a514f8'},
  {label: 'NH Liquor', value: '65c92c1890c8801d72a514fc'},
  {label: 'Ralph Lauren', value: '65c92a8c90c8801d72a514fb'},
  {label: 'Target', value: '65c92c4290c8801d72a514fd'},
  {label: 'Wallmart', value: '65c92a8290c8801d72a514fa'},
  {label: 'Other', value: '65c92a0890c8801d72a514f4'},
]

const Planner = () => {
  // const calendarComponentRef = React.createRef();

  const [ year, setYear ] = useState(new Date().getFullYear());
  const [ month, setMonth ] = useState(new Date().getMonth());
  const [ yearData, setYearData ] = useState({});
  const [ monthData, setMonthData ] = useState(null);

  const [value, setValue] = useState(new Date());
  const [ period, setPeriod ] = useState(null);
  
  const [ type, setType ] = useState(null);
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());
  const [ item, setItem ] = useState(null);
  const [ price, setPrice ] = useState(null);
  const [ cycle, setCycle ] = useState(null);
  const [ freq, setFreq ] = useState(null);
  const [ supplier, setSupplier ] = useState('default');
  const [ account, setAccount ] = useState(null);
  const [ tableData, setTableData ] = useState([]);
  // {type: 'grocery', item: '', price: 1, cycle: 'mo', frequency: 4, startDate: "02/09/24"}

  const { email } = useSelector((state) => state.user, shallowEqual);
  
  const [state, setState ] = useState({
    events: [
      { id: 1, title: "event 1", date: "2019-12-01" },
      {
        title: "event 2",
        start: "2019-12-01",
        end: "2019-12-05",
        allDay: true,
        HostName: "William"
      },
      {
        title: "event 3",
        start: "2019-12-05",
        end: "2019-12-07",
        allDay: true
      },
      {
        title: "event 4",
        start: "2019-12-05",
        end: "2019-12-07",
        allDay: true
      },
      {
        title: "event 5",
        start: "2019-12-05",
        end: "2019-12-07",
        allDay: true
      },
      {
        title: "event 6",
        start: "2019-12-05",
        end: "2019-12-07",
        allDay: true
      }
    ]
  });

  useEffect(() => {
    // getDebts();
    getFamily();
    getYearData();
  }, [startDate])

  // useEffect(() => {
  //   extractMonthData();
  // }, [yearData])

  const getYearData = async () => {
    console.log('getYearData year:', year)
    const dbYear = await getYearApi(year);
    // await extractMonthData(dbYear);
    await setYearData(dbYear.data);
    console.log('-------> dbYear.data:', month, dbYear.data)
  }
  const extractMonthData = async (dbYear) => {
    let monthDbData = dbYear.data.months.find(e => e.number == month);
    console.log('-------> monthDbData:', month, monthDbData)
    setMonthData(monthDbData);
  }

  useEffect(() => {
    const yr = new Date(startDate).getFullYear();
    console.log('updated year -> yr:', yr)
    
    setYear(yr);
    const mo = new Date(startDate).getMonth() + 1; 
    setMonth(mo);
    console.log('date:', yr, mo)
  }, [startDate])

  useEffect(() => {
    console.log('cycle:', cycle)
    if (cycle && cycle.value === 'one-time') {
      console.log('setFreq 1')
      setFreq(1);
    }
  }, [cycle])

  const getFamily = async () => {
    const dbFamily = await getFamilyApi();
    console.log('dbFamily:', dbFamily.data.debtItems)
    if (dbFamily && dbFamily.data.debtItems.length > 0) {
      setTableData(dbFamily.data.debtItems);
    }
  }

  const DebtForm = () => {
    return (
      <div>
        Debt Form
      </div>
    )
  }
  const addDebt = () => {
    
    let formattedStartDate = startDate.toISOString().split('T')[0];
    let dateArr = formattedStartDate.split('-');
    formattedStartDate = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];
    let formattedEndDate = startDate.toISOString().split('T')[0];
    dateArr = formattedEndDate.split('-');
    formattedEndDate = dateArr[1] + '-' + dateArr[2] + '-' + dateArr[0];

    const debt = {
      debtId: uuid(),
      type: type.label,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      item,
      price,
      cycle: cycle.label,
      frequency: freq,
      supplier: supplier.value,
      account: account.label,
    }
    console.log('addDebt debt:', debt)
    console.log('addDebt tableData:', tableData)
    if (!Object.values(debt).includes(null)) {
      const data = [...tableData];
      data.push(debt);
      // data.push({type: 'util', item: 'firewood', price: 1410, cycle: 'mo', frequency: 1, date: "02/09/24"});
      console.log('addDebt data:', data)
      setTableData(data);
      addDebtApi(debt);
    } else {
      caches.delete('Every field must have a value!')
    }
    
  }

  function onChange(nextValue) {
    console.log('Calendar value:', value)
    setValue(nextValue);
  }
  
  // const datesToAddClassTo = [tomorrow, in3Days, in5Days];

  // function tileClassName({ date, view }) {
  //   // Add class to tiles in month view only
  //   if (view === 'month') {
  //     // Check if a date React-Calendar wants to check is on the list of dates to add class to
  //     if (datesToAddClassTo.find(dDate => isSameDay(dDate, date))) {
  //       return 'myClassName';
  //     }
  //   }
  // }
  // const datesToAddContentTo = [tomorrow, in3Days, in5Days];

  function tileContent({ date, view }) {
    console.log('tileContent selected date:', date)
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      // if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
      //   return 'My content';
      // }
      // date && date.forEach((d) => {
      //   if  (date === value) {
      //     return 'My content';
      //   }
      // })
      
      
    }
  }

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
  const handleSelectedDates = (info) => {
    alert("selected " + info.startStr + " to " + info.endStr);
    const title = prompt("What's the name of the title");
    console.log(info);
    if (title != null) {
      const newEvent = {
        title,
        start: info.startStr,
        end: info.endStr
      };
      const data = [...state.events, newEvent];
      setState({ events: data });
      console.log("here", data);
    } else {
      console.log("nothing");
    }
  };

  return (
      <div className='app-debt-section'>
        <div className='app-debt-container'>
          <div className='debt-page-grid'>
            <div className='debt-page-header color-0p5-gry-1'>Planner</div>
            <div className='grid-2r1c-2h13w left color-1-orn-1' style={{ paddingLeft: '20px' }}>
      
              <DatePicker 
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              className="planner-bar-mo-yr" 
              selected={startDate} 
              onChange={(date) => setStartDate(date)} />
              
            </div>
            <div className='grid-4r1c-13h11w'>

              <Calendar selectedDate={startDate} data={yearData} />

            </div>
            <div className='grid-4r12c-13h2w color-0p4-orn-3'>
            </div>

          </div>
        </div>
      </div>
    );
};

export default Planner;

// Ending: <DatePicker className="debt-bar-element-end-date" selected={endDate} onChange={(date) => setEndDate(date)} />
              
// {false && <DebtBar addDebt={addDebt} />}
//               <Select maxMenuHeight={150} 
//               className=""
//               placeholder='select period'
//               value={period} 
//               options={periods} 
//               onChange={(option) => setPeriod(option)} 
//               styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} />  

// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import Calendar from '../components/Calendar';

// const events =  [
//   { id: 1, title: "event 1", date: "2019-12-01" },
//   {
//     title: "event 2",
//     start: "2019-12-01",
//     end: "2019-12-05",
//     allDay: true,
//     HostName: "William"
//   },
//   {
//     title: "event 3",
//     start: "2019-12-05",
//     end: "2019-12-07",
//     allDay: true
//   },
//   {
//     title: "event 4",
//     start: "2019-12-05",
//     end: "2019-12-07",
//     allDay: true
//   },
//   {
//     title: "event 5",
//     start: "2019-12-05",
//     end: "2019-12-07",
//     allDay: true
//   },
//   {
//     title: "event 6",
//     start: "2019-12-05",
//     end: "2019-12-07",
//     allDay: true
//   }
// ]

{/* <div className="Sample__container">
              <main className="Sample__container__content"></main>
              {false && <Calendar
                onChange={onChange}
                value={value}
                showWeekNumbers
                // tileClassName={tileClassName}
                tileContent={tileContent}
              />}
              </div>
              {false && <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={false}
                events={events}
                eventContent={renderEventContent}
              />}
              {false && <FullCalendar
                // schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                ref={calendarComponentRef}
                defaultView="dayGridMonth"
                dateClick={handleDateClick}
                displayEventTime={true}
                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                selectable={true}
                plugins={[
                  dayGridPlugin,
                  interactionPlugin,
                  timeGridPlugin,
                  resourceTimeGridPlugin
                ]}
                eventClick={event => {
                  console.log(event.event._def.publicId);
                }}
                events={state.events}
                select={handleSelectedDates}
                eventLimit={300}
              />} 
            
            <Calendar
                yearAndMonth={yearAndMonth}
                onYearAndMonthChange={setYearAndMonth}
                renderDay={(calendarDayObject) => (
                  <div>
                    <CalendarDayHeader calendarDayObject={calendarDayObject} />
                  </div>
                )}
              />
            
            */}