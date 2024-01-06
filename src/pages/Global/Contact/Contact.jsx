import React, { useState } from 'react'
import { Loading1, Form } from '../../../components/index'


function Contact() {

    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        // console.log("Form Submitted");


    }

    const contactFormData = {
        inputs : [
            // Define your form inputs here
            { label: 'Name', type: 'text', placeholder: 'Your name', name: 'name', required: true,  },
            { label: 'Email', type: 'text', placeholder: 'Your email', name: 'email', required: true,  },
            { label: 'Phone Number', type: 'text', placeholder: 'Your phone number', name: 'phoneNumber', required: true,  },
            { label: 'Message', type: 'textarea', placeholder: 'Your message', name: 'message', required: true, defaultValue: 'Send message to us' },
            // { label: 'Start Time', type: 'dateAndTime2', placeholder: 'Start Time', name: 'startTime', required: true, defaultValue: new Date('2024-01-26'), enableTime : false, dateFormat : 'Y-m-d', },
            // { label: 'End Time', type: 'dateAndTime3', placeholder: 'End Time', name: 'endTime', required: true, defaultValue: new Date('2024-01-26'), enableTime : false, dateFormat : 'MMMM d, yyyy', },
            // Add more input configurations as needed
        ],
        buttons : [
            // Define your form buttons here
            // { type: 'text', text: 'Prev', style: 'w-full' },
            { type: 'submit', text: 'Submit', style: '' },
            // Add more button configurations as needed
        ],
        title : 'Contact Form',
        desc : "Enter you details and concerns if any and feel free to contact us",
        formHeight : "",
        formWidth : "lg:w-full", // total width of the form
        formDesign : {
            start: 'justify-start', // define whether the form should appear in the start 
            cols: 2, // define how many fields should be in 1 row
        }
    }

    const form = (formData,onSubmit) => { 

        // console.log("Clicked from", parentData);

        return <Form
                    onSubmit={onSubmit}
                    formData={formData}
                />
    };


    return loading ? (
        <Loading1 />
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
                {/* <h2 className="text-2xl font-bold mb-4 w-full flex justify-center ">Contact Form</h2> */}

                {form(contactFormData,onSubmit)}
                
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
