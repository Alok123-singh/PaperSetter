import React from 'react'
import { useSelector } from 'react-redux'

function Result() {

    const title = useSelector(state => state.result.title);
    const noOfQueries = useSelector(state => state.result.noOfQueries);
    const score = useSelector(state => state.result.score);

    const getCurrentDate = (separator='') => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

    const showScore = () => {
        return parseFloat(score).toFixed(2).toString() + ' %';
    }

    const formatString = (title) => {
        const words = title.toLowerCase().split('_');
        const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return formattedWords.join(' ');
    }

    return (
        <div className='py-10 w-full h-auto flex flex-col justify-center items-center dark:bg-gray-40  flex-wrap'>
            <p className='font-bold text-xl font-serif h-auto'>Result Page</p>

            <div className='flex flex-col w-1/3 p-2 mt-7 '>
                <div className=' w-full flex '>
                    <p className='w-1/3'>Title: </p>
                    <p className='w-1/2'> {formatString(title)} </p>
                </div>
                <div className='w-full flex '>
                    <p className='w-1/3'>Date: </p>
                    <p className='w-1/2'> {getCurrentDate('/')} </p>
                </div>
                <div className='w-full flex '>
                    <p className='w-1/3'> No. of Queries: </p>
                    <p className='w-1/2'> {noOfQueries} </p>
                </div>
            </div>

            <div className='w-full flex flex-col mt-5 items-center'>
                <h2 className='underline '> KPI </h2>

                <div className='flex h-[6rem] w-1/3 justify-center items-center '>
                    <div className='flex flex-col justify-center items-center border w-1/3 h-[4rem] border-black '>
                        <p className='font-bold font-sans'>
                            ARR
                        </p>

                        <p>
                            3612.13
                        </p>
                    </div>

                    <div className='flex flex-col justify-center items-center border w-1/3 h-[4rem] border-black'>
                        <p className='font-bold font-sans'>
                            RevPAR
                        </p>

                        <p>
                            2373.68
                        </p>
                    </div>

                    <div className='flex flex-col justify-center items-center border w-1/3 h-[4rem] border-black'>
                        <p className='font-bold font-sans'>
                            OCCUPANCY
                        </p>

                        <p>
                            {showScore()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Result
