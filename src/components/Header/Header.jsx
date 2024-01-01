import React,{ useRef, useState, useEffect } from 'react'
import {Link, NavLink} from 'react-router-dom'
import { Logo, Container } from '../index.js'
import { useDispatch, useSelector } from 'react-redux';
import { setLoginStatus } from '../../store/authSlice'
import { ROLES } from '../../roles/index.js';


function Header() {

    const dispatch = useDispatch();
    const [showAccountOptions,setShowAccountOptions] = useState(false);
    const [show,setShow] = useState(false);
    const loginStatus = useSelector(state => state.auth.loginStatus);
    const role = useSelector(state => state.auth.role);
    const accountRef = useRef(null);
    
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

    const handleAccountClick = () => {
        setShowAccountOptions(true);
    };
    
    const handleOutsideClick = (event) => {
        if (accountRef.current && !accountRef.current.contains(event.target)) {
            setShowAccountOptions(false);
        }
    };

    const handleMouseLeave = () => {
        setShowAccountOptions(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <header className='w-full py-1  dark:bg-slate-700 dark:text-white shadow-md dark:shadow-2xl dark:shadow-zinc-400'>
            <Container>
                <nav className='w-full relative flex justify-between md:justify-between flex-wrap'>

                    {/* for large devices */}
                    <div className='w-full hidden sm:flex'>
                        <div className='w-1/3'>
                            <Link to='/' >
                                <Logo width='70px'   />
                            </Link>
                        </div>

                        <div className={`w-1/3 flex justify-center items-center`}>

                            <div className='flex justify-center items-center text-xl cursor-default font-sans font-bold text-green-600'>
                                SIMLEARN
                            </div>
                            
                        </div>

                        <div className='w-1/3 hidden sm:flex text-sm justify-end h-auto'>

                            <div 
                            onMouseEnter={handleAccountClick}
                            onMouseLeave={handleMouseLeave}
                            ref={accountRef}
                            >
                                {loginStatus && (

                                    <div className='w-[80px] flex justify-end'>
                                        <div
                                        className='mt-[2px] p-1 h-[2.8rem] w-[2.8rem] cursor-default text-lg flex justify-center items-center text-center duration-200 bg-slate-300 hover:bg-slate-400 dark:hover:bg-slate-600 rounded-full'
                                        // onClick={() => setShowAccountOptions(prev => !prev)}
                                        
                                        >
                                            AB
                                        </div>
                                    </div>

                                )}

                                {showAccountOptions && (
                                    <div className='absolute right-[-1rem] mt-[0.1rem] w-1/6 bg-white dark:bg-slate-700 border dark:border-gray-400 rounded-md shadow-md z-10'>
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
                                        to={"/theme"}
                                        >
                                            <div 
                                            className='p-2' 
                                            onClick={() => {
                                                setShowAccountOptions(false);
                                            }}>
                                                Theme
                                            </div>
                                        </Link>
                                        
                                        { role === ROLES.PARTICIPANT &&
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
                                        }
                                        

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

                            {!loginStatus && (
                                <div className='w-[3rem] flex justify-center items-center'> 
                                    <NavLink to="/login" 
                                    style={navLinkStyles}
                                    >
                                        <button 
                                        className='  p-1  h-[2.3rem] flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600  rounded-lg '
                                        
                                        >
                                            Login
                                        </button>
                                    </NavLink>
                                </div>
                            )}
                            {!loginStatus && (
                                <div className='w-[3rem] flex justify-center items-center sm:ml-8 sm:mr-4'>
                                    <NavLink to="/signup" 
                                    style={navLinkStyles}
                                    >
                                        <button 
                                        className='p-1 h-[2.3rem] flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600  rounded-lg '
                                        
                                        >
                                            Signup
                                        </button>
                                    </NavLink>
                                </div>
                            )}
                            
                        </div>
                    </div>
                    

                    {/* for small devices */}
                    <div className='w-full flex sm:hidden'>
                        <div className='w-full flex flex-col justify-center items-center'>
                            <div className='w-full flex justify-between items-center'>
                                <Link to='/' >
                                    <Logo width='70px'   />
                                </Link>

                                <div className='flex justify-center items-center text-xl cursor-default font-sans font-bold text-green-600'>
                                        SIMLEARN
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
                            </div>

                            <div className={`${show ? 'flex' : 'hidden'} w-full sm:hidden flex justify-center items-center`}>

                                {!loginStatus && 
                                <div className='w-full flex justify-around items-center py-1'>
                                    {!loginStatus && (
                                        <div className='w-[3rem] flex justify-center items-center'>
                                            <NavLink to="/login" 
                                            style={navLinkStyles}
                                            >
                                                <button 
                                                className=' pt-1 text-sm flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg '
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
                                                className='pt-1 text-sm flex justify-center items-center text-center duration-200 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg '
                                                
                                                >
                                                    Signup
                                                </button>
                                            </NavLink>
                                        </div>
                                    )}
                                </div>}
                                
                                {loginStatus && 
                                <div className='w-full flex justify-end items-center py-1'>

                                    <div onMouseEnter={handleAccountClick} 
                                    onMouseLeave={handleMouseLeave}
                                    ref={accountRef}
                                    >
                                    
                                        {loginStatus && (
                                            <div
                                            className='AccountClass text-sm w-[3rem] h-[3rem] cursor-default flex justify-center items-center text-center duration-200 bg-slate-300 hover:bg-slate-400 dark:hover:bg-slate-500 rounded-full z-50'
                                            
                                            >
                                                AB
                                            </div>
                                        )}

                                        {showAccountOptions && (
                                            <div className='absolute text-sm right-[-1rem] mt-[0.4rem] w-1/2 md:w-1/6 bg-white dark:bg-slate-700 border dark:border-gray-400 rounded-md shadow-md z-10'>
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
                                                to={"/theme"}
                                                >
                                                    <div 
                                                    className='p-2' 
                                                    onClick={() => {
                                                        setShowAccountOptions(false);
                                                    }}>
                                                        Theme
                                                    </div>
                                                </Link>

                                                { role === ROLES.PARTICIPANT &&
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
                                                }

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
                                </div>}

                            </div>

                        </div>

                    </div>

                </nav>
            </Container>

        </header>
    )
}

export default Header
