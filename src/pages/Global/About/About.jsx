import React, { useState } from 'react'
import { Loading } from '../../../components/index'

function About() {

    const [loading, setLoading] = useState(false);


    return loading ? (
        <Loading />
    ) : 
    (
    <div className="about-us-container dark:bg-gray-400 p-8">
        <section className="about-us-header text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome to Our Story</h1>
            <p className="text-gray-600">Discover the passion behind our work</p>
        </section>

        <section className="our-mission mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-800">
            At SIMLERN, our mission is to [insert mission statement here].
            We are committed to [describe your commitment or goals].
            </p>
        </section>

        <section className="meet-the-team mb-8">
            <h2 className="text-2xl font-bold mb-4">Meet the Team</h2>
            <div className="flex flex-wrap justify-around">
                <div className="team-member flex flex-col items-center sm:mr-4 mb-4">
                    <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Team Member 1"
                    className="w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[25rem] object-cover rounded-full"
                    />
                    <h3 className="text-lg font-semibold mt-2">John Doe</h3>
                    <p className="text-gray-600">Co-Founder & CEO</p>
                </div>

                <div className="team-member flex flex-col items-center sm:mr-4 mb-4">
                    <img
                    src="https://images.unsplash.com/photo-1602306834394-6c8b7ea0ed9d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Team Member 2"
                    className="w-[15rem] h-[15rem] sm:w-[25rem] sm:h-[25rem] object-cover rounded-full"
                    />
                    <h3 className="text-lg font-semibold mt-2">Jane Smith</h3>
                    <p className="text-gray-600">Co-Founder & CTO</p>
                </div>

                {/* Add more team members as needed */}
            </div>
        </section>

        <section className="our-values mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
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
