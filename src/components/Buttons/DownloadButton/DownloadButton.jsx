import React from 'react'

function DownloadButton({
    children,
    type = "button",
    className = "",
    ...props
}) {
    return (
        <button type={type} className={`bg-black hover:bg-gray-700 text-gray-200 font-bold py-2 px-4 rounded inline-flex items-center ${className}`} {...props}>
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
            </svg>

            <span>
                {children}
            </span>
        </button>
    )
}

export default DownloadButton
