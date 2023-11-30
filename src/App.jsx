import React, { useState } from 'react'
import { Header, Footer } from './components/index.js'
import { Outlet, useLocation } from 'react-router-dom'

function App() {

    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const excludedUrls = ['/inventory-management', '/inventory-management/result'];

    // Check if the current location pathname is in the excludedUrls array
    const shouldHideHeaderFooter = excludedUrls.includes(location.pathname);

    return loading ? (

        <div className='h-screen w-full flex justify-center items-center'>
            <div className='bg-blue-400 w-[6rem] h-[3rem] flex justify-center items-center p-2 m-2 rounded-md'> Loading! </div>
        </div>

        ) : (

        <div className='min-h-screen w-full content-between'>
            <div className='w-full '>
                {!shouldHideHeaderFooter && <Header />}

                <main>
                    <Outlet />
                </main>

                {!shouldHideHeaderFooter && <Footer />}
            </div>
        </div>
    )
}

export default App
