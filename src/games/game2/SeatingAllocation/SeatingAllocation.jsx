import React, { useState, useEffect } from 'react'
import { Pic1 } from '../photos'
import { Button1, Loading1 } from '../../../components'
import { FaHome, FaQuestionCircle  } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { setResult } from '../../../store/resultSlice';
import { queries2 } from '../../../queries'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveResult } from '../../../apiFunctionalities'



function SeatingAllocation() {

    const [step,setStep] = useState(1);
    const [loading,setLoading] = useState(false);

    const email = useSelector(state => state.auth.email);
    const courseCode = useSelector(state => state.result.courseCode);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState('');


    let cnt = 30; // timer in seconds
    const [counter, setCounter] = useState(cnt);
    const [text, setText] = useState('');
    const [index,setIndex] = useState(0);


    const [queries,setQueries] = useState(() => {
        return queries2;
    });

    const [query,setQuery] = useState(() => (queries[index]));

    const [allowed,setAllowed] = useState(false);

    // Placeholder data for seating capacity
    const seatingCapacityData = [4, 1, 4, 6, 2, 2, 4, 6, 4, 6];
    const [selectedTable,setSelectedTable] = useState(-1);
    const [selectedTables,setSelectedTables] = useState([]);

    // State for dropdown open/close
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // useEffect(() => {
    //     console.log('Data Type of selected table', typeof selectedTable);
    //     console.log('Selected Table', selectedTable);

    // }, [selectedTable]);

    const calculateResult = () => {
        let result = 0;
        let totalPax = 0;

        selectedTables.map((table) => {
            totalPax += table[1];

            return (table);
        });

        const sum = seatingCapacityData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        result = (totalPax / sum) * 100;
        return (result.toString());
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (counter === cnt) {
                if(index <= queries.length){ 

                    // Execute your function every 30 seconds

                    console.log("Information about Query No : ",index);
                    console.log("------------------------------------");

                    const text = document.querySelector('.queryShow');
                    if(!text) return;

                    // set current query's message at heading 
                    const showMessage = (status) => {
                        if(!text) return;

                        if(status === true){
                            const query = queries[index];
                            const message = "Visitor No. " + (index+1).toString() + " - Table for " + query.seatsRequired.toString();
                            text.value = message;
                        }
                        else{
                            text.value = '';
                        }
                    }

                    setQuery(queries[index]);

                    if(selectedTable !== -1){
                        let tempSelectedTables = selectedTables;
                        tempSelectedTables.push([index, query.seatsRequired, selectedTable]);
                        console.log('Selected Tables',selectedTables);

                        setSelectedTables(tempSelectedTables);
                    }

                    showMessage(index < queries.length ? true : false);
                    setIndex(prev => prev+1);
                    setAllowed(false);
                    setSelectedTable(-1);
                    setError('');

                    if(index === queries.length){
                        console.log("Game Ended !");
                        const result = calculateResult();

                        saveResult({score: result, examType: 'SEATING_ALLOCATION', courseCode: courseCode, email: email, time: '', resultDescription : 'Total number of seats that got reserved in the test to total capacity of all seats in the hotel.'},queries.length,'/seating-allocation/result', dispatch, navigate, setResult, setLoading, setError);

                    }
                }

            }
            
            // Decrease the counter
            setCounter((prevCounter) => prevCounter - 1);

            // if(change === true){
            //     setCounter(() => cnt);
            //     setChange(() => false);
            // }
            
            if (counter <= 0) {
                // Reset the counter to 30 seconds when it reaches 0
                setCounter(() => cnt);
            }
            }, 1000); // 1000 milliseconds (1 second) interval
        
            // Cleanup function to clear the interval when the component is unmounted
            return () => clearInterval(intervalId);

    }, [counter]);

    const handleChange = (e) => {
        const tableNo = parseInt(e.target.value, 10)

        if(query.seatsRequired > seatingCapacityData[tableNo-1]){
            const errorMessage = `Requested number of tables is greater that Table ` + String(tableNo) + `'s total capacity that is ` + String(seatingCapacityData[tableNo-1]);
            setError(errorMessage);
            return;
        };

        let isAlreadyFilled = false;

        selectedTables.map((table) => {
            if(table[2] === tableNo){
                isAlreadyFilled = true;
            }

            return (table);
        });

        if(isAlreadyFilled === true){
            setError('Seat has been Already Filled');
            return;
        }
        
        setError('');
        setSelectedTable(tableNo);
    };


    const showVisitor = (index) => {
        let message = '';

        selectedTables.map((table) => {
            if(table[2]-1 === index){
                message = String(table[0]);
            }

            return (table);
        });

        return message;
    }

    const showPax = (index) => {
        let message = '';

        selectedTables.map((table) => {
            if(table[2]-1 === index){
                message = String(table[1]);
            }

            return (table);
        });

        return message;
    }

    const showTotalCapacitiy = () => {
        const sum = seatingCapacityData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return (sum);
    };

    const showTotalVisitors = () => {
        return selectedTables.length;
    };

    const showTotalPax = () => {
        let totalPax = 0;

        selectedTables.map((table) => {
            totalPax += table[1];

            return (table);
        })

        return (totalPax);
    };


    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };


    return loading === true ? ( 
        <Loading1 />
    ) : 
    (
        <div className={`w-full  h-full ${step < 3 && 'bg-emerald-700'} flex justify-center items-center`}>

            {step === 1 && // Page1
                <div className='w-full h-auto my-8 md:my-0 md:h-screen flex flex-col justify-center items-center'>
                    <div className='w-full flex justify-center items-center font-bold text-lg'>
                        <p className='text-white'>
                            Case Overview
                        </p>
                    </div>

                    <div className='w-[50%] flex justify-end items-center'>
                        <Link to={'/'}>
                            <FaHome size={25} className='text-red-400' />
                        </Link>

                        <Link to={'#'} className='ml-6'>
                            <FaQuestionCircle size={25} className='text-blue-400' />
                        </Link>
                    </div>

                    <div className='w-[95%] text-lg text-white md:w-1/2 mt-2 space-y-3 flex flex-col justify-center items-start'>
                        <p>
                            Sample Overview :
                        </p>
                        <p>
                            Hotel Star is situated in the centre of the city and enjoys the benefit of being closer to the airport and railway station. Hotel is busy all throughout the year with different guests arriving from corporate, travel agents, etc., and because of this it gets very important for them to manage the rush at their coffee shop. 
                        </p>
                        <p>
                            You are appointed as the Restaurant Supervisor and your role is to manage the operations.
                        </p>                            
                        <p>
                            In this round you will manage the seating arrangement.
                        </p>
                    </div>

                    <div className='w-full mt-4 flex justify-center items-center'>
                        <Button1 
                            type='button'
                            onClick={() => {
                                setStep(prev => prev+1);
                            }}
                            className='rounded-md mt-4 bg-red-500 hover:bg-red-400'
                        >
                            Your Table Layout
                        </Button1>
                    </div>
                </div>
            }

            {step === 2 && // Page2
                <div className='w-full h-auto my-8 md:my-0 md:h-screen flex flex-col justify-center items-center'>
                    <div className='w-full flex justify-center items-center font-bold text-lg'>
                        <p className='text-white'>
                            Course Overview
                        </p>
                    </div>

                    <div className='w-[50%] flex justify-end items-center'>
                        <Link to={'/'}>
                            <FaHome size={25} className='text-red-400' />
                        </Link>

                        <Link to={'#'} className='ml-6'>
                            <FaQuestionCircle size={25} className='text-blue-400' />
                        </Link>
                    </div>

                    <div className='w-full mt-2 flex justify-center items-center'>
                        <img className='w-[60rem] h-[24rem] rounded-lg bg-cover' style={{backgroundImage: `url(${Pic1})`}} />
                    </div>

                    <div className='w-[98%] md:w-[80%] mt-3 flex flex-col md:flex-row justify-center md:justify-between items-center'>
                        <Button1 
                            type='button'
                            onClick={() => {
                                setStep(prev => prev-1);
                            }}
                            className='rounded-md mt-5 md:mt-3 bg-red-500 hover:bg-red-400'
                        >
                            Back
                        </Button1>
                        <Button1 
                            type='button'
                            onClick={() => {
                                setStep(prev => prev+1);
                            }}
                            className='w-[70%] md:w-auto rounded-md mt-7 md:mt-4 bg-red-500 hover:bg-red-400'
                        >
                            Let's take decisions
                        </Button1>
                    </div>
                </div>
            }

            {step === 3 && // Page3 (Game)
                <div className='w-full h-auto flex flex-col justify-center items-center'>
                    
                    {/* Heading section */}
                    <div className='w-full h-auto flex flex-col justify-center items-center border-y-2 dark:border-y-slate-400 shadow-md '>
                        <div className='w-full flex flex-col lg:flex-row items-center justify-around '>
                            <div className='w-[70%] sm:w-full lg:w-[46rem] h-auto mt-2 lg:mt-0 flex flex-col justify-center items-center'>
                                <textarea
                                    disabled={true}
                                    className={`${index > queries.length ? 'hidden' : ''} w-[70%] sm:w-[50%] sm:ml-0 lg:ml-[3rem] lg:w-[46rem] h-[2.5rem] lg:h-[3rem] dark:bg-gray-100 outline outline-black pt-2 lg:pt-3 rounded-3xl text-center queryShow`}
                                ></textarea>
                                {error && <p className="text-red-600 mt-5 sm:ml-0 lg:ml-[3rem] text-center">{error}</p>}
                            </div>

                            <div className=' my-5 w-auto flex flex-col items-center '>
                                <div className='mb-2 flex flex-col md:flex-row justify-center md:justify-between lg:justify-evenly w-full md:w-full lg:w-[25rem] items-center'>

                                    <div className=' relative inline-block mb-4 md:mb-0 sm:w-auto'>
                                        <label htmlFor='tableSelect' className=' ml-[6px]  text-center text-lg text-red-600 font-semibold mb-2'>
                                            Allocate a Table
                                        </label>

                                        <select
                                        id='tableSelect'
                                        name='tableSelect'
                                        value={selectedTable}
                                        disabled={!allowed}
                                        onClick={() => setDropdownOpen((prev) => !prev)}
                                        onChange={(e) => handleChange(e)}
                                        className='block mt-1 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500'
                                        >
                                            <option value=''>
                                                Select a Table
                                            </option>

                                            {seatingCapacityData.map((_, index) => (
                                                <option key={index} value={index + 1}>
                                                Table {index + 1}
                                                </option>
                                            ))}
                                        </select>

                                        <div className='absolute inset-y-11 right-0 flex items-center px-2 pointer-events-none'>
                                            <svg
                                                className={`fill-current h-4 w-4  transition-transform ${!dropdownOpen ? 'rotate-180 mt-6' : ''}`}
                                                xmlns='http://www.w3.org/2000/svg'
                                                viewBox='0 0 20 20'
                                            >
                                                <path d='M10 12l-8 8h16l-8-8z' />
                                            </svg>
                                        </div>

                                    </div>

                                    <div className='w-1/2 flex justify-center items-center'>
                                        <button
                                            type='button'
                                            className={`${index > queries.length ? 'hidden' : ''} px-[5px] py-[6px] cursor-pointer w-[6rem] xl:w-[4rem]  bg-blue-500 hover:bg-blue-400 text-slate-100 font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded`}
                                            onClick={() => setAllowed(true)}
                                        >
                                            Accept
                                        </button>

                                        <button
                                            type='button'
                                            className={`${allowed ? 'invisible' : ''} ${index > queries.length ? 'hidden' : ''} p-[6px]  cursor-pointer w-[6rem] ml-4 xl:w-[4rem] bg-red-500 hover:bg-red-400 text-slate-100 font-bold border-b-4 border-red-700 hover:border-red-500 rounded`}
                                            onClick={() => setCounter(() => cnt)}
                                        >
                                            Deny
                                        </button>
                                    </div>
                                </div>

                                <div className={`${index > queries.length ? 'hidden md:invisible' : 'pt-2'} lg:pt-0  flex items-center`}>
                                    <p className='text-sm lg:text-base'>
                                        Time Remaining: {formatTime(counter)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table section */}
                    <div className='w-full pt-2 pb-4 h-auto flex flex-col lg:flex-row justify-around items-center'>
                        <table className=' w-[45%] lg:ml-6'>

                            <thead>
                                <tr className='bg-red-400'>
                                    <th className='border border-gray-500 p-1'>Table No.</th>
                                    <th className='border border-gray-500 p-1'>Seating Capacity</th>
                                    <th className='border border-gray-500 p-1'>Visitor</th>
                                    <th className='border border-gray-500 p-1'>Pax</th>
                                </tr>
                            </thead>

                            <tbody>
                                {seatingCapacityData.map((seatingCapacity, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className='border border-gray-500 p-2 text-center'>
                                            {rowIndex + 1}
                                        </td>
                                        <td className='border border-gray-500 p-2 text-center'>
                                            {seatingCapacity}
                                        </td>
                                        <td className='border border-gray-500 bg-[#edd466] p-2 text-center'>
                                            {showVisitor(rowIndex)}
                                        </td>
                                        <td className='border border-gray-500 bg-[#edd466] p-2 text-center'>
                                            {showPax(rowIndex)}
                                        </td>
                                    </tr>
                                ))}
                                <tr className='font-bold'>
                                    <td className='border border-gray-500 bg-rose-500 p-1 text-center'>
                                        Total
                                    </td>
                                    <td className='border border-gray-500 p-1 text-center'>
                                        {showTotalCapacitiy()}
                                    </td>
                                    <td className='border border-gray-500  p-1 text-center'>
                                        {showTotalVisitors()}
                                    </td>
                                    <td className='border border-gray-500  p-1 text-center'>
                                        {showTotalPax()}
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                        <div className='w-full lg:w-[10rem] flex flex-col lg:flex-row items-center'>

                            <button
                                className={`${allowed === true ? 'w-[6rem]' : 'hidden'} p-[5px] cursor-pointer mt-4 lg:mt-0 bg-red-500 hover:bg-red-400 text-slate-100 font-bold border-b-4 border-red-700 hover:border-red-500 rounded `}
                                onClick={() => setCounter(() => cnt)}
                            >
                                {index < queries.length ? 'Continue' : 'End Game'}
                            </button>

                        </div>

                    </div>


                </div>
            }
            
        </div>
    )
};

export default SeatingAllocation;
