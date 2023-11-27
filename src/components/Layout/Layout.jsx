import React from 'react'
import '../../index.css'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {

    const location = useLocation();

    const excludedUrls = ['/inventory-management', '/inventory-management/result'];

    // Check if the current location pathname is in the excludedUrls array
    const shouldHideHeaderFooter = excludedUrls.includes(location.pathname);

    return (
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

export default Layout
