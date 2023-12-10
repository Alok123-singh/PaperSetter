import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Pagination({ columns, items }) {
    // Pagination logic starts below
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calculate the indexes of the items to display on the current page.
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    let pages = [];
    for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) pages.push(i);

    // Dynamically determine the range of page buttons to display
    const pageRange = 3;

    // Update the startPage and endPage values
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(
        Math.max(pageRange, startPage + pageRange - 1),
        Math.ceil(items.length / itemsPerPage)
    );

    // If there are not enough pages to fill the range, adjust the values
    if (endPage - startPage + 1 < pageRange) {
        startPage = Math.max(1, endPage - pageRange + 1);
    }

    // Change the current page.
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle "First" button click
    const handleFirst = () => {
        paginate(1);
    };

    // Handle "Last" button click
    const handleLast = () => {
        paginate(Math.ceil(items.length / itemsPerPage));
    };

    // Handle "Previous" button click
    const handlePrevious = () => {
        if (currentPage > 1) {
        paginate(currentPage - 1);
        }
    };

    // Handle "Next" button click
    const handleNext = () => {
        if (currentPage < Math.ceil(items.length / itemsPerPage)) {
        paginate(currentPage + 1);
        }
    };

    return (
        currentItems && currentItems.length > 0 ? 

        <div className="w-full py-10 flex flex-wrap flex-col justify-center">
            <div className="w-[88%] mx-auto overflow-x-auto shadow-lg shadow-slate-300">
                <table className="min-w-full bg-white border border-gray-300 rounded-md">
                    <thead>
                        <tr>
                            {columns.map((column, columnIndex) => (
                                <th
                                    key={columnIndex}
                                    className="p-2 border-b border-gray-300 text-center"
                                >
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                {columns.map((column, columnIndex) => (
                                    <td
                                        key={columnIndex}
                                        className="py-3  px-[2rem] border-b border-gray-300 text-center"
                                    >
                                        {column.functionality ? (
                                            <div
                                                onClick={() => column.functionality.event.onClick(index)}
                                                className="cursor-pointer"
                                            >
                                                {column.functionality.action(item,index)}
                                                {column.render ? column.render(item[column.dataKey]) : item[column.dataKey]}
                                            </div>
                                        ) : (
                                            column.render ? column.render(item[column.dataKey]) : item[column.dataKey]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Creating the pagination buttons */}
            <div className="w-full space-x-5 flex flex-wrap flex-col md:flex-row justify-center items-center mt-[1rem] ">
                {/* First and Previous buttons in the first row */}
                <div className="flex space-x-5 flex-wrap justify-center items-center ">
                    <div
                        onClick={handleFirst}
                        className="flex justify-center items-center font-bold  rounded-lg cursor-pointer"
                    >
                        <IoIosArrowBack size={20} />
                        <IoIosArrowBack size={20} />
                        
                    </div>

                    <div
                        onClick={handlePrevious}
                        className="flex justify-center items-center font-bold  rounded-lg cursor-pointer"
                    >
                        <IoIosArrowBack size={20} />
                        
                    </div>
                </div>

                {/* Page buttons in the second row */}
                <div className="flex space-x-5 flex-wrap justify-center items-center ">
                {Array.from(
                    { length: Math.min(endPage - startPage + 1, pageRange) },
                    (_, i) => startPage + i
                ).map((value, index) => (
                    <div
                    key={index}
                    onClick={() => paginate(value)}
                    className={`${currentPage === value && 'bg-gray-700 dark:bg-purple-500'} w-[2rem] m-1 p-1 flex justify-center items-center text-center bg-gray-500 hover:bg-gray-400 dark:bg-gray-800 rounded-full font-bold text-white dark:text-gray-300 cursor-pointer`}
                    >
                    {value}
                    </div>
                ))}
                </div>

                <div className="flex space-x-5 flex-wrap justify-center items-center ">
                    <div
                        onClick={handleNext}
                        className="flex justify-center items-center font-bold rounded-lg cursor-pointer"
                    >
                        <IoIosArrowForward size={20} />
                        
                    </div>

                    <div
                        onClick={handleLast}
                        className="flex justify-center items-center font-bold  rounded-lg cursor-pointer"
                    >
                        <IoIosArrowForward size={20} />
                        <IoIosArrowForward size={20} />
                        
                    </div>
                </div>
            </div>

        </div> : 
        <div className='flex justify-center items-center h-[15rem]'>
            No Records Found !
        </div>
    );
}

export default Pagination;
