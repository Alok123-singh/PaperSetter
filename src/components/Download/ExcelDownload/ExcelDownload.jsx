import React from 'react'
import * as XLSX from 'xlsx';
import { DownloadButton } from '../../index';

function ExcelDownload({ 
    data, 
    filename = 'data', 
    excludedFields = [] ,
    setLoading = (...input) => {},
}) {
    
    
    const excludeConfidentialFields = (data, excludedFields) => {
        return data.map((item) => {
            const filteredItem = { ...item };
        
            if (excludedFields && excludedFields.length > 0) {
                excludedFields.forEach((field) => {
                delete filteredItem[field];
                });
            }
        
            return filteredItem;
        });
    };

    // Helper function to format data based on its type
    const formatData = (inputData) => {
        if (Array.isArray(inputData)) {
            if (inputData.length > 0) {
                const firstElement = inputData[0];
        
                if (typeof firstElement === 'object' && firstElement !== null) {
                    // Array of objects
                    const headers = Object.keys(firstElement);
                    const rows = inputData.map((item) => {
                        return headers.map((header) => {
                        const cellValue = Array.isArray(item[header])
                            ? JSON.stringify(item[header])
                            : item[header];
                        return cellValue;
                        });
                    });
            
                    return [headers].concat(rows);
                } 
                else 
                {
                    // Array of strings or other primitive types
                    return [inputData];
                }
        }
    }
  
    // Default case, return empty array
    return [];
    };
  

    const downloadExcel = () => {
        const filteredData = excludeConfidentialFields(data, excludedFields);
        const ws = XLSX.utils.aoa_to_sheet(formatData(filteredData));

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, `${filename}.xlsx`);
    };
    
    return (
        <div className='w-[99%] flex justify-center md:justify-end items-center'> 
            <DownloadButton
            className='rounded-sm  text-xs hover:bg-blue-700' 
            onClick={downloadExcel}
            >
                Download Excel
            </DownloadButton>
        </div>
    );
};

export default ExcelDownload;
