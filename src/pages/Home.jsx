import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Upload, BookOpen, Folder } from 'lucide-react';
import Team from '../components/Team';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import CountUp from 'react-countup';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-row bg-blue-50  shadow-lg" >
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 ">
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight text-left" style={{fontFamily: ' cursive'}} data-aos="fade-up">
              "Empowering Minds, Sharing Innovations, Transforming Knowledge into Impact!"
            </h1>
            <p className="text-2xl md:text-3xl mb-12 text-left" data-aos="fade-up">
              Organize, share, and discover academic projects and research papers with ease
            </p>
            <div className="flex flex-col sm:flex-row  gap-6">
              <Link
                to="/projects" data-aos="fade-up"
                className="inline-flex items-center px-8 py-4 border border-transparent text-xl font-medium rounded-full text-indigo-700 bg-white shadow-lg hover:bg-indigo-100 transition duration-300 transform hover:scale-105"
              >
                Browse Projects
                <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 transform hover:translate-x-1" />
              </Link>
              <Link
                to="/upload" data-aos="fade-up"
                className="inline-flex items-center px-8 py-4 border border-transparent text-xl font-medium rounded-full text-white bg-indigo-600 shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
              >
                Upload Your Work
                <Upload className="ml-3 h-5 w-5 transition-transform duration-300 transform hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 px-2 py-4" data-aos="fade-up">
          <img src="https://fps.cdnpk.net/images/ai/image-generator/cover/tti-background.webp" alt="" className="w-full h-full object-cover rounded-lg" />
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300" data-aos="fade-up">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <Search className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Easy Discovery</h3>
              <p className="text-lg text-gray-500">
                Find relevant projects and papers quickly with powerful search tools
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300" data-aos="fade-up" data-aos-delay="100">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <Upload className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Simple Sharing</h3>
              <p className="text-lg text-gray-500">
                Easily upload and share your work with the academic community
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300" data-aos="fade-up" data-aos-delay="200">
              <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Organized Access</h3>
              <p className="text-lg text-gray-500">
                Keep all your research materials organized in one central space
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Join Our Network Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" data-aos="fade-up">
              Join Our Growing Network
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="bg-gray-50 rounded-lg p-8" data-aos="fade-up">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  <CountUp end={5000} duration={2.5} />+
                </div>
                <p className="text-xl text-gray-600">Total Users</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8" data-aos="fade-up" data-aos-delay="100">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  <CountUp end={10000} duration={2.5} />+
                </div>
                <p className="text-xl text-gray-600">Total Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="py-6 bg-gray-50">
        <Team />
      </section> */}
    </div>
  );
}