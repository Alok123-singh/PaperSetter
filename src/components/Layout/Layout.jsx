import React from 'react'
import '../../index.css'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {

    const location = useLocation();

    // Check if the current location pathname is "/game"
    const isGameRoute = location.pathname === '/game';

    return (
        <div className='min-h-screen w-full content-between'>
            <div className='w-full '>
                {!isGameRoute && <Header />}

                <main>
                    <Outlet />
                </main>

                {!isGameRoute && <Footer />}
            </div>
        </div>
    )
}

export default Layout
