import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Loading1, TablePagination } from '../../../components/index'
import { FaInfoCircle } from 'react-icons/fa';


function Result() {

    const [loading, setLoading] = useState(false);

    const title = useSelector(state => state.result.title);
    const noOfQueries = useSelector(state => state.result.noOfQueries);
    const score = useSelector(state => state.result.score);
    const resultDescription = useSelector(state => state.result.resultDescription);

    const [hoveredDetails, setHoveredDetails] = useState([]);


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

    const columnsDescription = [
        {
            header : 'Occupancy',
            dataKey: 'occupancy', 
            label: 'Occupancy', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,resultDescription,'occupancy']);
                    },
                    onMouseLeave: (index,item) => {
                        setHoveredDetails([]);
                    }
                },
    
            },
            columnRender: (index,value) => {
                return <div
                            className={`w-full h-full flex flex-wrap justify-center items-center relative ${
                                hoveredDetails.length > 0 &&
                                hoveredDetails[0] === index &&
                                hoveredDetails[2] === 'occupancy'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'occupancy' && (
                                <div
                                className={`hidden lg:flex w-[10rem] justify-center items-center text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
                                >
                                <div className='flex flex-col justify-center items-center'>
                                    <FaInfoCircle size={16} className="text-blue-500" />
                                    {hoveredDetails[1]}
                                </div>
                                </div>
                            )}
                            {value}
                            
                        </div>;
            },
            dataRender: (index, value, currentItem) => {
                return  <div
                            className={`w-full h-full flex flex-wrap justify-center items-center`}
                        >
                            {showScore()}
                            
                        </div>;
            }
        },
        
    ];

    const [items,setItems] = useState([
        {
            occupancy : 0.00,
        },
    ]);

    return loading ? (
        <Loading1 />
    ) : 
    (
        <div className='w-full h-screen flex flex-col justify-center items-center dark:bg-gray-40  flex-wrap'>
            <p className='font-bold text-xl font-serif h-auto'>Result</p>
            
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

            <TablePagination columnsDescription={columnsDescription} items={items} paginationEnable={false} widthDesign='w-[20%] 'roundedDesign='rounded-lg' columnsDesign='cursor-default' rowsDesign='hover:bg-gray-200 cursor-default' />

            <div className='flex w-[10rem] flex-col items-center'>

                <Link 
                to={"/"} 
                >
                    <div className='w-[7rem] mt-4  h-[2.2rem] p-[8px] cursor-pointer flex justify-center items-center bg-rose-500 hover:bg-rose-400 text-slate-100 font-bold border-b-4 border-rose-700 hover:border-rose-500 rounded'>
                        Go To Home
                    </div>
                </Link>
                
            </div>
        </div>
    )
}

export default Result
