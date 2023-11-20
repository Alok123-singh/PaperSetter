import React from 'react'
import '../../index.css'
import {Link, NavLink} from 'react-router-dom'


function Home() {
    return (
        <div className = 'my-5 flex justify-around items-center  flex-wrap'>

            <div class="w-[300px] rounded-md border-2">
                <img
                    src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJsb2d8ZW58MHx8MHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
                    alt="Game"
                    class="h-[200px] w-full rounded-md object-cover"
                />
                <div class="p-4">
                    <h1 class="text-lg font-semibold">Query Game</h1>
                    <p class="mt-3 text-sm text-gray-600">
                        It books rooms according to query that comes at a time
                    </p>
                    <button
                    type="button"
                    class="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                        <Link to="/game">
                            Play
                        </Link>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Home
