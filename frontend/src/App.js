import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot"; 
import Loader from "./components/Loader"; 

// Services
import { getOwnerProfile } from "./services/api"; 

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import OwnerDashboard from "./pages/OwnerDashboard"; 
import AdminDashboard from "./pages/AdminDashboard";
import VetDashboard from "./pages/VetDashboard"; // ✅ NEW IMPORT
import MyPets from "./pages/MyPets"; 
import OwnerProfile from "./pages/OwnerProfile";
import PetDetails from "./pages/PetDetails"; 
import BookAppointment from "./pages/BookAppointment"; 
import "./App.css"; // Ensure CSS is imported

// ✅ Helper component to handle route-based logic
const AppContent = ({ appLoading }) => {
  const location = useLocation();
  
  // Define pages where CHATBOT should NOT appear
  // ✅ Added vet-dashboard to list so it doesn't block UI
  const hideChatbotOn = ["/admin-dashboard", "/vet-dashboard", "/login", "/register"];
  const showChatbot = !hideChatbotOn.includes(location.pathname);

  return (
    <div className="app-wrapper"> 
      {/* 1. NAVBAR (Always Visible) */}
      <Navbar />
      
      {/* 2. MAIN CONTENT AREA */}
      {appLoading ? (
        <Loader type="content" />
      ) : (
        <div className="main-content">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Owner Routes */}
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/my-pets" element={<MyPets />} /> 
            <Route path="/pet-details/:id" element={<PetDetails />} /> 
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/owner-profile" element={<OwnerProfile />} /> 

            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Vet Routes */}
            <Route path="/vet-dashboard" element={<VetDashboard />} /> 
            </Routes>
        </div>
      )}

      {/* 3. CHATBOT */}
      {showChatbot && <Chatbot />}
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
           await getOwnerProfile().catch(() => {}); 
        }
      } catch (error) {
         console.log("App init check completed");
      } finally {
         setLoading(false);
      }
    };
    initApp();
  }, []);

  return (
    <Router>
      <AppContent appLoading={loading} />
    </Router>
  );
}

export default App;