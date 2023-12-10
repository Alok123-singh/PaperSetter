import React, { useState } from 'react'
import { Header, Footer, Loading } from './components/index.js'
import { Outlet, useLocation } from 'react-router-dom'

function App() {

    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const excludedUrls = ['/inventory-management', '/inventory-management/result'];

    // Check if the current location pathname is in the excludedUrls array
    const shouldHideHeaderFooter = excludedUrls.includes(location.pathname);

    return loading ? (
            <Loading />
        ) : 
        (

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
