import React, { useState, useEffect } from 'react';
import { MdError } from 'react-icons/md';
import { ExcelDownload, Loading2 } from '../../index'


function CardPagination({
    columnsDescription,
    items,
    defaultItemsPerPage = 5,
    itemsPerPageOptions = [5, 10, 15, 20, 30],
    paginationEnable = true,
    showRowNumbers = false,
    widthDesign = 'w-full',
    roundedDesign = '',
    columnsDesign = '',
    rowsDesign = '',
    enableExcelDownload=false,
    excludedFields = ["id"],
    filename='',
}) {

    const [loading, setLoading] = useState(false);

    const [highlightedIndex,setHiglightIndex] = useState(-1);

    const updatedColumns = showRowNumbers
        ? [{ header: '#', dataKey: 'rowNumber' }, ...columnsDescription]
        : columnsDescription;

    // Use a Set to filter out duplicates
    let uniqueOptionsSet = new Set(itemsPerPageOptions);

    // Check if defaultItemsPerPage is not already in the set
    if (!uniqueOptionsSet.has(defaultItemsPerPage)) {
        // If not, add it to the set
        uniqueOptionsSet.add(defaultItemsPerPage);
    }

    // Convert the set back to an array, sort it, and assign it to itemsPerPageOptions
    itemsPerPageOptions = [...uniqueOptionsSet].sort((a, b) => a - b);

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

    // styling for no records found section starts

    const [showNoRecords, setShowNoRecords] = useState(false);

    useEffect(() => {
        setShowNoRecords(items.length === 0);
    }, [items]);

    // styling for no records found section ends

    return (
        currentItems && currentItems.length > 0 ? (
        <div className={`py-10 ${enableExcelDownload === true && 'py-4'} w-full flex flex-wrap flex-col justify-center items-center ${widthDesign} `}>

            {enableExcelDownload === true && 
                <div className='w-full mb-6 flex flex-col justify-center items-center'>
                    <div className='w-full sm:w-[95%] flex-end items-center'>
                        <ExcelDownload data={items} filename={filename} excludedFields={excludedFields} setLoading={setLoading} />
                    </div>

                    {loading === true && 
                        <Loading2 message='Preparing Download' />
                    }
                </div>
            }

            <div className='w-[90%] bg-orange-100 rounded-md shadow-lg flex flex-col flex-wrap justify-between items-center'>
                <div className={`flex flex-wrap my-5 flex-col md:flex-row w-full justify-center items-center ${roundedDesign}`}>
                {currentItems.map((item, index) => (
                    
                    <div
                    onMouseEnter={() => setHiglightIndex(index)}
                    onMouseLeave={() => setHiglightIndex(-1)}
                    key={index}
                    className={` bg-white w-[16.1rem] sm:w-[21.5rem] p-3 border m-2 rounded-md border-gray-300 shadow-lg  ${roundedDesign}`}
                    >
                        {showRowNumbers && (
                            <div className={`bg-gray-300 ${highlightedIndex === index && 'bg-slate-400 text-white'} py-1 rounded-lg text-center ${rowsDesign}`}>
                            {index + 1 + (currentPage - 1) * itemsPerPage}
                            </div>
                        )}

                        {columnsDescription.map((column, columnIndex) => (
                            <div 
                                key={columnIndex} 
                                className={`w-full flex justify-between items-center p-1 border rounded-lg border-gray-300  ${rowsDesign}`}
                            >
                                <div

                                    onClick={() => (column.columnFunctionality && column.columnFunctionality.event.onClick) && column.columnFunctionality.event.onClick(columnIndex,column,item)}

                                    onMouseEnter={() => (column.columnFunctionality && column.columnFunctionality.event.onMouseEnter) && column.columnFunctionality.event.onMouseEnter(columnIndex,column,item)}

                                    onMouseLeave={() => (column.columnFunctionality && column.columnFunctionality.event.onMouseLeave) && column.columnFunctionality.event.onMouseLeave(columnIndex,column,item)}

                                    className={`${(column.columnFunctionality && column.columnFunctionality.event.onClick) ? 'cursor-pointer' : 'cursor-default'} w-1/2 flex  justify-start items-center p-2 text-start ${columnsDesign} `}
                                >
                                    {column.columnRender ? column.columnRender(columnIndex,column.header,item) : column.header}
                                </div>

                                {column.rowFunctionality ? (
                                    <div
                                        onClick={() => (column.rowFunctionality && column.rowFunctionality.event.onClick) && column.rowFunctionality.event.onClick(index,item)}

                                        onMouseEnter={() => (column.rowFunctionality && column.rowFunctionality.event.onMouseEnter) && column.rowFunctionality.event.onMouseEnter(index,item)}

                                        onMouseLeave={() => (column.rowFunctionality && column.rowFunctionality.event.onMouseLeave) && column.rowFunctionality.event.onMouseLeave(index,item)}

                                        className={`${(column.rowFunctionality && column.rowFunctionality.event.onClick) ? 'cursor-pointer' : 'cursor-default'} w-1/2`}
                                    >
                                        {(column.rowFunctionality && column.rowFunctionality.action) && column.rowFunctionality.action(item,index)}
                                        {column.dataRender ? column.dataRender(index,item[column.dataKey],item) : item[column.dataKey]}
                                    </div>
                                ) : (
                                    column.dataRender ? column.dataRender(index,item[column.dataKey],item) : item[column.dataKey]
                                )}
                            </div>
                        ))}
                    </div>
                ))}
                </div>

                {paginationEnable === true && (
                <div className="w-full text-sm md:w-auto flex md:space-x-5 flex-wrap justify-evenly md:justify-center items-center mt-4">
                    <span className="mr-1 font-bold text-rose-500 cursor-default">Items per page :</span>
                    <div className="relative inline-flex">
                    <select
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value, 10))}
                        className="appearance-none bg-white border border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                    >
                        {itemsPerPageOptions.map((option, index) => (
                        <option key={index} value={option}>
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
                        <path fillRule="evenodd" d="M7 8l5 5 5-5 2 1-7 7-7-7 2-1z" />
                        </svg>
                    </div>
                    </div>
                </div>
                )}

                {/* Creating the pagination buttons */}
                {paginationEnable === true && (
                <div className="w-full md:space-x-5 mb-5 text-sm flex flex-wrap flex-col md:flex-row justify-center items-center mt-[1rem] ">
                    {/* First and Previous buttons in the first row */}
                    <div className="w-full md:w-auto flex md:space-x-5 flex-wrap justify-evenly md:justify-center items-center ">
                    <div
                        onClick={handleFirst}
                        className="flex w-[2rem] justify-center items-center font-bold rounded-lg cursor-pointer"
                    >
                        First
                    </div>

                    <div
                        onClick={handlePrevious}
                        className="flex w-[2rem] justify-center items-center font-bold rounded-lg cursor-pointer"
                    >
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
                    </div>

                    <div
                        onClick={handleLast}
                        className="flex w-[2rem] justify-center items-center font-bold rounded-lg cursor-pointer"
                    >
                        Last
                    </div>
                    </div>
                </div>
                )}
            </div>
        </div>
        ) : (
        <div className='flex flex-col justify-center items-center h-[15rem] space-y-5'>
            <div className="flex flex-col items-center justify-center">
                <MdError style={{ fontSize: '3rem', marginRight: '0.5rem' }} />
                <span className="font-bold text-lg">No Records Found!</span>
            </div>
        </div>
        )
    );
}

export default CardPagination;
