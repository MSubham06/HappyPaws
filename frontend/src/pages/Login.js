import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api"; 
import "./Login.css"; 
import loginBg from "../assets/login-side.png"; 

// 👁️ SVG ICONS FOR PASSWORD TOGGLE
const EyeIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
  </svg>
);

const EyeSlashIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
  </svg>
);

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // 👁️ STATE FOR PASSWORD VISIBILITY
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    setError(null);

    try {
      const data = await loginUser(formData.email, formData.password);
      
      // ✅ 1. SAVE TO LOCAL STORAGE (Crucial for Navbar)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      
      console.log("Login Success! Role:", data.role);

      // ✅ 2. REDIRECT BASED ON ROLE (Handling both "ROLE_OWNER" and "OWNER")
      if (data.role === "ROLE_ADMIN" || data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (data.role === "ROLE_OWNER" || data.role === "OWNER") {
        navigate("/owner-dashboard");
      } else if (data.role === "ROLE_VET" || data.role === "VET") {
        navigate("/vet-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container-fluid login-container">
      {/* 🌟 Added 'page-transition' class for smooth fade-in */}
      <div className="login-card page-transition">
        
        {/* LEFT SIDE: Image */}
        <div className="login-left">
          <img src={loginBg} alt="Login Background" className="login-bg-image" />
          <div className="login-text-overlay">
            <h2 className="fw-bold display-6 text-white">Welcome Back!</h2>
            <p className="lead text-light opacity-75">
              Manage your pet's health with the best veterinary care platform.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="login-right">
          
          <div className="login-logo-area text-center mb-4">
            <img 
              src="/HappyPaws Logo.png" 
              alt="HappyPaws Logo" 
              style={{ height: "70px", objectFit: "contain", marginBottom: "15px" }} 
            />
            <p className="text-light opacity-75 small">Enter your credentials to access your account</p>
          </div>

          {error && (
            <div className="alert alert-danger text-center p-2 mb-3 small" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-light small text-uppercase fw-bold d-block mb-2" style={{letterSpacing: "1px", opacity: 0.8}}>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-light small text-uppercase fw-bold d-block mb-2" style={{letterSpacing: "1px", opacity: 0.8}}>Password</label>
              
              {/* 🔒 PASSWORD WRAPPER WITH EYE ICON */}
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"} // Toggles type
                  name="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button 
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100 py-3 fw-bold shadow-lg text-uppercase login-btn"
              style={{letterSpacing: "1px"}}
              disabled={isLoading}
            >
              {isLoading ? (
                <span><span className="spinner-border spinner-border-sm me-2"></span>Logging in...</span>
              ) : (
                "Login to Dashboard"
              )}
            </button>
          </form>

          <p className="text-center mt-4 text-light opacity-75 small">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary text-decoration-none fw-bold">
              Register Now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;