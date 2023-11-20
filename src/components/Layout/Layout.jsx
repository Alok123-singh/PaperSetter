import React from 'react'
import '../../index.css'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className='min-h-screen w-full content-between'>
            <div className='w-full '>
                <Header />

                <main>
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    )
}

export default Layout
