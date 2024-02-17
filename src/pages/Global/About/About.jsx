import React, { useState } from 'react'
import { Loading1 } from '../../../components/index'

function About() {

    const [loading, setLoading] = useState(false);


    return loading ? (
        <Loading1 />
    ) : 
    (
    <div className="about-us-container dark:bg-gray-400 p-8">
        <section className="about-us-header mb-6">
            <h1 className="text-3xl font-bold text-center">About Simlearn.in</h1>
            <p className="text-gray-600 mt-4">Welcome to Simlearn.in, your partner in pioneering, interactive education for the future leaders of the hospitality industry. At Simlearn.in, we specialize in creating dynamic simulations and eLearning courses that cater to the distinct needs of hotel management colleges, enhancing the learning experience for students across various core departments.</p>
        </section>

        <section className="our-mission mb-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Unique Approach</h2>
            <div className='flex flex-col md:flex-row justify-center items-center space-x-3'>
                <p className="text-gray-800 bg-orange-300 hover:bg-orange-400 p-2 rounded-md text-center">
                    {/* <span className='text-lg font-bold mr-2'>{"1)"}</span> */}
                    Specialized Simulations:
                    At Simlearn.in, we understand that each department within hotel management requires targeted training. Our innovative simulations cater to specific core departments, such as 'Front Office, 'Housekeeping', 'Food and Beverage Service' and 'Food Production,' providing hands-on experiences.
                </p>
                <p className="text-gray-800 bg-blue-300 hover:bg-blue-400 p-2 rounded-md text-center">
                    {/* <span className='text-lg font-bold mr-2'>{"2)"}</span> */}
                    Curriculum Alignment:
                    Simlearn.in is dedicated to aligning our simulations with the diverse curricula of hotel management colleges. Our goal is to seamlessly integrate our simulations into the academic framework, ensuring students receive practical, industry-relevant knowledge that complements their coursework.
                </p>
                <p className="text-gray-800 bg-green-300 hover:bg-green-400 p-2 rounded-md text-center">
                    {/* <span className='text-lg font-bold mr-2'>{"3)"}</span> */}
                    Comprehensive E-Learning Courses:
                    In addition to our specialized simulations, Simlearn.in offers a range of eLearning courses covering various topics pertinent to hotel management. From fundamental principles to advanced strategies, our courses are designed to provide a comprehensive and engaging learning experience.
                </p>
            </div>
        </section>

        <section className="our-mission mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Simlearn.in ?</h2>
            <div className='flex flex-col justify-center items-center space-y-3'>
                <p className="text-gray-800">
                    <span className='text-lg font-bold mr-2'>{"1)"}</span>
                    Real-world Skill Development:
                    Our simulations go beyond theoretical learning, allowing students to immerse themselves in real-world scenarios. Whether it's mastering the art of seating guests or understanding the intricacies of menu engineering, Simlearn.in fosters practical skill development.
                </p>
                <p className="text-gray-800">
                    <span className='text-lg font-bold mr-2'>{"2)"}</span>
                    Customized for Core Departments:
                    Simlearn.in recognizes the diverse nature of hotel management. Each simulation is meticulously designed to address the unique challenges and requirements of specific core departments, ensuring a targeted and effective learning experience.

                </p>
                <p className="text-gray-800">
                    <span className='text-lg font-bold mr-2'>{"3)"}</span>
                    Industry-Experienced Instructors:
                    Benefit from the guidance of our industry-experienced instructors who bring a wealth of knowledge to the virtual classroom. Our commitment to excellence ensures that students receive the highest quality education in hotel management.
                </p>
            </div>
        </section>

        <section className="about-us-header mb-8">
            <h1 className="text-3xl font-bold">Our Mission</h1>
            <div className='mt-3'>
                <p>
                    Simlearn.in is on a mission to revolutionize the way hotel management is taught and learned. We strive to equip students with practical skills, preparing them to excel in their respective fields and become leaders in the ever-evolving hospitality industry.
                </p>
            </div>
            <div className='mt-3'>
                <p>
                    Join Simlearn.in on this transformative educational journey, where simulations meet curriculum precision, shaping the future of hotel management education.
                </p>
            </div>
            <div className='mt-3'>
                <p>
                    Simlearn.in - Crafting Tomorrow's Hospitality Leaders, One Simulation at a Time.
                </p>
            </div>
        </section>

        <section className="our-values mb-8">
            <h2 className="text-3xl font-bold mb-3">Our Values</h2>
            <ul className="list-disc pl-6">
            <li className="text-gray-800">Passion for Innovation</li>
            <li className="text-gray-800">Customer-Centric Approach</li>
            <li className="text-gray-800">Team Collaboration</li>
            <li className="text-gray-800">Sustainability</li>
            {/* Add more values as needed */}
            </ul>
        </section>

        <section className="about-us-footer text-center">
            <p className="text-gray-800">
            Thank you for being a part of our journey. If you have any questions or
            would like to connect, feel free to <a href="/contact" className="text-blue-500">contact us</a>.
            </p>
        </section>
    </div>
  );
};

export default About
