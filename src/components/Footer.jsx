import React from 'react';
import { Link } from 'react-router-dom';
import { BookMarked, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookMarked className="h-8 w-8 text-indigo-600" />
              <span className="font-bold text-xl text-gray-900">NexusHub</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Your central hub for projects, documents, and research papers.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/projects" className="text-gray-600 hover:text-indigo-600 text-sm">Projects</Link></li>
              <li><Link to="/documents" className="text-gray-600 hover:text-indigo-600 text-sm">Documents</Link></li>
              <li><Link to="/upload" className="text-gray-600 hover:text-indigo-600 text-sm">Upload</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-indigo-600 text-sm">Privacy Policy</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-indigo-600 text-sm">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 text-sm mt-4 block">Contact Us</Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} NexusHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}