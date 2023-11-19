import { useState,useEffect } from 'react';
import '../index.css'
import data from '../JSON/queries.json'

function Table() {

    let cnt = 30;
    const [counter, setCounter] = useState(cnt);
    const [index,setIndex] = useState(0);
    const [change, setChange] = useState(false);

    const [queries,setQueries] = useState(() => {
        return data;
    });

    const [query,setQuery] = useState(() => {
        return queries[index];
    });

    const [rooms,setRooms] = useState(() => {
        return query.rooms;
    })

    const[defaultRows,setDefaultRows] = useState(10);
    const[defaultColumns,setDefaultColumns] = useState(7);

    const [prevMatrix,setPrevMatrix] = useState(() => {
        const storedMatrix = JSON.parse(localStorage.getItem('matrix'));
        if (storedMatrix) {
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
        if (storedMatrix) {
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
        const storedPercentage = JSON.parse(localStorage.getItem('percentage'));
        if(storedPercentage){
            return storedPercentage;
        }

        let array = [];
        for(let j = 1; j <= defaultColumns; j++)
            array.push("0.00 % occupied");

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

            if(change === true){
                setCounter(() => cnt);
                setChange(() => false);
            }
            
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
        console.log("Data stored!");
        localStorage.setItem('matrix', JSON.stringify(matrix));
        localStorage.setItem('percentage', JSON.stringify(percentage));
        console.log("Matrix ",matrix);
        console.log("Percentage",percentage);
    }, [matrix]);

    // Step 3: Handle click on a block to mark/unmark it
    const handleBlockClick = (row, col) => {
        
        if(prevMatrix[row][col] === 1) return;
        
        // console.log("Row",row);
        let dayNo1 = getDayNo(queries[index-1].arrivalDay), dayNo2 = getDayNo(queries[index-1].departureDay) - 1;
        // console.log("DayNo1",dayNo1);
        // console.log("DayNo2",dayNo2);
        for(let j = dayNo1-1; j <= dayNo2-1; j++){
            if(prevMatrix[row][j] === 1) return;
        }

        var confirmation = confirm("Do you want to make changes?");
        if(!confirmation) return;

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
            const result = num.toString() + " % occupied";
            return result;
        });

        setPercentage(updatedPercentage);

    }, [matrix]);

    const showDay = (day) => {
        if(day === 1) return ("Monday");
        else if(day === 2) return "Tuesday";
        else if(day === 3) return "Wednesday";
        else if(day === 4) return "Thursday";
        else if(day === 5) return "Friday";
        else if(day === 6) return "Saturday";
        return "Sunday";
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const goToNextQuery = () => {
        setChange(true);
        if(index <= queries.length){
            setPrevMatrix(() => matrix);
            console.log("Information about Query No : ",index);
            console.log("Check matrix",checkMatrix);
            console.log("Selectable column",selectableColumn);
            console.log("Selectable Row",selectableRow);
            console.log("------------------------------------");
        }
    } ;

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
        return (result.toFixed(2).toString() + " %");
    };
    
    return (
        <div className='w-full h-auto flex flex-wrap justify-around items-center p-5'>
            <div className='w-full h-auto flex flex-col justify-center items-center '>
                <div className='w-full flex items-center justify-around pl-[1.5rem]'>
                    <textarea disabled={true} className=' w-[74%] h-[3rem] outline outline-black pt-3 rounded-3xl text-center queryShow'></textarea>
                    <div>
                        <button type='button' className={`${index > queries.length ? 'invisible' : 
                        ''} yes w-[4rem] bg-green-600 hover:bg-green-500`}
                        onClick={() => setAllowed(true)}
                        >
                            Yes
                        </button>

                        <button type='button' className={`${allowed || index > queries.length ? 'invisible' : ''} no ml-5 w-[4rem] bg-red-600 hover:bg-red-500`}
                        onClick={() => setChange(true)}
                        >
                            No
                        </button>
                    </div>
                </div>

                <div className='w-full flex justify-end items-center pr-10'>
                    <div className={`${index > queries.length ? 'invisible' : ''} pt-2`}>
                        <p>Time Remaining : {formatTime(counter)}</p>
                    </div>
                </div>
            </div>

            <div className=' cursor-default'>
                <div className='flex '>
                    <div className='w-[8rem] border border-solid border-gray-300 text-left p-2 bg-blue-400 rounded-md'>
                        Day
                    </div>
                    {matrix.map((array,index1) => (
                        index1 === 0 ? array.map((value,index2) => (
                            <div key={index2} className='w-[8rem] flex justify-center items-center border border-solid border-gray-300 px-2 bg-blue-400 rounded-md'>
                                {showDay(index2+1)}
                            </div>
                        )) : ''
                    ))}
                </div>
                
                {matrix.map((row, rowIndex) => (

                    <div className='flex' key={rowIndex}>
                        <div className='w-[8rem] h-auto border border-solid border-gray-300  p-2 bg-emerald-400 rounded-md'>
                            {"Room " + (rowIndex+1).toString()}
                        </div>
                        {row.map((value, colIndex) => (
                            <div

                            key={colIndex}
                            className={`${ allowed && selectableColumn[colIndex] && (rooms > 0 || selectableRow[rowIndex] === true) ? '' : 'pointer-events-none'} w-[8rem] border border-solid border-gray-300 text-left p-2 rounded-md  ${value === 1 ? 'bg-red-500 hover:bg-rose-600' : 'bg-white hover:bg-gray-300'} text-gray-200`}
                            onClick={() => handleBlockClick(rowIndex, colIndex)}
                            >
                                {}
                            </div>
                            
                        ))}
                    </div>
                ))}

                <div className='flex'>
                    <div className='w-[8rem] border border-solid border-gray-300 text-left p-2 bg-red-500 rounded-md'>Total</div>
                    {percentage.map((value,index) => (
                        <div key={index} className='w-[8rem] border border-solid border-gray-300 text-left p-2 bg-red-400 rounded-md'>
                            {value};
                        </div>
                    ))}
                </div>

            </div>

            <div>
                <button 
                className = {`${allowed === true ? '' : 'invisible'} hover:bg-green-500 bg-green-600`} 
                onClick={() => goToNextQuery()} 
                >
                    {index < queries.length ? 'Next Query' : 'End Game'}
                </button>

                <div className={`${index <= queries.length ? 'invisible': ''} w-[6rem] h-[2.2rem] p-2 bg-blue-400 flex justify-center items-center rounded-lg `}>
                    {showResult()}
                </div>

            </div>

        </div>
    )
}

export default Table
