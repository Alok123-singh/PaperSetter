import { useState,useEffect } from 'react';
import '../index.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeQuery } from '../app/querySlice'

function Table() {
    // Step 1: Create and manage the 2D matrix using useState
    const dispatch = useDispatch();

    const[defaultRows,setDefaultRows] = useState(10);
    const[defaultColumns,setDefaultColumns] = useState(7);

    const [matrix, setMatrix] = useState([]);
    const [percentage,setPercentage] = useState([]);

    const [checkMatrix,setCheckMatrix] = useState(() => {
        let newMatrix = [];
        for(let i = 1; i <= defaultRows; i++){
            let array = [];
            for(let j = 1; j <= defaultColumns; j++)
                array.push(0);

            newMatrix.push(array);
        }
        return (newMatrix);
    });

    const allowed = useSelector(state => state.query.allowed);

    const queries = useSelector(state => state.query.queries);
    const queryNo = useSelector(state => state.query.queryNo)+1;
    const [query, setQuery] = useState(() => {
        return queries[queryNo];
    });

    const [counter, setCounter] = useState(() => {
        return query.rooms;
    });
    const [selectableRow,setSelectableRow] = useState(() => {
        let array = [];
        for(let i = 1; i <= defaultRows; i++)
            array.push(false);
        
        return (array);
    });
    const [selectableColumn,setSelectableColumn] = useState(() => {
        let array = [];
        for(let j = 1; j <= defaultColumns; j++)
            array.push(false);
        
        return (array);
    });

    
    
    useEffect(() => {
        const currentQuery = queries[queryNo];
        setQuery(() => currentQuery);
        console.log("Current Query",query);

        if(queryNo < queries.length) setCounter(() => queries[queryNo].rooms);
        console.log("Query No.",queryNo);

        console.log("Counter",counter);
        console.log("selectableRow",selectableRow);

        console.log("check matrix",checkMatrix);
        console.log("new Selectable column",selectableColumn);
        // creating new check matrix for every query
        let newMatrix = [];
        for(let i = 1; i <= defaultRows; i++){
            let array = [];
            for(let j = 1; j <= defaultColumns; j++)
                array.push(0);

            newMatrix.push(array);
        }
        setCheckMatrix(() => newMatrix);

        const getDayNo = (dayName) => {
            if(dayName === 'Monday') return (1);
            else if(dayName === 'Tuesday') return (2);
            else if(dayName === 'Wednesday') return (3);
            else if(dayName === 'Thursday') return (4);
            else if(dayName === 'Friday') return (5);
            else if(dayName === 'Saturday') return (6);
            return (7);
        };

        let dayNo1 = getDayNo(queries[queryNo].arrivalDay);
        let dayNo2 = getDayNo(queries[queryNo].departureDay);
        let newSelectableColumn = [];
        for(let j = 1; j <= defaultColumns; j++){
            if(j >= dayNo1 && j <= dayNo2) newSelectableColumn.push(true);
            else newSelectableColumn.push(false);
        }

        setSelectableColumn(() => newSelectableColumn);
        console.log("Check matrix",checkMatrix);
        console.log("Selectable column",selectableColumn);

    },[queryNo]);


    useEffect(() => {
        const storedMatrix = JSON.parse(localStorage.getItem('matrix'));
        if (storedMatrix) {
            setMatrix(storedMatrix);
        }
        else{
            // console.log("Inside else");
            let newMatrix = [];
            for(let i = 1; i <= defaultRows; i++){
                let array = [];
                for(let j = 1; j <= defaultColumns; j++)
                    array.push(0);

                newMatrix.push(array);
            }
            setMatrix(() => newMatrix);
        }

        const storedPercentage = JSON.parse(localStorage.getItem('percentage'));
        if(storedPercentage){
            setPercentage(storedPercentage);
        }
        else{
            let array = [];
            for(let j = 1; j <= defaultColumns; j++)
                array.push("0.00 % occupied");

            setPercentage(() => array);
        }

    }, []);

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
                        setCounter((prev) => prev-1);
                        let array = selectableRow;
                        array[row] = true;
                        setSelectableRow(array);
                    }
                }
                else{
                    if(cnt === 1){
                        setCounter((prev) => prev+1);
                        let array = selectableRow;
                        array[row] = false;
                        setSelectableRow(array);
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

        setCheckMatrix(updatedCheckMatrix);
        setMatrix(() => updatedMatrix);
    };

    useEffect(() => {
        console.log("selectableRow",selectableRow);
        console.log("Counter",counter);
        console.log("Current query",query);

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

    
    return (
        <div className='w-full h-auto flex flex-wrap justify-around items-center p-5'>
            

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
                            className={`${ allowed && selectableColumn[colIndex] && (counter > 0 || selectableRow[rowIndex] === true) ? '' : 'pointer-events-none'} w-[8rem] border border-solid border-gray-300 text-left p-2 rounded-md  ${value === 1 ? 'bg-red-500 hover:bg-rose-600' : 'bg-white hover:bg-gray-300'} text-gray-200`}
                            onClick={() => handleBlockClick(rowIndex, colIndex)}
                            >
                                {value ? 'OCC' : ''}
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
            <button className = {`${allowed === true ? '' : 'invisible'} hover:bg-green-500 bg-green-600`} onClick={() => dispatch(changeQuery(true))} >Next Query</button>
        </div>
    )
}

export default Table
