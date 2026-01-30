import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPets } from "../services/api";
import "./MyPets.css"; 

// --- SVG ASSETS (Internal Components for Pet Types) ---
const DogIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor" width="60" height="60">
    <path d="M21,48 C21,48 21,56 21,56 C21,56 26,56 26,56 C26,56 26,48 26,48 C26,48 38,48 38,48 C38,48 38,56 38,56 C38,56 43,56 43,56 C43,56 43,48 43,48 C43,48 53,38 53,26 C53,18 48,13 43,13 C43,13 43,4 38,4 C33,4 32,13 32,13 C32,13 31,4 26,4 C21,4 21,13 21,13 C16,13 11,18 11,26 C11,38 21,48 21,48 Z M18,24 C19.1,24 20,24.9 20,26 C20,27.1 19.1,28 18,28 C16.9,28 16,27.1 16,26 C16,24.9 16.9,24 18,24 Z M46,24 C47.1,24 48,24.9 48,26 C48,27.1 47.1,28 46,28 C44.9,28 44,27.1 44,26 C44,24.9 44.9,24 46,24 Z M32,36 C34.2,36 36,34.2 36,32 C36,32 28,32 28,32 C28,34.2 29.8,36 32,36 Z" />
  </svg>
);

const CatIcon = () => (
  <svg viewBox="0 0 64 64" fill="currentColor" width="60" height="60">
    <path d="M12,48 L12,56 L18,56 L18,48 L46,48 L46,56 L52,56 L52,48 C58,40 58,28 52,20 L52,6 L42,12 C38,10 26,10 22,12 L12,6 L12,20 C6,28 6,40 12,48 Z M18,28 C19.1,28 20,28.9 20,30 C20,31.1 19.1,32 18,32 C16.9,32 16,31.1 16,30 C16,28.9 16.9,28 18,28 Z M46,28 C47.1,28 48,28.9 48,30 C48,31.1 47.1,32 46,32 C44.9,32 44,31.1 44,30 C44,28.9 44.9,28 46,28 Z" />
  </svg>
);

// Generic Paw for other animals
const PawIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" width="50" height="50">
    <path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/> 
    <path d="M8 0a4 4 0 0 1 4 4v.5a.5.5 0 0 1-1 0V4a3 3 0 0 0-6 0v.5a.5.5 0 0 1-1 0V4a4 4 0 0 1 4-4z"/>
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
  </svg>
);

// Helper to get correct icon
const getPetIcon = (type) => {
  const t = type?.toLowerCase();
  if (t === 'dog') return <DogIcon />;
  if (t === 'cat') return <CatIcon />;
  // Add other specific SVGs here for Cow, Goat, etc.
  return <PawIcon />; // Default
};

const PlusIcon = () => (
  <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
  </svg>
);

const ViewIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
    </svg>
  );

const MyPets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const data = await getMyPets();
      setPets(data);
    } catch (err) {
      console.error("Error fetching pets:", err);
      setError("Failed to load your pets. Please try again."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mypets-container">
      
      {/* HEADER */}
      <div className="mypets-header">
        <h1 className="display-4 fw-bold text-white">MY PETS</h1>
        <p className="text-white-50">MANAGE PROFILES AND HEALTH RECORDS</p>
      </div>

      {error && (
        <div className="alert alert-danger text-center w-50 mx-auto">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-white mt-5">
           <div className="spinner-border text-light" role="status"></div>
           <p className="mt-2">Loading...</p>
        </div>
      ) : (
        <div className="pets-grid">
          
          {/* ➕ ADD NEW PET CARD */}
          <div className="pet-card add-pet-card" onClick={() => navigate("/add-pet")}>
            <div className="icon-wrapper"><PlusIcon /></div>
            <h3>REGISTER NEW PET</h3>
          </div>

          {/* 🐶 RENDER REAL PETS (ID CARD STYLE) */}
          {pets.length === 0 && !error ? (
             <p className="text-white-50 col-span-2">No pets found. Register a pet to get started.</p>
          ) : (
            pets.map((pet) => (
              <div key={pet.id} className="id-card">
                
                {/* 1. ID Header */}
                <div className="id-card-header">
                    <span>PET ID: #{pet.id}</span>
                    <span className="active-dot"></span>
                </div>

                {/* 2. Photo Area */}
                <div className="id-photo-section">
                    <div className="id-avatar">
                        {getPetIcon(pet.type)}
                    </div>
                    <h2 className="id-name">{pet.name}</h2>
                    <span className="id-type">{pet.type}</span>
                </div>

                {/* 3. Details Grid */}
                <div className="id-details">
                    <div className="id-row">
                        <span className="id-label">BREED</span>
                        <span className="id-value">{pet.breed}</span>
                    </div>
                    <div className="id-row">
                        <span className="id-label">GENDER</span>
                        <span className="id-value">{pet.gender}</span>
                    </div>
                    <div className="id-row">
                        <span className="id-label">AGE</span>
                        <span className="id-value">{pet.age} Years</span>
                    </div>
                </div>

                {/* 4. Action Footer */}
                <button className="btn-view-profile" onClick={() => navigate(`/pet-details/${pet.id}`)}>
                    VIEW FULL PROFILE <ViewIcon />
                </button>

              </div>
            ))
          )}

        </div>
      )}
    </div>
  );
};

export default MyPets;