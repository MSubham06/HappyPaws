import React, { useEffect, useState } from "react";
// Added 'getPets' to imports
import { 
    getVetProfile, getVetSchedule, getAllAppointments, getAllOwners, updatePet, getPets 
} from "../services/api";
import "./VetDashboard.css"; 

const VetDashboard = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Data States
  const [schedule, setSchedule] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [owners, setOwners] = useState([]);
  const [profile, setProfile] = useState(null);
  
  // View Toggle for Appointments
  const [showMyScheduleOnly, setShowMyScheduleOnly] = useState(false);

  // Modals
  const [showPetModal, setShowPetModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null); 
  const [editingPet, setEditingPet] = useState(null); 

  useEffect(() => {
    fetchData();
  }, [activeTab, showMyScheduleOnly]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
        if (activeTab === "profile") {
            const data = await getVetProfile();
            setProfile(data);
        } 
        else if (activeTab === "schedule") {
            try {
                if (showMyScheduleOnly) {
                    const data = await getVetSchedule();
                    const sorted = data ? data.sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
                    setSchedule(sorted);
                } else {
                    const data = await getAllAppointments();
                    const sorted = data ? data.sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
                    setAllAppointments(sorted);
                }
            } catch (scheduleErr) {
                console.warn("Schedule fetch issue:", scheduleErr);
                setSchedule([]);
                setAllAppointments([]);
            }
        }
        else if (activeTab === "patients") {
            // Manually Link Pets to Owners
            const ownersData = await getAllOwners(); 
            const petsData = await getPets(); 

            const linkedOwners = ownersData.map(owner => {
                const myPets = petsData.filter(pet => 
                    (pet.owner && pet.owner.id === owner.id) || 
                    (pet.ownerId === owner.id)
                );
                return { ...owner, pets: myPets };
            });

            setOwners(linkedOwners); 
        }
    } catch (err) {
        console.error(err);
        setError("Failed to load data.");
    } finally {
        setLoading(false);
    }
  };

  const handleEditPet = (pet) => {
      setEditingPet({ ...pet });
      setShowPetModal(true);
  };

  const handleSavePet = async (e) => {
      e.preventDefault();
      try {
          await updatePet(editingPet.id, editingPet);
          alert("Pet updated successfully!");
          setShowPetModal(false);
          if (activeTab === 'patients') fetchData();
      } catch (err) {
          alert("Failed to update pet.");
      }
  };

  const handlePetInputChange = (e) => {
      setEditingPet({ ...editingPet, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
      if(!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="vet-dashboard-container container-fluid">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
        <h1 className="fw-bold text-white dashboard-title">Vet <span style={{ color: "var(--primary-red)" }}>Panel</span></h1>
        <div className="text-muted small">Welcome Back!</div>
      </div>

      {/* TABS */}
      <div className="d-flex gap-3 mb-4 px-3 tabs-container">
        {["schedule", "patients", "profile"].map((tab) => (
            <button key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''} text-capitalize`} 
                onClick={() => { setActiveTab(tab); setSelectedOwner(null); }}>
                {tab}
            </button>
        ))}
      </div>

      {/* ERROR / LOADING */}
      <div className="px-3">
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <div className="text-center py-5 text-white"><div className="spinner-border text-danger"></div></div>}
      </div>

      {!loading && (
        <div className="px-3">
            {/* ================= 1. SCHEDULE TAB ================= */}
            {activeTab === "schedule" && (
                <div className="fade-in">
                    <div className="mb-3">
                        <div className="btn-group" role="group">
                            <button 
                                type="button" 
                                className={`btn ${!showMyScheduleOnly ? 'btn-danger' : 'btn-outline-secondary'}`} 
                                onClick={() => setShowMyScheduleOnly(false)}
                            >
                                All Appointments
                            </button>
                            <button 
                                type="button" 
                                className={`btn ${showMyScheduleOnly ? 'btn-danger' : 'btn-outline-secondary'}`} 
                                onClick={() => setShowMyScheduleOnly(true)}
                            >
                                My Schedule
                            </button>
                        </div>
                    </div>

                    <div className="glass-card p-0 table-responsive rounded-3 border border-secondary" style={{backgroundColor: "rgba(33, 37, 41, 0.9)"}}>
                        <table className="table table-dark table-hover align-middle mb-0" style={{background: 'transparent'}}>
                            <thead>
                                <tr className="text-muted small text-uppercase border-bottom border-secondary">
                                    <th className="p-3">Time</th>
                                    <th>Patient & Owner</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(showMyScheduleOnly ? schedule : allAppointments).map((appt) => (
                                    <tr key={appt.id} className="border-bottom border-secondary">
                                        <td className="p-3">
                                            <div className="badge bg-dark border border-secondary text-white mb-1">{formatDate(appt.date)}</div>
                                            <div className="small text-muted">{appt.time}</div>
                                        </td>
                                        <td>
                                            <div className="fw-bold text-white fs-5">{appt.pet?.name || "Unknown Pet"}</div>
                                            <div className="small text-muted">Owner: {appt.owner?.firstName} {appt.owner?.lastName}</div>
                                        </td>
                                        <td className="text-light">{appt.reason}</td>
                                        <td>
                                            <span className={`badge ${appt.status === 'CONFIRMED' ? 'bg-success' : 'bg-warning'} text-dark`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {(showMyScheduleOnly ? schedule : allAppointments).length === 0 && (
                                    <tr><td colSpan="4" className="text-center py-5 text-muted">No appointments found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ================= 2. PATIENTS TAB ================= */}
            {activeTab === "patients" && (
                <div className="fade-in">
                    {!selectedOwner ? (
                        <div className="grid-container">
                            {owners.map((owner) => (
                                <div key={owner.id} className="info-card" onClick={() => setSelectedOwner(owner)} style={{cursor: 'pointer'}}>
                                    <div className="card-header-row">
                                        <span className="card-id">OWNER #{owner.id}</span>
                                        <i className="bi bi-chevron-right text-muted"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3>{owner.firstName} {owner.lastName}</h3>
                                        <span className="card-subtitle">{owner.city}</span>
                                        <div className="card-details">
                                            <p><i className="bi bi-envelope"></i> {owner.email}</p>
                                            <p><i className="bi bi-telephone"></i> {owner.phone}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <button className="btn btn-sm btn-outline-secondary w-100 text-white">View Pets</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <button className="btn btn-link text-white mb-3 ps-0 text-decoration-none" onClick={() => setSelectedOwner(null)}>
                                <i className="bi bi-arrow-left me-2"></i> Back to Owners
                            </button>
                            
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="glass-card p-4 h-100">
                                        <h4 className="text-danger fw-bold mb-3">Owner Details</h4>
                                        <h2 className="text-white">{selectedOwner.firstName} {selectedOwner.lastName}</h2>
                                        <div className="mt-4 text-muted">
                                            <p><i className="bi bi-envelope me-2"></i> {selectedOwner.email}</p>
                                            <p><i className="bi bi-telephone me-2"></i> {selectedOwner.phone}</p>
                                            <p><i className="bi bi-geo-alt me-2"></i> {selectedOwner.city}</p>
                                            <p><i className="bi bi-house me-2"></i> {selectedOwner.address}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <h4 className="text-white fw-bold mb-3">Pets</h4>
                                    <div className="grid-container" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'}}>
                                        {(selectedOwner.pets || []).length === 0 ? (
                                            <div className="text-muted">No pets linked to this owner.</div>
                                        ) : (
                                            selectedOwner.pets.map(pet => (
                                                <div key={pet.id} className="info-card">
                                                    <div className="card-header-row">
                                                        <span className="card-id">PET #{pet.id}</span>
                                                        <span className="badge bg-secondary">{pet.type}</span>
                                                    </div>
                                                    <div className="card-body">
                                                        <h3>{pet.name}</h3>
                                                        <span className="card-subtitle">{pet.breed}</span>
                                                        <div className="card-details">
                                                            <p>Age: {pet.age} yrs</p>
                                                            <p>Gender: {pet.gender || 'N/A'}</p>
                                                            <p>Weight: {pet.weight ? `${pet.weight} kg` : 'N/A'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="card-actions mt-auto pt-3">
                                                        <button className="btn btn-sm btn-outline-warning w-100" onClick={() => handleEditPet(pet)}>
                                                            Edit Full Profile
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ================= 3. PROFILE TAB ================= */}
            {activeTab === "profile" && profile && (
                <div className="d-flex justify-content-center fade-in">
                    <div className="glass-card p-5" style={{maxWidth: '600px', width: '100%'}}>
                        <div className="text-center mb-4">
                            <div className="bg-dark rounded-circle d-inline-flex align-items-center justify-content-center border border-secondary" style={{width: '100px', height: '100px'}}>
                                <i className="bi bi-person-fill text-danger" style={{fontSize: '3rem'}}></i>
                            </div>
                            <h2 className="text-white mt-3">Dr. {profile.firstName} {profile.lastName}</h2>
                            <span className="badge bg-danger fs-6">{profile.specialization}</span>
                        </div>
                        
                        <div className="row g-4 mt-2 border-top border-secondary pt-4">
                            <div className="col-6">
                                <label className="text-muted small text-uppercase fw-bold">Email</label>
                                <div className="text-white fs-5">{profile.email}</div>
                            </div>
                            <div className="col-6">
                                <label className="text-muted small text-uppercase fw-bold">Phone</label>
                                <div className="text-white fs-5">{profile.phone}</div>
                            </div>
                            <div className="col-6">
                                <label className="text-muted small text-uppercase fw-bold">Consultation Fee</label>
                                <div className="text-success fw-bold fs-5">${profile.consultationFee}</div>
                            </div>
                            <div className="col-6">
                                <label className="text-muted small text-uppercase fw-bold">Account Status</label>
                                <div className="text-white fs-5"><i className="bi bi-check-circle-fill text-success me-2"></i>Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      )}

      {/* EDIT PET MODAL - EXPANDED FOR FULL DETAILS */}
      {showPetModal && editingPet && (
        <div className="modal d-block" style={{background: "rgba(0,0,0,0.85)", backdropFilter: "blur(5px)"}}>
            <div className="modal-dialog modal-dialog-centered modal-lg"> {/* Made modal wider */}
                <div className="modal-content bg-dark text-white border border-secondary shadow-lg p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                         <h5 className="fw-bold modal-title">Edit Patient: {editingPet.name}</h5>
                         <button className="btn-close btn-close-white" onClick={() => setShowPetModal(false)}></button>
                    </div>
                    <form onSubmit={handleSavePet}>
                        <div className="row g-3">
                            {/* Basic Info */}
                            <div className="col-md-6">
                                <label className="form-label">Name</label>
                                <input name="name" value={editingPet.name || ''} className="form-control bg-dark text-white border-secondary" onChange={handlePetInputChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Type (e.g., Dog, Cat)</label>
                                <input name="type" value={editingPet.type || ''} className="form-control bg-dark text-white border-secondary" onChange={handlePetInputChange} required />
                            </div>

                            {/* Details */}
                            <div className="col-md-6">
                                <label className="form-label">Breed</label>
                                <input name="breed" value={editingPet.breed || ''} className="form-control bg-dark text-white border-secondary" onChange={handlePetInputChange} />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Age (Years)</label>
                                <input name="age" type="number" value={editingPet.age || ''} className="form-control bg-dark text-white border-secondary" onChange={handlePetInputChange} required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label">Weight (kg)</label>
                                <input name="weight" type="number" step="0.1" value={editingPet.weight || ''} className="form-control bg-dark text-white border-secondary" onChange={handlePetInputChange} />
                            </div>

                            {/* Extra Details */}
                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select name="gender" value={editingPet.gender || ''} className="form-select bg-dark text-white border-secondary" onChange={handlePetInputChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Color/Markings</label>
                                <input name="color" value={editingPet.color || ''} className="form-control bg-dark text-white border-secondary" onChange={handlePetInputChange} />
                            </div>

                            {/* Medical Notes */}
                            <div className="col-12">
                                <label className="form-label">Chronic Conditions / Medical Notes</label>
                                <textarea name="chronicConditions" value={editingPet.chronicConditions || ''} className="form-control bg-dark text-white border-secondary" rows="3" onChange={handlePetInputChange}></textarea>
                            </div>
                        </div>

                        <div className="d-grid mt-4">
                            <button type="submit" className="add-btn text-white">Save Patient Record</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default VetDashboard;