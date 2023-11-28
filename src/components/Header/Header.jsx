import React,{ useState } from 'react'
import {Link, NavLink} from 'react-router-dom'
import { Logo, Container } from '../index.js'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../../store/authSlice'


function Header() {

    const dispatch = useDispatch();
    const [showAccountOptions,setShowAccountOptions] = useState(false);
    const [show,setShow] = useState(false);
    const loginStatus = useSelector(state => state.auth.loginStatus);

    const navItems = [
        // {
        //     name : "Home",
        //     slug : '/',
        //     active : true
        // },
        // {
        //     name : "Contact",
        //     slug : '/contact',
        //     active : true
        // },
        // {
        //     name : "About",
        //     slug : '/about',
        //     active : true
        // },
        
    ]

    const navLinkStyles = ({ isActive }) => {
        return {
            
          color: '',
          fontWeight: isActive ? 'bolder' : 'normal',
          backgroundColor : isActive ? 'rgb(148, 163, 184) dark:rgb(16 185 129)' : '',
          borderRadius: '15px'
        };
    };

    const toggle = () => {
        setShow(prev => !prev);
    }

    return (
        <header className='w-full py-1  dark:bg-slate-700 dark:text-white shadow-md dark:shadow-2xl dark:shadow-zinc-400'>
            <Container>
                <nav className='relative flex justify-between py-1 sm:py-0 md:justify-between flex-wrap'>
                    <div className=' mx-2'>
                        <Link to='/' >
                            <Logo width='70px'   />
                        </Link>
                    </div>
                    <div className={`${loginStatus? 'md:pl-[0.1rem]' : 'sm:pl-[4.1rem]'} text-sm hidden text-black dark:text-white sm:pl-[1.2rem] mt-1 w-auto sm:flex justify-evenly flex-wrap`}>
                        {navItems.map((item) => 
                        item.active ? (
                        <div className='px-4' key={item.name}>
                            <NavLink 
                            style={navLinkStyles}
                            to={`${item.slug}`}
                            >
                                
                                    <button
                                    // onClick={() => navigate(item.slug)}
                                    className='py-2 w-[4rem] hover:bg-slate-200 dark:hover:bg-slate-600  rounded-lg my-1'
                                    >{item.name}</button>
                                
                            </NavLink>
                        </div>
                        ) : null
                        )}

                        <div className='flex justify-center items-center text-xl cursor-default font-sans font-bold text-green-600'>
                            SIMLERN
                        </div>
                        
                    </div>

                    <div className='hidden sm:flex text-sm justify-between h-auto'>

                        {loginStatus && (

                            <div className='w-[80px] flex justify-end'>
                                <div
                                className='mt-[2px] p-1 h-[2.8rem] w-[2.8rem] cursor-default text-lg flex justify-center items-center text-center duration-200 bg-slate-300 hover:bg-slate-400 dark:hover:bg-slate-600 rounded-full'
                                onClick={() => setShowAccountOptions(prev => !prev)}
                                >
                                    AB
                                </div>
                            </div>

                            // <div className='w-[7rem]'>
                            //     <NavLink 
                            //     style={navLinkStyles}
                            //     className='mt-[0rem]   sm:pt-[7px] mr-6  p-1 sm:my-[0.4rem] h-[2.3rem] flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600 '
                            //     to={'/my-account'}
                            //     // onClick={() => navigate('/my-account')}
                            //     >
                            //         My Account
                            //     </NavLink>
                            // </div>
                        )}

                        {showAccountOptions && (
                            <div className='absolute right-[-1rem] mt-[3rem] w-1/6 bg-white dark:bg-slate-700 border dark:border-gray-400 rounded-md shadow-md z-10'>
                                <Link
                                to={"/my-account"}
                                >
                                    <div className='p-2'
                                    onClick={() => {
                                        setShowAccountOptions(false);
                                    }}
                                    >
                                        Account
                                    </div>
                                </Link>

                                <Link
                                to={"/history"}
                                >
                                    <div 
                                    className='p-2' 
                                    onClick={() => {
                                        setShowAccountOptions(false);
                                    }}>
                                        History
                                    </div>
                                </Link>

                                <div className=''> 
                                    <div 
                                    className='p-2 cursor-pointer' 
                                    onClick={() => {
                                        dispatch(setLoginStatus(false))
                                        setShowAccountOptions(false);
                                    }}>
                                        Logout
                                    </div>
                                </div>
                            </div>
                        )}

                        {!loginStatus && (
                            <div className='w-[3rem]'> 
                                <NavLink to="/login" 
                                style={navLinkStyles}
                                >
                                    <button 
                                    className='mt-[0rem]  sm:pt-[7px]  p-1 sm:my-[0.4rem] h-[2.3rem] flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600  rounded-lg '
                                    
                                    >
                                        Login
                                    </button>
                                </NavLink>
                            </div>
                        )}
                        {!loginStatus && (
                            <div className='w-[3rem] sm:ml-8 sm:mr-4'>
                                <NavLink to="/signup" 
                                style={navLinkStyles}
                                >
                                    <button 
                                    className='mt-[0rem] sm:pt-[7px] p-1 sm:my-[0.4rem] h-[2.3rem] flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600  rounded-lg '
                                    
                                    >
                                        Signup
                                    </button>
                                </NavLink>
                            </div>
                        )}
                        {/* {loginStatus && (
                            <div className=''> 
                                <LogoutBtn />
                            </div>
                        )} */}
                        {/* <div className={`${!loginStatus ? "mx-4 mt-0 sm:mt-[0.1rem]" : ' mx-4 mt-0 sm:mt-[0.1rem]'}`}>
                            <ThemeButton />
                        </div> */}
                    </div>

                    <div className='flex sm:hidden'>
                        <button 
                        className="relative group"
                        onClick={toggle}
                        >
                            <div className="relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-400 dark:bg-slate-800 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                                <div className="transform transition-all duration-150 overflow-hidden -translate-y-5 group-focus:translate-y-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                    </svg>
                                </div>

                                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden -translate-y-3">
                                    <div className="bg-white mb-1.5 h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6"></div>
                                    <div className="bg-white mb-1.5 h-[2px] w-7 rounded transform transition-all duration-300 group-focus:translate-y-6 delay-75"></div>
                                    <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left group-focus:translate-y-6 delay-100"></div>
                                </div>
                            </div>
                        </button>

                    </div>

                </nav>
            </Container>

            <div className={`${show ? 'flex' : 'hidden'} sm:hidden flex flex-col item-center flex-wrap`}>
                <div className={` text-black dark:text-white text-sm md:text-md flex ${loginStatus ? 'justify-between p-4' : 'justify-center'} flex-wrap`}>
                    {navItems.map((item) => 
                        item.active ? (
                        <div className='px-4' key={item.name}>
                            <NavLink 
                            style={navLinkStyles}
                            to={`${item.slug}`}
                            >
                                
                                    <button
                                    // onClick={() => navigate(item.slug)}
                                    className='py-2 w-[4rem] hover:bg-slate-200 dark:hover:bg-slate-600  rounded-lg my-1'
                                    >{item.name}</button>
                                
                            </NavLink>
                        </div>
                        ) : null
                    )}

                    <div className='flex justify-center items-center text-xl cursor-default font-sans font-bold text-green-600'>
                            SIMLERN
                    </div>

                    {loginStatus && (

                        <div
                        className='py-2 text-sm  w-[3rem] cursor-default flex justify-center items-center text-center duration-200  hover:bg-slate-200 dark:hover:bg-slate-600 rounded-full '
                        onClick={() => setShowAccountOptions(prev => !prev)}
                        >
                            AB
                        </div>

                        // <NavLink 
                        // style={navLinkStyles}
                        // className='mt-4 p-1 h-[2.3rem] text-sm pr-6 flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg'
                        // to={'/my-account'}
                        // // onClick={() => navigate('/my-account')}
                        // >
                        //     My Account
                        // </NavLink>
                    )}

                    {showAccountOptions && (
                        <div className='absolute text-sm right-0 mt-[3rem] w-1/3 md:w-1/6 bg-white dark:bg-slate-700 border dark:border-gray-400 rounded-md shadow-md z-10'>
                            <Link
                            to={"/my-account"}
                            >
                                <div className='p-2'
                                onClick={() => {
                                    setShowAccountOptions(false);
                                }}
                                >
                                    Account
                                </div>
                            </Link>

                            <Link
                            to={"/history"}
                            >
                                <div 
                                className='p-2' 
                                onClick={() => {
                                    setShowAccountOptions(false);
                                }}>
                                    History
                                </div>
                            </Link>

                            <div className=''> 
                                <div 
                                className='p-2 cursor-pointer' 
                                onClick={() => {
                                    dispatch(setLoginStatus(false))
                                    setShowAccountOptions(false);
                                }}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    )}
                    
                </div>

                <div className='flex justify-around h-auto'>

                    {!loginStatus && (
                        <div className='w-[3rem]'>
                            <NavLink to="/login" 
                            style={navLinkStyles}
                            >
                                <button 
                                className='mt-4 p-1 h-[2.3rem] text-sm flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg '
                                >
                                    Login
                                </button>
                            </NavLink>
                        </div>
                    )}
                    {!loginStatus && (
                        <div className='w-[3rem] '>
                            <NavLink to="/signup" 
                            style={navLinkStyles}
                            >
                                <button 
                                className=' mt-4 p-1 h-[2.3rem] text-sm flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg '
                                
                                >
                                    Signup
                                </button>
                            </NavLink>
                        </div>
                    )}
                    {/* {loginStatus && (
                        <div className='text-sm md:text-md pt-4 mr-5'> 
                            <LogoutBtn />
                        </div>
                    )} */}
                    {/* <div className={`${!loginStatus ? "mt-4" : 'pt-[1.1rem] mr-2'}`}>
                        <ThemeButton />
                    </div> */}
                </div>
            </div>
            
            {/* <form 
            className={`flex justify-center my-4 ${!(location.pathname === '/') ? '' : 'hidden' }`}
            onSubmit={e => e.preventDefault()}
            >

                <label 
                className="bg-white dark:bg-slate-300 rounded-l-3xl flex items-center pl-3 px-2 border border-black border-r-0"
                id="search"
                
                >
                    &#128269;
                </label>
                <br/>

                <input 
                htmlFor="search"
                className="w-[99%] md:w-[40%] h-[3rem] font-medium dark:bg-slate-300 px-2 outline-none rounded-r-3xl cursor-pointer border border-black border-l-0 placeholder-gray-500 dark:text-black" 
                type="text" 
                placeholder="Search for anything" 
                onChange={(e) => setSearchValue(e.currentTarget.value)}
                />
                <br/>

            </form> */}

        </header>
    )
}

export default Header
