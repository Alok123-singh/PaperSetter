import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function History() {

    const [history,setHistory] = useState([]);
    const username = useSelector(state => state.auth.username);
    const [loading,setLoading] = useState(false);

    const fetchHistory = async (username) => {
        setLoading(true);

        try{
            const credentials = btoa('5595832005:5dceeeb7-47f3-4dc9-8f00-2845af1da8d2');
            const response = await fetch(`http://localhost:8081/simlearn/score/api/v1/student/find/${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${credentials}`,
                },
            });
            const data = await response.json();

            if(data.length !== 0)
                setHistory(data.reverse());

        }
        catch(err){
            console.log("Fetch history error :",err);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchHistory(username);

    }, [])


    // Pagination logic starts below
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    // Calculate the indexes of the items to display on the current page.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

    let pages =[];
    for(let i=1; i <= Math.ceil(history.length/itemsPerPage); i++)  pages.push(i);

    // Change the current page.
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle "Previous" and "Next" button clicks
    const handlePrevious = () => {
        if (currentPage > 1) {
        paginate(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < Math.ceil(history.length / itemsPerPage)) {
        paginate(currentPage + 1);
        }
    };

    const formatString = (title) => {
        const words = title.toLowerCase().split('_');
        const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        return formattedWords.join(' ');
    }

    const showScore = (score) => {
        return parseFloat(score).toFixed(2).toString() + ' %';
    }

    const formatTimestamp = (timestamp) => {
        const options = { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: true,
        };
        
        const formattedDate = new Date(timestamp).toLocaleString('en-US', options);
        return formattedDate;
    };

    return loading ? (
        <div className='dark:bg-gray-400 w-full flex justify-center items-center h-screen'>
        <div className='bg-blue-400 w-[6rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>

    ) : (

        <div className='w-full py-10 flex flex-wrap flex-col justify-center'>
        {/* Displaying the current page items */}
            <div className='w-full flex flex-col flex-wrap space-y-7 justify-center items-center'>
                {currentItems.map((item,index) => {

                return <div 
                    key={index} 
                    className='w-[95%] md:w-4/5 h-[5rem] md:h-[3.5rem] p-1 md:p-0 flex justify-center cursor-default items-center bg-gray-200 rounded-md'
                    >
                        <div className='w-1/3 flex text-center justify-center items-center'>
                            {formatString(item.examType)}
                        </div>

                        <div className='w-1/3 flex text-center justify-center items-center'>
                            {showScore(item.score)}
                        </div>

                        <div className='w-1/3 flex text-center justify-center items-center'>
                            {formatTimestamp(item.time)}
                        </div>
                </div>
                })}
            </div>

            {/* Creating the pagination buttons */}
            <div className='w-full flex flex-wrap flex-col justify-center items-center mt-[3rem] mb-[1rem]'>
                <button 
                onClick={handlePrevious}
                className='h-[2.5rem] w-[5rem] m-2 p-2 flex justify-center items-center font-bold bg-blue-400 hover:bg-blue-500 rounded-lg'
                >
                    Previous
                </button>

                <div className='flex flex-wrap justify-center items-center'>
                    {pages.map((value,index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={`${currentPage == index + 1 && 'bg-gray-300 dark:bg-purple-500'} h-[2.5rem] w-[3rem] m-1 p-1 flex justify-center items-center bg-gray-400 hover:bg-gray-300 dark:bg-gray-800 rounded-lg font-bold text-white dark:text-gray-300`}>
                        {value}
                    </button>
                    ))}
                </div>

                <button 
                onClick={handleNext} 
                className='h-[2.5rem] w-[4.5rem] m-2 p-2 flex justify-center items-center font-bold bg-blue-400 hover:bg-blue-500 rounded-lg'>
                    Next
                </button>
            </div>
        </div>
    );

    
}

export default History
