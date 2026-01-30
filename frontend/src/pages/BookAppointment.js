import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPets, getAllVets, bookAppointment } from "../services/api";
import "./BookAppointment.css";

// ✅ IMPORT IMAGE FROM ASSETS
import vetImage from "../assets/Book-app-vet.jpeg"; 

const BookAppointment = () => {
  const navigate = useNavigate();
  
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  
  const [formData, setFormData] = useState({
    petId: "",
    vetId: "",
    date: "",
    time: "",
    reason: "General Checkup"
  });

  const [status, setStatus] = useState({ loading: false, error: "", success: false });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const petsData = await getMyPets();
      const vetsData = await getAllVets();
      setPets(petsData);
      setVets(vetsData);
      
      if (petsData.length > 0) {
        setFormData(prev => ({ ...prev, petId: petsData[0].id }));
      }
    } catch (err) {
      console.error("Error loading form data", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });

    try {
      await bookAppointment(formData);
      setStatus({ loading: false, error: "", success: true });
      setTimeout(() => navigate("/owner-dashboard"), 2000);
    } catch (errMsg) {
      setStatus({ 
        loading: false, 
        error: typeof errMsg === "string" ? errMsg : "Booking failed. Please try again.", 
        success: false 
      });
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        
        {/* LEFT SIDE: FORM */}
        <div className="booking-form-section">
            <div className="card-header">
                <h2>Book Appointment</h2>
                <p>Schedule a visit for your furry friend.</p>
            </div>
            
            {status.success && (
                <div className="alert success">
                    ✅ Appointment Confirmed!
                </div>
            )}
            
            {status.error && (
                <div className="alert error">
                    ⚠️ {status.error}
                </div>
            )}

            {!status.success && (
                <form onSubmit={handleSubmit}>
                    
                    {/* Row 1: Pet & Vet */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Select Pet</label>
                            <select name="petId" value={formData.petId} onChange={handleChange} required>
                                <option value="">-- Choose Pet --</option>
                                {pets.map(pet => (
                                    <option key={pet.id} value={pet.id}>{pet.name} ({pet.type})</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Select Veterinarian</label>
                            <select name="vetId" value={formData.vetId} onChange={handleChange} required>
                                <option value="">-- Choose Vet --</option>
                                {vets.map(vet => (
                                    <option key={vet.id} value={vet.id}>
                                        Dr. {vet.firstName} {vet.lastName} ({vet.specialization})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Date & Time */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Date</label>
                            <input 
                                type="date" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleChange} 
                                required 
                                className="minimal-date-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Time</label>
                            <select name="time" value={formData.time} onChange={handleChange} required>
                                <option value="">Select Slot</option>
                                <option value="09:00:00">09:00 AM</option>
                                <option value="10:00:00">10:00 AM</option>
                                <option value="11:00:00">11:00 AM</option>
                                <option value="14:00:00">02:00 PM</option>
                                <option value="15:00:00">03:00 PM</option>
                                <option value="16:00:00">04:00 PM</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3: Reason */}
                    <div className="form-group">
                        <label>Reason for Visit</label>
                        <select name="reason" value={formData.reason} onChange={handleChange}>
                            <option value="General Checkup">General Checkup</option>
                            <option value="Vaccination">Vaccination</option>
                            <option value="Emergency">Emergency / Injury</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Dental Care">Dental Care</option>
                        </select>
                    </div>

                    <div className="action-buttons">
                        <button type="button" className="btn-cancel" onClick={() => navigate("/owner-dashboard")}>Cancel</button>
                        <button type="submit" className="btn-confirm" disabled={status.loading}>
                            {status.loading ? "Booking..." : "Confirm Appointment"}
                        </button>
                    </div>

                </form>
            )}
        </div>

        {/* RIGHT SIDE: IMAGE */}
        <div className="booking-image-section">
            <img 
                src={vetImage} 
                alt="Vet Examining Cat" 
                className="vet-illustration"
            />
            {/* GRADIENT OVERLAY */}
            <div className="image-gradient-overlay">
                {/* <h3>EXPERT CARE</h3>
                <p>Top-tier services.</p> */}
            </div>
        </div>

      </div>
    </div>
  );
};

export default BookAppointment;