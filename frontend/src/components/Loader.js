import React from "react";
import "./Loader.css";

// Accepts "type": 'fullscreen' (default) or 'content' (below navbar)
const Loader = ({ type = "fullscreen" }) => {
  // Map 'content' prop to the .content CSS class
  const cssClass = type === "content" ? "content" : "fullscreen";

  return (
    <div className={`loader-container ${cssClass}`}>
      <div className="loader-content">
        <img 
          src="/logo.png" 
          alt="Loading..." 
          className="loader-logo" 
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        
        <h2 className="loader-text">HappyPaws</h2>
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;