import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

// 🎨 SVG ICONS
const Icon = ({ name }) => {
  const icons = {
    paw: <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M7.5 1.5a1.5 1.5 0 0 1 1.5 1.5c0 .32-.1.62-.27.86l-.16.21-.47.53a.5.5 0 0 1-.76 0l-.47-.53-.16-.21a1.5 1.5 0 0 1 1.29-2.36Zm-3 1a1.5 1.5 0 0 1 1.5 1.5c0 .32-.1.62-.27.86l-.16.21-.47.53a.5.5 0 0 1-.76 0l-.47-.53-.16-.21a1.5 1.5 0 0 1 1.29-2.36Zm9 0a1.5 1.5 0 0 1 1.5 1.5c0 .32-.1.62-.27.86l-.16.21-.47.53a.5.5 0 0 1-.76 0l-.47-.53-.16-.21a1.5 1.5 0 0 1 1.29-2.36Zm-3.5 5.5a2.5 2.5 0 0 1 5 0v.5a2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1-2.5-2.5v-.5Zm-6 0a2.5 2.5 0 0 1 5 0v.5a2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 0 1-2.5-2.5v-.5Zm4.5 3a2.5 2.5 0 0 1 2.5 2.5v.5a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-.5a2.5 2.5 0 0 1 2.5-2.5Z"/></svg>,
    arrowRight: <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>,
    health: <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>,
    chart: <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/></svg>,
    shield: <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/></svg>,
    chat: <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16"><path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894z"/></svg>
  };
  return icons[name] || null;
};

// 🔢 SCROLL-TRIGGERED ANIMATED COUNTER
const AnimatedCounter = ({ end, duration = 2000, suffix = "", formatK = false }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 } 
    );

    // ✅ FIX: Capture the current ref value to a variable
    const currentElement = countRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      // ✅ FIX: Use the captured variable in cleanup
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  const displayCount = formatK && count >= 1000 
    ? (count / 1000).toFixed(0) + 'k' 
    : count;

  return <span ref={countRef}>{displayCount}{suffix}</span>;
};

const Home = () => {
  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="section hero-section">
        <div className="row align-items-center w-100">
          
          {/* LEFT: TEXT */}
          <div className="col-lg-6 text-start">
            <div className="hero-badge">
              <Icon name="paw" /> The Future of Pet Care
            </div>
            
            <h1 className="hero-title">
              <span className="fw-bold d-block text-white opacity-75">Smart Care for</span>
              <span className="gradient-text">Happy Paws</span>
            </h1>

            <p className="hero-subtitle">
              Bridging the gap between pet owners and doctors. Track health, schedule visits, and manage records effortlessly.
            </p>
            
            <div className="hero-buttons">
              <Link to="/login" className="btn btn-primary btn-lg px-5 py-3 shadow-lg rounded-pill fw-bold d-flex align-items-center gap-2">
                Get Started <Icon name="arrowRight" />
              </Link>
              <button className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold" onClick={scrollToFeatures}>
                Learn More
              </button>
            </div>
          </div>

          {/* RIGHT: IMAGE */}
          <div className="col-lg-6 text-center mt-5 mt-lg-0">
             <div className="hero-img-container">
                 <img 
                   src="/hero-image.png" 
                   alt="Veterinary Scene" 
                   className="hero-img" 
                 />
             </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS BAR ==================== */}
      <section className="stats-section">
        <div className="stats-box">
          
          {/* 50+ (Animated) */}
          <div className="stat-item">
            <h2 className="stat-number">
              <AnimatedCounter end={50} suffix="+" />
            </h2>
            <small className="stat-label">Expert Vets</small>
          </div>
          
          {/* 1k+ (Animated) */}
          <div className="stat-item">
            <h2 className="stat-number">
              <AnimatedCounter end={1000} suffix="+" formatK={true} />
            </h2>
            <small className="stat-label">Pets Recovered</small>
          </div>
          
          {/* 24/7 (STATIC - No Animation) */}
          <div className="stat-item">
            <h2 className="stat-number">24/7</h2>
            <small className="stat-label">Emergency Support</small>
          </div>

        </div>
      </section>

      {/* ==================== FEATURES GRID ==================== */}
      <section id="features" className="section features-section">
        <div className="section-header">
          <span className="section-tag">Why Choose Us?</span>
          <h2 className="section-title">Complete Digital Veterinary Ecosystem</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Icon name="health" />
            </div>
            <h4 className="feature-title">Seamless Appointments</h4>
            <p className="feature-desc">Book consultations with specialized veterinarians instantly. Filter by specialty, experience, and fees.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Icon name="chart" />
            </div>
            <h4 className="feature-title">Digital Health Records</h4>
            <p className="feature-desc">Store prescriptions, vaccination history, and lab reports in one secure cloud dashboard.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Icon name="paw" />
            </div>
            <h4 className="feature-title">Pet Profiling</h4>
            <p className="feature-desc">Detailed profiles including biometrics, allergies, dietary preferences, and behavioral traits.</p>
          </div>

           <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Icon name="shield" />
            </div>
            <h4 className="feature-title">Role-Based Access</h4>
            <p className="feature-desc">Dedicated dashboards for Admins, Vets, and Owners ensuring data privacy and tailored workflows.</p>
          </div>

           <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Icon name="health" />
            </div>
            <h4 className="feature-title">Vaccination Tracking</h4>
            <p className="feature-desc">Never miss a shot. Automated reminders for upcoming vaccinations and routine checkups.</p>
          </div>

           <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Icon name="chat" />
            </div>
            <h4 className="feature-title">Instant Support</h4>
            <p className="feature-desc">Connect with support or your doctor for quick queries regarding your pet's immediate health needs.</p>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="section">
        <div className="hiw-card">
          <div>
            <h2 className="section-title mb-4">How HappyPaws Works</h2>
            <p className="hero-subtitle mb-4">
              Getting started is easy. In just three simple steps, you can secure your pet's health future.
            </p>
            <Link to="/register" className="btn btn-outline-light px-4 py-2 rounded-pill fw-bold">Create Free Account</Link>
          </div>
          
          <div className="step-list">
            <div className="step-item">
              <div className="step-number" style={{background: "#3498db"}}>1</div>
              <div className="step-content">
                <h4>Create Profile</h4>
                <p>Sign up as a Pet Owner and create detailed profiles for each of your pets.</p>
              </div>
            </div>

             <div className="step-item">
              <div className="step-number" style={{background: "#f1c40f", color: "black"}}>2</div>
              <div className="step-content">
                <h4>Find a Vet</h4>
                <p>Browse our list of verified veterinarians and book an appointment.</p>
              </div>
            </div>

             <div className="step-item">
              <div className="step-number" style={{background: "#2ecc71"}}>3</div>
              <div className="step-content">
                <h4>Track Health</h4>
                <p>Get digital prescriptions and track your pet's recovery progress online.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="footer">
        <p className="mb-2">&copy; 2026 HappyPaws Inc. All rights reserved.</p>
        <small>Designed & Developed by <strong>Subham & Team</strong> • SVCET Final Year Project</small>
      </footer>

    </div>
  );
};

export default Home;