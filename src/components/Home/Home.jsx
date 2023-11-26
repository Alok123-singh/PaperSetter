import React from 'react'
import '../../index.css'
import {Link, NavLink} from 'react-router-dom'

function Home() {
    return (
        <div className = 'py-10 flex justify-around items-center dark:bg-gray-400  flex-wrap'>

            <div className="w-[270px] rounded-md border-2 dark:bg-gray-200 border-gray-300 dark:border-gray-500 flex flex-col justify-center items-center">
                <img
                    src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                    alt="Game"
                    className="h-[160px] w-[95%] rounded-lg object-cover mt-2"
                />
                <div className="p-2 flex flex-col justify-center items-center">
                    <Link to="/game">
                        <button
                            type="button"
                            className=" py-2 px-2 text-[14px] font-semibold bg-transparent hover:bg-blue-500 text-blue-700   hover:text-white border border-blue-400 dark:border-blue-300 hover:border-transparent rounded"
                        >
                            Book Rooms
                        </button>
                    </Link>
                    {/* <p class="mt-3 text-sm  text-center">
                        It books rooms according to query that comes at a time
                    </p>
                    <Link to="/game">
                        <button
                        type="button"
                        class="mt-4 py-2 px-4 text-[14px] font-semibold bg-transparent hover:bg-blue-500 text-blue-700  hover:text-white border border-blue-400 hover:border-transparent rounded"
                        >
                            Play
                        </button>
                    </Link> */}
                </div>
            </div>

        </div>
    )
}

export default Home
