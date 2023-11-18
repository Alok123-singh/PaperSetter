import React, { useState, useEffect } from 'react';
import '../index.css'
import {useDispatch} from 'react-redux'
import { setClock } from '../app/clockSlice';


const Clock = () => {
  const initialTime = 30 * 60; // 30 minutes in seconds
  const [time, setTime] = useState(initialTime);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setClock(time));

  }, [time]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalId);
          return 0;
        }
      });

    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {

  }, [time]);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className='pt-2'>
      <p>Time Remaining: {formatTime(time)}</p>
    </div>
  );
};

export default Clock;
