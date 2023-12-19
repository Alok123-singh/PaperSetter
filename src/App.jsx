import React, { useState } from 'react'
import { Header, Footer, Loading, ErrorBoundary } from './components/index.js'
import { Outlet, useLocation } from 'react-router-dom'

function App() {

    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const excludedPatterns = ['/inventory-management', '/inventory-management/result', '/admin/instructor/course'];

    // Check if the current location pathname starts with any pattern in the excludedPatterns array
    const shouldHideHeaderFooter = excludedPatterns.some(pattern => location.pathname.startsWith(pattern));


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
