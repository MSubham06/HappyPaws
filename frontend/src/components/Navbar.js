import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/api";
import "./Navbar.css"; 

// 👤 Profile Icon SVG
const ProfileIcon = () => (
  <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person-circle">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark premium-navbar">
      <div className="container-fluid px-2">
        
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img 
            src="/HappyPaws Logo.png" 
            alt="HappyPaws Logo" 
            className="navbar-logo-img"
          />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-3"> 
            
            {/* 1. HOME */}
            <li className="nav-item">
              <Link className="nav-link custom-nav-link" to="/">Home</Link>
            </li>

            {/* 🟢 OWNER LINKS */}
            {isAuthenticated && (userRole === "ROLE_OWNER" || userRole === "OWNER") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/owner-dashboard">Dashboard</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link highlight-link" to="/my-pets">My Pets</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link custom-nav-link d-flex align-items-center" to="/owner-profile" title="Profile">
                    <ProfileIcon />
                  </Link>
                </li>
              </>
            )}

            {/* 🔵 VET LINKS (New) */}
            {isAuthenticated && (userRole === "ROLE_VET" || userRole === "VET") && (
                <li className="nav-item">
                  <Link className="nav-link custom-nav-link" to="/vet-dashboard">Vet Panel</Link>
                </li>
            )}

            {/* 🔴 ADMIN LINKS */}
            {isAuthenticated && (userRole === "ROLE_ADMIN" || userRole === "ADMIN") && (
               <li className="nav-item">
                 <Link className="nav-link custom-nav-link" to="/admin-dashboard">Admin Panel</Link>
               </li>
            )}

            {/* 5. LOGOUT BUTTON */}
            {isAuthenticated ? (
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-light px-4 py-2 fw-bold rounded-pill">
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-primary px-4 py-2 fw-bold shadow-sm rounded-pill" to="/login">
                  Login
                </Link>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;