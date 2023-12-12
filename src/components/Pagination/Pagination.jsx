import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function Pagination({ 
        columns, 
        items, 
        defaultItemsPerPage = 5, 
        itemsPerPageOptions = [5, 10, 15, 20, 30],
        paginationEnable = true,
    }) {
    // Pagination logic starts below
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

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

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };

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
            <div className="w-[95%] mx-auto overflow-x-auto shadow-lg shadow-slate-300">
                <table className="min-w-full  bg-white border border-gray-300 rounded-md">
                    <thead>
                        <tr>
                            {columns.map((column, columnIndex) => (
                                <th
                                    key={columnIndex}
                                    className="p-2 border-b border-gray-300 text-center"
                                >
                                    {column.columnRender ? column.columnRender(columnIndex,column.header) : column.header}
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
                                        className="py-3 px-3 border-b border-gray-300 text-center"
                                    >
                                        {column.functionality ? (
                                            <div
                                                onClick={() => column.functionality.event.onClick(index)}
                                                className="cursor-pointer"
                                            >
                                                {column.functionality.action && column.functionality.action(item,index)}
                                                {column.dataRender ? column.dataRender(index,item[column.dataKey]) : item[column.dataKey]}
                                            </div>
                                        ) : (
                                            column.dataRender ? column.dataRender(index,item[column.dataKey]) : item[column.dataKey]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {paginationEnable === true && 
                <div>
                {/* Stylish items per page dropdown */}
                    <div className="w-full text-sm md:w-auto flex md:space-x-5 flex-wrap justify-evenly md:justify-center items-center mt-4">
                        <span className="mr-1">Items per page :</span>
                        <div className="relative inline-flex">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value, 10))}
                                className="appearance-none bg-white border border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                            >
                                {itemsPerPageOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7 8l5 5 5-5 2 1-7 7-7-7 2-1z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>


                    {/* Creating the pagination buttons */}
                    <div className="w-full md:space-x-5 text-sm flex flex-wrap flex-col  md:flex-row justify-center items-center mt-[1rem] ">
                        {/* First and Previous buttons in the first row */}
                        <div className="w-full md:w-auto flex md:space-x-5 flex-wrap justify-evenly md:justify-center items-center ">
                            <div
                                onClick={handleFirst}
                                className="flex w-[2rem] justify-center items-center font-bold  rounded-lg cursor-pointer"
                            >
                                {/* <IoIosArrowBack size={20} /> */}
                                {/* <IoIosArrowBack size={20} /> */}
                                First
                                
                            </div>

                            <div
                                onClick={handlePrevious}
                                className="flex w-[2rem] justify-center items-center font-bold  rounded-lg cursor-pointer"
                            >
                                {/* <IoIosArrowBack size={20} /> */}
                                Prev
                                
                            </div>
                        </div>

                        {/* Page buttons in the second row */}
                        <div className="flex md:space-x-5 flex-wrap justify-center items-center ">
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

                        <div className="w-full md:w-auto flex md:space-x-5 flex-wrap justify-evenly md:justify-center items-center ">
                            <div
                                onClick={handleNext}
                                className="flex w-[2rem] justify-center items-center font-bold rounded-lg cursor-pointer"
                            >
                                Next
                                {/* <IoIosArrowForward size={20} /> */}
                                
                            </div>

                            <div
                                onClick={handleLast}
                                className="flex w-[2rem] justify-center items-center font-bold  rounded-lg cursor-pointer"
                            >
                                Last
                                {/* <IoIosArrowForward size={20} /> */}
                                {/* <IoIosArrowForward size={20} /> */}
                                
                            </div>
                        </div>
                    </div>
                </div>
            }
            

        </div> : 
        <div className='flex justify-center items-center h-[15rem]'>
            No Records Found !
        </div>
    );
}

export default Pagination;
