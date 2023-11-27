import React from 'react'
import '../../index.css'
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div className = 'py-10 flex justify-around items-center dark:bg-gray-40  flex-wrap'>

            <div className="w-[195px] rounded-md border-2 bg-gray-100 dark:bg-gray-200 border-gray-300 dark:border-gray-500 flex flex-col justify-center items-center">
                <Link to={"/game"}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEXB-pdC3jlinrQ5Y9rLgR6F_gtPgk1W0ejT-laLKGbEDsllFqvFw39r0mExvLPHnK-7w&usqp=CAU"
                        alt="Game"
                        className="h-[130px] w-[90%] rounded-lg object-cover mt-2 ml-1.5"
                    />
                </Link>

                <div className="p-2 pb-6 flex flex-col justify-center items-center">
                    <Link to="/game">
                        <div
                            type="text"
                            className=" text-xl text-center font-sans bg-transparent text-purple-700   hover:text-purple-600  rounded"
                        >
                            Inventory Management
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Home
