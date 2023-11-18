import React, { useState,useEffect } from 'react'
import '../index.css'
import Clock from './Clock';
import { useSelector, useDispatch } from 'react-redux';
import { setAllQueries,incrementQuery, setAllowed, changeQuery } from '../app/querySlice';
import data from '../JSON/queries.json'

function Query() {

    const dispatch = useDispatch();

    const [queries,setQueries] = useState(() => {
        dispatch(setAllQueries(data));
        return data;
    });


    const changeStatus = useSelector(state => state.query.changeStatus);
    let time = useSelector(state => state.clock.time);
    let cnt = 10000;
    const [counter, setCounter] = useState(cnt);
    const [index,setIndex] = useState(0);
    const [change, setChange] = useState(false);
    const [editable, setEditable] = useState(false);

    const showMessage = (status) => {
        const text = document.querySelector('.queryShow');
        if(status === true){
            const query = queries[index];
            const message = "Query " + (index+1).toString() + " - " + query.rooms.toString() + " room on corporate rate, Arrival on - " + query.arrivalDay + " , Departure on - " + query.departureDay;
            text.value = message;
        }
        else{
            // text.value = '';
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (counter === cnt) {
                if(index <= queries.length){ 
                    // Execute your function every 30 seconds
                    showMessage(index < queries.length ? true : false);
                    setIndex(prev => prev+1);
                    dispatch(setAllowed(false));
                    
                    if(index != 0) dispatch(incrementQuery());
                }
            }
            
            // Decrease the counter
            setCounter((prevCounter) => prevCounter - 1);

            if(change === true || changeStatus === true){
                setCounter(() => cnt);
                if(change === true) setChange(() => false);
                if(changeStatus === true) dispatch(changeQuery(false));
            }
            
            if (counter <= 0) {
                // Reset the counter to 30 seconds when it reaches 0
                setCounter(cnt);
            }
            }, 1000); // 1000 milliseconds (1 second) interval
        
            // Cleanup function to clear the interval when the component is unmounted
            return () => clearInterval(intervalId);

    }, [counter]);

    useEffect(() => {
        console.log("Change",change);
        // if(index <= queries.length){ 
        //     // Execute your function every 30 seconds
        //     showMessage(index < queries.length ? true : false);
        //     setIndex(prev => prev+1);
        // }
        // console.log("Counter",counter);
    }, [change]);
    

    return (
        <div className='w-full h-auto flex flex-col justify-center items-center'>
            <div className='w-full flex items-center justify-around pl-[1.5rem]'>
                <textarea disabled={true} className=' w-[74%] h-[3rem] outline outline-black pt-3 rounded-3xl text-center queryShow'></textarea>
                <div>
                    <button type='button' className='yes w-[4rem] bg-green-600 hover:bg-green-500'
                    onClick={() => dispatch(setAllowed(true))}
                    >
                        Yes
                    </button>

                    <button type='button' className='no ml-5 w-[4rem] bg-red-600 hover:bg-red-500'
                    onClick={() => setChange(true)}
                    >
                        No
                    </button>
                </div>
            </div>

            <div className='w-full flex justify-end items-center pr-10'>
                <Clock />
            </div>
        </div>
    )
}

export default Query
