import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerOwner } from "../services/api"; 
import "./Register.css";

// ✅ IMAGE IMPORT
import registerBg from "../assets/register-side.png"; 

// 👁️ SVG ICONS
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

// ✅ SUCCESS CHECK ICON
const CheckCircleIcon = () => (
  <svg width="60" height="60" fill="#2ecc71" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </svg>
);

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // ✅ NEW: State for Custom Success Modal
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        setIsLoading(false);
        return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        password: formData.password
      };

      await registerOwner(payload);
      
      // ✅ CHANGED: Show Custom Modal instead of Alert
      setShowSuccess(true); 

    } catch (err) {
      console.error("Register Error:", err);
      setError(err.response?.data?.message || "Registration failed. Email might be already in use.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Helper to close modal and go to login
  const handleProceedToLogin = () => {
    setShowSuccess(false);
    navigate("/login");
  };

  return (
    <div className="container-fluid register-container">
      
      {/* ✅ CUSTOM SUCCESS MODAL */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-card">
            <CheckCircleIcon />
            <h3>Registration Successful!</h3>
            <p>Welcome to the family. Please login to continue.</p>
            <button className="btn-success-login" onClick={handleProceedToLogin}>
              Go to Login
            </button>
          </div>
        </div>
      )}

      <div className="register-card">
        
        {/* LEFT SIDE: Image */}
        <div className="register-left">
          <img src={registerBg} alt="Register Background" className="register-bg-image" />
          <div className="register-text-overlay">
            <h2 className="fw-bold display-6 text-white">Join the Family</h2>
            <p className="lead text-light opacity-75">
              Create an account to start tracking your pet's health journey today.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="register-right">
          
          <div className="text-center mb-4">
            <img 
              src="/HappyPaws Logo.png" 
              alt="HappyPaws Logo" 
              style={{ height: "50px", objectFit: "contain", marginBottom: "10px" }} 
            />
            {/* ✅ UPDATED FONT CLASS */}
            <h3 className="register-title">Create Account</h3>
          </div>

          {error && (
            <div className="alert alert-danger text-center p-2 mb-3 small" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            
            {/* ✅ 2-COLUMN GRID */}
            <div className="form-grid">
              
              {/* ROW 1 */}
              <div>
                <label className="text-light small text-uppercase fw-bold mb-1 d-block">First Name</label>
                <input name="firstName" className="form-control" placeholder="John" onChange={handleChange} required />
              </div>
              <div>
                <label className="text-light small text-uppercase fw-bold mb-1 d-block">Last Name</label>
                <input name="lastName" className="form-control" placeholder="Doe" onChange={handleChange} required />
              </div>

              {/* ROW 2 */}
              <div>
                <label className="text-light small text-uppercase fw-bold mb-1 d-block">Phone</label>
                <input name="phone" className="form-control" placeholder="+91 98765..." onChange={handleChange} required />
              </div>
              <div>
                <label className="text-light small text-uppercase fw-bold mb-1 d-block">Email Address</label>
                <input name="email" type="email" className="form-control" placeholder="name@example.com" onChange={handleChange} required />
              </div>

              {/* ROW 3 */}
              <div>
                <label className="text-light small text-uppercase fw-bold mb-1 d-block">Address</label>
                <input name="address" className="form-control" placeholder="Street, Area..." onChange={handleChange} required />
              </div>
              <div>
                <label className="text-light small text-uppercase fw-bold mb-1 d-block">City</label>
                <input name="city" className="form-control" placeholder="Mumbai" onChange={handleChange} required />
              </div>

              {/* ROW 4 */}
              <div>
                <label className="text-light small text-uppercase fw-bold mb-1 d-block">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-light small text-uppercase fw-bold mb-1 d-block">Confirm Password</label>
                <div className="position-relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm"
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold shadow-lg text-uppercase register-btn" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-3 text-light opacity-75 small">
            Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;