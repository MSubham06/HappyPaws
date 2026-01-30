import React from "react";

const PetCard = ({ pet }) => {
  // Calculate age or default to 'Unknown'
  const age = pet.age ? `${pet.age} years` : "Age unknown";

  return (
    <div className="glass-card p-4 text-white position-relative h-100">
      {/* Status Badge */}
      <span className="position-absolute top-0 end-0 m-3 badge bg-success">
        Healthy
      </span>

      <div className="d-flex align-items-center mb-3">
        {/* Pet Icon Avatar */}
        <div 
          className="rounded-circle d-flex align-items-center justify-content-center me-3"
          style={{ width: "60px", height: "60px", background: "rgba(255,255,255,0.1)" }}
        >
          <span className="fs-2">🐕</span>
        </div>
        
        <div>
          <h4 className="fw-bold mb-0">{pet.name}</h4>
          <small className="text-muted">{pet.breed}</small>
        </div>
      </div>

      <div className="d-flex justify-content-between mt-3 text-muted small">
        <span>🎂 {age}</span>
        <span>⚖️ {pet.weight ? `${pet.weight}kg` : "N/A"}</span>
      </div>

      <button className="btn btn-sm btn-outline-light w-100 mt-4">
        View Medical History
      </button>
    </div>
  );
};

export default PetCard;