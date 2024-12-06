import React from 'react';
import './team.css';
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import ansh from '../assets/ansh.jpg';
import dhruv from '../assets/dhruv.jpg';
import ritik from '../assets/ritik.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
const Team = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        });
    }, []);
    return (
        <>
            <div className="container mx-auto  px-12">
                <h2 className="text-3xl font-bold text-center mb-4" data-aos="fade-up">Meet the crew</h2>
                <p className="text-xl text-center mb-6" data-aos="fade-up">Creative people</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="text-center" data-aos="fade-up">
                        <img src={ansh} alt="Anshul Kumar" className="w-24 h-24 rounded-full mx-auto mb-4" />
                        <h5 className="font-semibold py-2">Anshul Kumar</h5>
                        <p className="text-sm font-medium">FOUNDER / BACKEND</p>
                        <div className="flex justify-center space-x-3 mt-2">
                            <a href="#" className="text-xl"><FaLinkedin /></a>
                            <a href="#" className="text-xl"><FaGithub /></a>
                            <a href="#" className="text-xl"><FaInstagram /></a>
                            <a href="#" className="text-xl"><FaTwitter /></a>
                        </div>
                    </div>

                    <div className="text-center" data-aos="fade-up">
                        <img src={dhruv} alt="Dhruv Goswami" className="w-24 h-24 rounded-full mx-auto mb-4" />
                        <h5 className="font-semibold py-2">Dhruv Goswami</h5>
                        <p className="text-sm font-medium">CO-FOUNDER / UI-UX</p>
                        <div className="flex justify-center space-x-3 mt-2">
                            <a href="#" className="text-xl"><FaLinkedin /></a>
                            <a href="#" className="text-xl"><FaGithub /></a>
                            <a href="#" className="text-xl"><FaInstagram /></a>
                            <a href="#" className="text-xl"><FaTwitter /></a>
                        </div>
                    </div>

                    <div className="text-center" data-aos="fade-up">
                        <img src={dhruv} alt="Ritik Kumar" className="w-24 h-24 rounded-full mx-auto mb-4" />
                        <h5 className="font-semibold py-2">Ritik Kumar</h5>
                        <p className="text-sm font-medium">PRESIDENT / BAD BOY</p>
                        <div className="flex justify-center space-x-3 mt-2">
                            <a href="#" className="text-xl"><FaLinkedin /></a>
                            <a href="#" className="text-xl"><FaGithub /></a>
                            <a href="#" className="text-xl"><FaInstagram /></a>
                            <a href="#" className="text-xl"><FaTwitter /></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Team;
