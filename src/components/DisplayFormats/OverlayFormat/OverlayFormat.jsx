import React, { useState } from 'react'
import { Loading1, TablePagination } from '../../../components/index'


function OverlayFormat({
    items,
    columnsDescription,
    onClose = (...input) => {},
    displayDesign,
    enableExcelDownload = false,
}) {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState([]);

    const [hoveredDetails, setHoveredDetails] = useState([]);


    const handleClickOutside = (event) => {
        if (event.target.classList.contains('modal-overlay3')) {
            onClose();
        }
    };

    return loading ? (
        <Loading1 />

    ) : (
        <div className={`fixed cursor-default top-0 left-0 w-[100%] h-[100%] flex  items-center modal-overlay3 bg-black bg-opacity-50 z-50  ${(displayDesign.design && displayDesign.design.start) ? displayDesign.design.start : 'justify-center'} `} style={{backgroundColor : 'rgba(0, 0, 0, 0.5)'}}  onClick={handleClickOutside}>

            <div className={`relative overflow-y-auto max-h-[95%] w-[95%] md:w-3/4 lg:w-1/2 ${displayDesign.width && displayDesign.width} ${displayDesign.height && displayDesign.height}  bg-white p-[20px] rounded-md z-1001`}>

                <div className='w-full justify-center items-end font-lg font-bold'>
                    {displayDesign.title && displayDesign.title}
                </div>

                {/* Errors section */}
                {(error && error.length > 0) && <div className='flex flex-col'>
                    {
                        error.map((err,index) => 
                        (<p key={index} className="text-red-600 mt-4 text-center">{err}</p>))
                    }
                </div>}

                <TablePagination columnsDescription={columnsDescription} items={items} showRowNumbers={true} columnsDesign='cursor-default' rowsDesign='hover:bg-gray-200 cursor-default' enableExcelDownload={enableExcelDownload} filename='Students_details' excludedFields={["_id"]} />
                
            </div>
                
        </div>
    );
}

export default OverlayFormat
