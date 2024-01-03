import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Loading1, TablePagination } from '../../../components/index'
import { FaInfoCircle } from 'react-icons/fa';
import { GAME_ENDPOINTS } from '../../../apiEndpoints/index';
import { config } from '../../../configurations'
import { fetchHistory } from '../../../apiFunctionalities'


function History() {

    const [history,setHistory] = useState([]);
    // const username = useSelector(state => state.auth.username);
    const email = useSelector(state => state.auth.email);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);

    const [hoveredDetails, setHoveredDetails] = useState([]);


    useEffect(() => {
        fetchHistory(email, setHistory, setLoading, setError);

    }, []);

    const historyColumns = [
        {
            header : 'Exam Type',
            dataKey: 'examType', 
            label: 'Exam Type', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Name of exam','examType']);
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
                                hoveredDetails[2] === 'examType'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'examType' && (
                                <div
                                className={`hidden lg:flex w-[10rem]  justify-center items-center text-sm absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white p-2 px-2 rounded shadow-md border border-gray-300 z-1001`}
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
                const words = value.toLowerCase().split('_');
                const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
                return formattedWords.join(' ');
            }
        },
        {
            header : 'Score',
            dataKey: 'score', 
            label: 'Score', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Score in percentage','score']);
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
                                hoveredDetails[2] === 'score'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'score' && (
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
                            {parseFloat(value).toFixed(2).toString() + ''}

                        </div>;
            } 
        },
        {
            header : 'Time',
            dataKey: 'time', 
            label: 'Timestamp', 
            columnFunctionality : {
                event: {
                    onMouseEnter: (index,item) => {
                        // alert('Entered')
                        setHoveredDetails([index,'Time when the exam was given','time']);
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
                                hoveredDetails[2] === 'time'
                                    ? 'z-10'
                                    : 'z-1'
                            }`}
                        >
                            {hoveredDetails.length > 0 &&
                            hoveredDetails[0] === index &&
                            hoveredDetails[2] === 'time' && (
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
                const options = { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit',
                  hour12: true,
                };
                
                const formattedDate = new Date(value).toLocaleString('en-US', options);
                return formattedDate;
            }
        },
    ];

    return loading ? (
        <Loading1 />

    ) : (
        <div className='w-full justify-center items-center'>
            {(error && error.length > 0) && <div className='flex flex-col'>
                {
                    error.map((err,index) => 
                    (<p key={index} className="text-red-600 mt-4 text-center">{err}</p>))
                }
            </div>}

            <TablePagination columnsDescription={historyColumns} items={history} showRowNumbers={true}columnsDesign='cursor-default' rowsDesign='hover:bg-gray-200 cursor-default' />
        </div>
    );
}

export default History
