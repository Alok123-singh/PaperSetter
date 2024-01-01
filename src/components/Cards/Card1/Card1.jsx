import React from 'react'
import { Link } from 'react-router-dom'

function Card1({
    imageSource = '#',
    link = '#',
    title = 'Title'
}) {
    return (
        <div className = 'py-10 flex justify-around items-center dark:bg-gray-40  flex-wrap'>

            <Link to={link}>
                <div className="w-[195px] h-[235px] rounded-md border-2 bg-gray-100 dark:bg-gray-200 border-gray-300 dark:border-gray-500 flex flex-col justify-center items-center">
                    <img
                        src={imageSource}
                        alt="Game"
                        className="h-[130px] w-[90%] rounded-lg object-cover mt-2 ml-1.5"
                    />

                    <div className="p-2 pb-6 flex flex-col justify-center items-center">
                        <div
                            type="text"
                            className=" w-[80%] text-xl text-center font-sans bg-transparent text-purple-700   hover:text-purple-500   rounded"
                        >
                            {title}
                        </div>
                    </div>
                </div>
            </Link>

        </div>
    )
}

export default Card1
