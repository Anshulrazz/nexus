import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative bg-gray-900 p-12 rounded-lg shadow-2xl border-4 border-gradient-to-r from-green-400 to-blue-500 transform hover:scale-105 transition-all duration-500 ease-in-out">
        <h2 className="text-4xl font-bold text-white text-opacity-90 hover:text-blue-300 transition-all duration-300 ease-in-out text-center">
          Contact Information
        </h2>
        <p className="mt-4 text-lg text-gray-300 text-opacity-80 text-center">
          Feel free to reach out to us using the contact information below. We’re happy to assist you.
          Here You can request to anything you want.
        </p>

        <div className="mt-8 text-center space-y-6">
          <div className="text-white text-xl">
            <p className="font-semibold">Email:</p>
            <p>support@example.com</p>
          </div>
          <div className="text-white text-xl">
            <p className="font-semibold">Phone:</p>
            <p>(+123) 456-7890</p>
          </div>
          <div className="text-white text-xl">
            <p className="font-semibold">Address:</p>
            <p>1234 Future St, Tech City, TX 78901</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 text-center w-full">
        <div className="text-gray-500 text-xl font-bold animate-pulse">
          Get in touch with us anytime!
        </div>
      </div>
    </div>
  );
};

export default Contact;
