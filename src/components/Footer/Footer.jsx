import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import '../../index.css'
import { Logo } from '../index.js'

function Footer() {
    return (
        <footer className="dark:bg-slate-700 dark:text-white overflow-hidden  border-t-2 dark:border-t-yellow-600 border-t-fuchsia-700">
            <div className="flex justify-around items-center my-8 md:my-4 px-4">
                <div className=" flex justify-center md:justify-evenly flex-wrap">
                    <div className="py-4 md:w-1/2 lg:w-3/12">
                        <div className="flex h-[7rem] md:mt-10 items-center flex-col ">
                            <Link className=" inline-flex  items-center">
                                <Logo width="100px" />
                            </Link>
                            <div className='mt-2'>
                                <p className="text-center text-sm text-gray-900 dark:text-slate-400">
                                    &copy; Copyright 2024. All Rights Reserved by [Company Name].
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full py-4 md:w-1/2 lg:w-3/12">
                        <div className="h-full flex flex-col items-center">
                            <h3 className="flex justify-center items-center tracking-px mb-7 font-semibold uppercase  md:mt-0 dark:text-gray-400 text-gray-900 cursor-default">
                                Company
                            </h3>
                            <ul className='flex flex-col justify-center items-center'>
                                <li className="mb-4">
                                    <Link
                                        className=" text-center text-md font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/"
                                    >
                                        Features
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/about"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full py-4 md:w-1/2 lg:w-3/12">
                        <div className="h-full flex flex-col items-center">
                            <h3 className="flex justify-center items-center tracking-px mb-7 font-semibold uppercase mt-7 md:mt-0 text-gray-900 dark:text-gray-400 cursor-default">
                                Support
                            </h3>
                            <ul className='flex flex-col justify-center items-center'>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        // to="/my-account"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/contact"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:py-4 md:w-1/2 lg:w-3/12">
                        <div className="h-full flex flex-col items-center">
                            <h3 className="flex justify-center items-center tracking-px mb-7 font-semibold uppercase mt-7 md:mt-0 text-gray-900 dark:text-gray-400 cursor-default">
                                Legals
                            </h3>
                            <ul className='flex flex-col justify-center items-center'>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-500 cursor-pointer"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
