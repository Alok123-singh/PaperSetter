import React, { useState } from 'react'
import { Loading } from '../../../components/index'


function Contact() {

    const [loading, setLoading] = useState(false);


    return loading ? (
        <Loading />
    ) : 
    (
        <div className="contact-us-container dark:bg-gray-400 p-8">
            <section className="contact-us-images text-center">
                <img
                src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Office"
                className="w-full h-auto mb-4 rounded-md shadow-lg"
                />
            </section>

            <section className="contact-us-header text-center mb-8">
                <h1 className="text-3xl font-bold">Get In Touch</h1>
                <p className="text-gray-600">We would love to hear from you!</p>
            </section>
        
            <section className="contact-form mb-8 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4 w-full">Contact Form</h2>
                <form className='w-full flex flex-col justify-center items-center'>
                    <div className="w-full mb-4">
                        <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">Your Name</label>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="John Doe"
                        required
                        />
                    </div>
            
                    <div className="w-full mb-4">
                        <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">Your Email</label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border-2 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="john.doe@example.com"
                        required
                        />
                    </div>
            
                    <div className="w-full mb-4">
                        <label htmlFor="message" className="block text-gray-800 font-semibold mb-2">Your Message</label>
                        <textarea
                        id="message"
                        name="message"
                        rows="4"
                        className="w-full px-3 py-2 border-2 rounded-md resize-none focus:outline-none focus:border-blue-500"
                        placeholder="Type your message here..."
                        required
                        ></textarea>
                    </div>
            
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        
            <section className="company-info mb-8 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Our Contact Information</h2>
                <p className="text-gray-800 mb-2">
                <span className="font-semibold">Address:</span> 123 Main St, Cityville, Country
                </p>
                <p className="text-gray-800 mb-2">
                <span className="font-semibold">Email:</span> info@example.com
                </p>
                <p className="text-gray-800 mb-2">
                <span className="font-semibold">Phone:</span> +1 (123) 456-7890
                </p>
            </section>
        
            
        </div>
      );
}

export default Contact
