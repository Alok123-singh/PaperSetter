import { useState,useEffect } from 'react';
import '../../index.css'
import data from '../../JSON/queries.json'
import { Link } from 'react-router-dom';

function Table() {

    const[defaultRows,setDefaultRows] = useState(10);
    const[defaultColumns,setDefaultColumns] = useState(7);

    let cnt = 30;
    const [text, setText] = useState('');
    const [counter, setCounter] = useState(cnt);
    const [index,setIndex] = useState(0);
    // const [change, setChange] = useState(false);

    const [queries,setQueries] = useState(() => {
        return data;
    });

    const [query,setQuery] = useState(() => (queries[index]));

    const [rooms,setRooms] = useState(() => {
        return 0;
    })

    const [prevMatrix,setPrevMatrix] = useState(() => {
        const storedMatrix = JSON.parse(localStorage.getItem('matrix'));
        if (storedMatrix && storedMatrix.length === defaultRows && storedMatrix[0].length === defaultColumns) {
            return storedMatrix;
        }

        let newMatrix = [];
        for(let i = 1; i <= defaultRows; i++){
            let array = [];
            for(let j = 1; j <= defaultColumns; j++)
                array.push(0);

            newMatrix.push(array);
        }

        return (newMatrix);
    });

    const [matrix, setMatrix] = useState(() => {
        const storedMatrix = JSON.parse(localStorage.getItem('matrix'));
        if (storedMatrix && storedMatrix.length === defaultRows && storedMatrix[0].length === defaultColumns) {
            return storedMatrix;
        }
        
        let newMatrix = [];
        for(let i = 1; i <= defaultRows; i++){
            let array = [];
            for(let j = 1; j <= defaultColumns; j++)
                array.push(0);

            newMatrix.push(array);
        }

        return newMatrix;

    });
    
    const [percentage,setPercentage] = useState(() => {
        let array = [];
        for(let j = 0; j < defaultColumns; j++){
            let cnt = 0;
            for(let i = 0; i < defaultRows; i++){
                if(matrix[i][j] == 1) cnt++;
            }
            let per = ((cnt / defaultRows) * 100).toFixed(2);
            let message = per.toString() + " %";
            array.push(message);
        }
            
        return array;
    });

    const [allowed,setAllowed] = useState(false);

    const [checkMatrix,setCheckMatrix] = useState([]);

    const [selectableRow,setSelectableRow] = useState([]);
    const [selectableColumn,setSelectableColumn] = useState([]);

    const getDayNo = (dayName) => {
        if(dayName === 'Monday') return (1);
        else if(dayName === 'Tuesday') return (2);
        else if(dayName === 'Wednesday') return (3);
        else if(dayName === 'Thursday') return (4);
        else if(dayName === 'Friday') return (5);
        else if(dayName === 'Saturday') return (6);
        return (7);
    };

    useEffect(() => {
        
        if(index <= queries.length){
            const currentQuery = queries[index];
            setQuery(() => currentQuery);
            
            setRooms(() => query.rooms);

            let newMatrix = [];
            for(let i = 1; i <= defaultRows; i++){
                let array = [];
                for(let j = 1; j <= defaultColumns; j++)
                    array.push(0);

                newMatrix.push(array);
            }
            setCheckMatrix(() => newMatrix);

            let dayNo1 = getDayNo(query.arrivalDay);
            let dayNo2 = getDayNo(query.departureDay) - 1;
            let newSelectableColumn = [];
            for(let j = 1; j <= defaultColumns; j++){
                if(j >= dayNo1 && j <= dayNo2) newSelectableColumn.push(true);
                else newSelectableColumn.push(false);
            }

            setSelectableColumn(() => newSelectableColumn);

            let array = [];
            for(let i = 0; i < defaultRows; i++){
                let flag = false;
                array.push(flag);
            }
            
            setSelectableRow(array);
        }
        else if(index == queries.length+1){
            
        }

        // console.log("Index",index);
        console.log("Matrix",matrix);
        console.log("Current Query",query);
        console.log("Query No.",index);

    }, [index]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (counter === cnt) {
                if(index <= queries.length){ 

                    // Execute your function every 30 seconds

                    setPrevMatrix(() => matrix);
                    console.log("Information about Query No : ",index);
                    console.log("Check matrix",checkMatrix);
                    console.log("Selectable column",selectableColumn);
                    console.log("Selectable Row",selectableRow);
                    console.log("------------------------------------");
                    
                    const showMessage = (status) => {
                        const text = document.querySelector('.queryShow');
                        if(status === true){
                            const query = queries[index];
                            const message = "Query " + (index+1).toString() + " - " + query.rooms.toString() + " room on corporate rate, Arrival on - " + query.arrivalDay + " , Departure on - " + query.departureDay;
                            text.value = message;
                        }
                        else{
                            text.value = '';
                        }
                    }

                    showMessage(index < queries.length ? true : false);
                    setIndex(prev => prev+1);
                    setAllowed(false);
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


    // Step 2: Save the matrix to local storage whenever it changes
    useEffect(() => {
    if(matrix.length === 0) return;
        console.log("Matrix stored in local storage !");
        localStorage.setItem('matrix', JSON.stringify(matrix));
        // console.log("Matrix ",matrix);
    }, [matrix]);

    // Step 3: Handle click on a block to mark/unmark it
    const handleBlockClick = (row, col) => {
        
        if(prevMatrix[row][col] === 1) return;
        
        // console.log("Row",row);
        let dayNo1 = getDayNo(queries[index-1].arrivalDay), dayNo2 = getDayNo(queries[index-1].departureDay) - 1;
        // console.log("DayNo1",dayNo1);
        // console.log("DayNo2",dayNo2);
        // console.log("Rooms inside handleblockclick method",rooms);
        // console.log("Query inside handleblockclick method",query);
        for(let j = dayNo1-1; j <= dayNo2-1; j++){
            if(prevMatrix[row][j] === 1) return;
        }

        // var confirmation = confirm("Do you want to make changes?");
        // if(!confirmation) return;

        const updatedMatrix = matrix.map((rowArray, rowIndex) => {
            if(rowIndex === row){
                let cnt = 0;
                for(let j = 0; j < defaultColumns; j++){
                    if(checkMatrix[row][j] == 1) cnt++;
                }
                if(checkMatrix[row][col] === 0){
                    if(cnt === 0){
                        setRooms((prev) => prev-1);
                        let array = selectableRow;
                        array[row] = true;
                        setSelectableRow(() => array);
                    }
                }
                else{
                    if(cnt === 1){
                        setRooms((prev) => prev+1);
                        let array = selectableRow;
                        array[row] = false;
                        setSelectableRow(() => array);
                    }
                }
            }

            return rowArray.map((value, colIndex) => {
                    return rowIndex === row && colIndex === col ? (value === 0 ? 1 : 0) : value;
                }
            )
        });

        let updatedCheckMatrix = checkMatrix.map((rowArray, rowIndex) => {
            return rowArray.map((value, colIndex) => {
                    return rowIndex === row && colIndex === col ? (value === 0 ? 1 : 0) : value;
                }
            )
        });

        setCheckMatrix(() => updatedCheckMatrix);
        setMatrix(() => updatedMatrix);
    };

    useEffect(() => {

        if(percentage.length === 0) return;

        const updatedPercentage = percentage.map((value,index) => {
            let cnt = 0;
            for(let i = 0; i < defaultRows; i++){
                if(matrix[i][index] === 1) cnt++;
            }
            const num = (cnt / defaultRows) * 100;
            const result = num.toString() + " %";
            return result;
        });

        setPercentage(updatedPercentage);

    }, [matrix]);

    const showDay = (day) => {
        if(day === 1) return ("Mon");
        else if(day === 2) return "Tue";
        else if(day === 3) return "Wed";
        else if(day === 4) return "Thur";
        else if(day === 5) return "Fri";
        else if(day === 6) return "Sat";
        return "Sun";
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const showResult = () => {
        let result = 0;
        let cnt = 0;
        matrix.map((row) => (
            row.map((value) => {
                if(value === 1) cnt++;
                return value;
            })
        ))
        result = (cnt / (defaultRows * defaultColumns)) * 100;
        return ("Result - " + result.toFixed(2).toString() + " %");
    };
    
    useEffect(() => {
        const handleResize = () => {
            // You can adjust the logic here based on your screen size requirements
            if (window.innerWidth < 600) {
                setText('R ');
            } else if (window.innerWidth < 1024) {
                setText('Room ');
            } else {
                setText('Room ');
            }
            };

            // Initial setup
            handleResize();

            // Add event listener for window resize
            window.addEventListener('resize', handleResize);

            // Cleanup the event listener on component unmount
            return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return (
        <div className='w-full h-auto dark:bg-gray-400 flex flex-wrap justify-around items-center'>
            <div className='w-full h-auto flex flex-col justify-center items-center border-y-2 dark:border-y-slate-400 shadow-md '>

                <div className='w-full flex flex-col lg:flex-row items-center justify-around my-2'>
                    <textarea
                        disabled={true}
                        className='w-full sm:ml-[0.9rem] lg:ml-[3rem] lg:w-[46rem] h-[5rem] sm:h-[4rem] md:h-[3rem] dark:bg-gray-100 outline outline-black pt-4 md:pt-3 rounded-3xl text-center queryShow'
                    ></textarea>

                    <div className='mt-2 w-[16rem] flex flex-col items-center '>
                        <div className='mb-2 flex justify-center w-[16rem] items-center'>

                            <button
                                type='button'
                                className={`${index > queries.length ? 'invisible' : ''} px-[5px] py-[6px] cursor-pointer w-[6rem] xl:w-[4rem]  bg-blue-500 hover:bg-blue-400 text-slate-100 font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded`}
                                onClick={() => setAllowed(true)}
                            >
                                Accept
                            </button>

                            <button
                                type='button'
                                className={`${allowed || index > queries.length ? 'invisible' : ''} p-[6px]  cursor-pointer w-[6rem] ml-4 xl:w-[4rem] bg-red-500 hover:bg-red-400 text-slate-100 font-bold border-b-4 border-red-700 hover:border-red-500 rounded`}
                                onClick={() => setCounter(() => cnt)}
                            >
                                Deny
                            </button>
                        </div>

                        <div className={`${index > queries.length ? 'invisible' : 'pt-4'} lg:pt-0  flex items-center`}>
                            <p className='text-sm lg:text-base'>
                                Time Remaining: {formatTime(counter)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full py-[2.45rem] lg:w-[97%] flex flex-col lg:flex-row justify-around cursor-default MainDiv'>
                <div className='w-full flex flex-col md:items-center lg:justify-evenly sm:w-[95%] lg:w-[45rem] sm:ml-[0.9rem] lg:ml-[2rem]'>
                    <div className='flex'>
                        <div className='w-[6rem] h-[2rem] px-2 border border-solid border-gray-300 flex flex-wrap justify-center items-center bg-blue-400 rounded-md text-xs lg:text-base'>
                            Day
                        </div>
                        {matrix.map((array, index1) => (
                            index1 === 0 ? array.map((value, index2) => (
                                <div key={index2} className='w-[6rem] h-[2rem] flex justify-center items-center border border-solid border-gray-300 px-2 bg-blue-400 rounded-md text-xs lg:text-base'>
                                    {showDay(index2 + 1)}
                                </div>
                            )) : ''
                        ))}
                    </div>

                    {matrix.map((row, rowIndex) => (
                        <div className='flex' key={rowIndex}>
                            <div className='w-[6rem] h-[2rem] p-2 flex justify-center items-center border border-solid border-gray-300 bg-emerald-400 dark:bg-emerald-400 rounded-md text-xs lg:text-base'>
                                {text + (rowIndex + 1).toString()}
                            </div>
                            {row.map((value, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={`${allowed && selectableColumn[colIndex] && (rooms > 0 || selectableRow[rowIndex] === true) ? '' : 'pointer-events-none'} w-[6rem] h-[2rem] p-2 flex justify-center items-center border border-solid border-gray-300 text-left rounded-md text-xs lg:text-sm xl:text-base ${value === 1 ? 'bg-red-500 hover:bg-rose-600 dark:bg-rose-500 dark:hover:bg-rose-600' : 'bg-white hover:bg-gray-300  dark:hover:bg-gray-200'} text-gray-200 dark:text-gray-600`}
                                    onClick={() => handleBlockClick(rowIndex, colIndex)}
                                >
                                    {/* {value === 0 && "click to book"} */}
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className='flex'>
                        <div className='w-[6rem] h-[2rem] p-2 border border-solid border-gray-300 flex justify-center items-center bg-red-500 rounded-md text-xs lg:text-base'>
                            Total
                        </div>
                        {percentage.map((value, index) => (
                            <div key={index} className='w-[6rem] h-[2rem] flex justify-center items-center border border-solid border-gray-300 p-2 bg-red-400 rounded-md text-xs lg:text-base '>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='w-full lg:w-[10rem] flex flex-col lg:flex-row items-center'>

                    <button
                        className={`${allowed === true ? 'w-[6rem]' : 'hidden'} p-[5px] cursor-pointer mt-4 lg:mt-0 bg-red-500 hover:bg-red-400 text-slate-100 font-bold border-b-4 border-red-700 hover:border-red-500 rounded `}
                        onClick={() => setCounter(() => cnt)}
                    >
                        {index < queries.length ? 'Continue' : 'End Game'}
                    </button>

                    <div className={`${index <= queries.length ? 'hidden' : ''} flex w-[10rem] flex-col items-center `}>
                        
                        <div className='mt-4 lg:mt-0 w-[9rem] h-[2.2rem] p-[3px] cursor-default flex justify-center items-center bg-blue-500 hover:bg-blue-600 text-slate-100 font-bold border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                            {showResult()}
                        </div>

                        <Link 
                        to={"/game"} 
                        onClick={() => window.location.reload()}
                        >
                            <div className='w-[6rem] mt-4 h-[2.2rem] p-[6px] cursor-pointer  flex justify-center items-center bg-rose-500 hover:bg-rose-400 text-slate-100 font-bold border-b-4 border-rose-700 hover:border-rose-500 rounded'>
                                Play Again
                            </div>
                        </Link>

                        <Link 
                        to={"/"} 
                        >
                            <div className='w-[7rem] mt-4  h-[2.2rem] p-[8px] cursor-pointer flex justify-center items-center bg-rose-500 hover:bg-rose-400 text-slate-100 font-bold border-b-4 border-rose-700 hover:border-rose-500 rounded'>
                                Go To Home
                            </div>
                        </Link>
                        
                    </div>

                </div>

            </div>



        </div>
    )
}

export default Table
