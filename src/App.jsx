import React, { useState } from 'react'
import { Header, Footer, Loading, ErrorBoundary } from './components/index.js'
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
                <ErrorBoundary>
                    {!shouldHideHeaderFooter && <Header />}

                    <main>
                        <Outlet />
                    </main>

                    {!shouldHideHeaderFooter && <Footer />}
                </ErrorBoundary>
            </div>
        </div>
    )
}

export default App
