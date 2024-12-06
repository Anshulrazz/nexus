import React, { useEffect, useState } from "react";
import Auth from "./components/auth";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./Actions/User";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import UserProfile from "./pages/Userprofile";
import Project from "./pages/Project";
import Details from "./pages/Details";
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from "./pages/notFound";
import UploadProject from "./pages/Upload";
import Nav from "./components/Nav";
import Stats from "./pages/Stats";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import LegalDocuments from "./pages/docs";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import SaveFace from "./components/SaveFace";
import FaceLogin from "./components/FaceLogin";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(loadUser()).finally(() => setLoading(false));
  }, [dispatch]);


  const { isAuthenticated, user } = useSelector((state) => state.user);
  const admin = user?.isAdmin;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {admin === true ? <Nav /> : <Navbar />}
      <Routes>
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/:type" element={isAuthenticated ? <Dashboard /> : <Auth />} />
        <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Auth />} />
        <Route path="/user/profile/:id" element={isAuthenticated ? <Profile /> : <Auth />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/details/project/:id" element={<Details />} />
        <Route path="/upload" element={isAuthenticated ? <UploadProject /> : <Auth />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/admin" element={admin === true ? <Nav /> : <Auth />} />
        <Route path="/admin/stats" element={admin === true ? <Stats /> : <Auth />} />
        <Route path="/admin/users" element={admin === true ? <Users /> : <Auth />} />
        <Route path="/admin/projects" element={admin === true ? <Projects /> : <Auth />} />
        <Route path="/privacy" element={<LegalDocuments />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/save-face" element={<SaveFace />} />
        <Route path="/auth/face-login" element={<FaceLogin />} />

      </Routes>
      {admin === true ? '' : <Footer />}
    </>
  );
}

export default App;