import React, { useEffect, useState } from "react";
import { 
    getAllVets, getAllOwners, getPets, getAllVisits, getAllAppointments,
    registerVet, registerOwner, createPet, createVisit, createAppointment,
    updateVet, updateOwner, updatePet, updateVisit, updateAppointment,
    deleteVet, deleteOwner, deletePet, deleteVisit, deleteAppointment
} from "../services/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sorting State
  const [sortOrder, setSortOrder] = useState("newest"); // newest, oldest, today

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchData();
    setSearchTerm("");
    setSortOrder("newest");
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      let result = [];
      if (activeTab === "vets") result = await getAllVets();
      else if (activeTab === "owners") result = await getAllOwners();
      else if (activeTab === "pets") result = await getPets();
      else if (activeTab === "visits") result = await getAllVisits();
      else if (activeTab === "appointments") result = await getAllAppointments();
      setData(result);
    } catch (err) {
      console.error(err);
      setError(`Failed to load ${activeTab}.`);
    } finally {
      setLoading(false);
    }
  };

  // --- SORTING LOGIC ---
  const getSortedData = () => {
    let processedData = [...data];

    // 1. Search Filter
    if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        processedData = processedData.filter(item => 
            JSON.stringify(item).toLowerCase().includes(lowerSearch)
        );
    }

    // 2. Date Sorting (Only for Appointments & Visits)
    if (activeTab === 'appointments' || activeTab === 'visits') {
        processedData.sort((a, b) => {
            const dateA = new Date(a.date || a.visitDate);
            const dateB = new Date(b.date || b.visitDate);
            
            if (sortOrder === 'newest') return dateB - dateA;
            if (sortOrder === 'oldest') return dateA - dateB;
            return 0;
        });

        // 3. "Today" Filter
        if (sortOrder === 'today') {
            const todayStr = new Date().toISOString().split('T')[0];
            processedData = processedData.filter(item => 
                (item.date || item.visitDate) === todayStr
            );
        }
    } else {
        // Default ID sort for others
        processedData.sort((a, b) => b.id - a.id);
    }

    return processedData;
  };

  const filteredData = getSortedData();

  // --- HANDLERS (Delete, Edit, Create) ---
  const handleDelete = async (id) => {
    if(!window.confirm("Delete this record?")) return;
    try {
        if (activeTab === "vets") await deleteVet(id);
        else if (activeTab === "owners") await deleteOwner(id);
        else if (activeTab === "pets") await deletePet(id);
        else if (activeTab === "visits") await deleteVisit(id);
        else if (activeTab === "appointments") await deleteAppointment(id);
        fetchData();
    } catch (err) { alert("Failed to delete."); }
  };

  const handleCreate = () => { setIsEditing(false); setFormData({}); setShowModal(true); };
  
  const handleEdit = (item) => {
    setIsEditing(true);
    setSelectedItem(item);
    let initialData = { ...item };
    
    // Flatten Objects for Form
    if (activeTab === 'appointments') {
        if (item.owner) initialData.ownerId = item.owner.id;
        if (item.pet) initialData.petId = item.pet.id;
        if (item.vet) initialData.vetId = item.vet.id;
    }
    // ✅ FIX: Flatten objects for Visits
    if (activeTab === 'visits') {
        if (item.pet) initialData.petId = item.pet.id;
        if (item.vet) initialData.vetId = item.vet.id;
        // Ensure date format is correct for input type="date"
        if (item.visitDate) initialData.visitDate = item.visitDate.split('T')[0]; 
    }
    if (activeTab === 'pets' && item.owner) initialData.ownerId = item.owner.id;
    
    setFormData(initialData);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
        const id = selectedItem?.id;
        const action = isEditing 
            ? (activeTab === "vets" ? updateVet : activeTab === "owners" ? updateOwner : activeTab === "pets" ? updatePet : activeTab === "visits" ? updateVisit : updateAppointment)
            : (activeTab === "vets" ? registerVet : activeTab === "owners" ? registerOwner : activeTab === "pets" ? createPet : activeTab === "visits" ? createVisit : createAppointment);
        
        await action(isEditing ? id : formData, isEditing ? formData : undefined);
        setShowModal(false);
        fetchData();
    } catch (err) { alert("Operation failed. Check console."); }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- RENDER HELPERS ---
  const formatDate = (dateString) => {
      if(!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="admin-dashboard-container container-fluid mt-4">
      
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold text-white dashboard-title">Admin <span style={{ color: "var(--primary-red)" }}>Dashboard</span></h1>
        <button className="add-btn text-white shadow" onClick={handleCreate}>
            <i className="bi bi-plus-lg me-2"></i>New {activeTab.slice(0, -1)}
        </button>
      </div>

      {/* TABS */}
      <div className="d-flex gap-3 mb-4 tabs-container overflow-auto">
        {["appointments", "visits", "pets", "vets", "owners"].map((tab) => (
            <button key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''} text-capitalize`} 
                onClick={() => setActiveTab(tab)}>
                {tab}
            </button>
        ))}
      </div>

      {/* TOOLBAR */}
      <div className="row g-3 mb-4">
        <div className="col-md-8">
            <input type="text" className="form-control search-input" placeholder={`Search ${activeTab}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        {(activeTab === 'appointments' || activeTab === 'visits') && (
            <div className="col-md-4">
                <select className="form-select sort-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="today">Today Only</option>
                </select>
            </div>
        )}
      </div>

      {/* CONTENT */}
      {loading ? (
          <div className="text-center text-white py-5"><div className="spinner-border text-danger"></div></div>
      ) : (
        <>
            {/* VIEW 1: TABLE (Appointments & Visits) */}
            {(activeTab === 'appointments' || activeTab === 'visits') && (
                <div className="glass-table">
                    <table className="table table-dark table-hover align-middle mb-0" style={{background: 'transparent'}}>
                        <thead>
                            <tr className="table-header">
                                <th className="p-3">Date & Time</th>
                                <th>Details</th>
                                <th>Entities</th>
                                <th className="text-end p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.id} className="table-row">
                                    <td className="p-3">
                                        <div className="date-badge text-white">{formatDate(item.date || item.visitDate)}</div>
                                        <div className="small text-muted">{item.time || "All Day"}</div>
                                        {item.status && <span className={`badge mt-1 ${item.status === 'CONFIRMED' ? 'bg-success' : 'bg-warning'} text-dark`}>{item.status}</span>}
                                        {item.visitType && <span className="badge mt-1 bg-info text-dark">{item.visitType}</span>}
                                    </td>
                                    <td>
                                        <div className="text-white fw-bold">{item.reason || "Diagnosis:"}</div>
                                        <div className="text-muted small">{item.diagnosis || item.reason}</div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-2">
                                            {item.owner && <span className="badge border border-secondary text-secondary">Owner: {item.owner.firstName}</span>}
                                            {item.pet && <span className="badge border border-secondary text-secondary">Pet: {item.pet.name}</span>}
                                            {item.vet && <span className="badge border border-secondary text-secondary">Vet: {item.vet.firstName}</span>}
                                        </div>
                                    </td>
                                    <td className="text-end p-3">
                                        <button className="btn btn-sm btn-outline-warning me-2" onClick={() => handleEdit(item)}><i className="bi bi-pencil"></i></button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}><i className="bi bi-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* VIEW 2: CARDS (Pets, Vets, Owners) */}
            {(activeTab === 'pets' || activeTab === 'vets' || activeTab === 'owners') && (
                <div className="grid-container">
                    {filteredData.map((item) => (
                        <div key={item.id} className="info-card">
                            <div className="card-header-row">
                                <span className="card-id">ID #{item.id}</span>
                                {activeTab === 'pets' && <span className="badge bg-secondary">{item.type}</span>}
                            </div>
                            
                            <div className="card-body">
                                <h3>{item.name || item.firstName + ' ' + item.lastName}</h3>
                                {activeTab === 'vets' && <span className="card-subtitle">{item.specialization}</span>}
                                {activeTab === 'owners' && <span className="card-subtitle">{item.city}</span>}
                                {activeTab === 'pets' && <span className="card-subtitle">{item.breed}</span>}
                                
                                <div className="card-details">
                                    {item.email && <p><i className="bi bi-envelope"></i> {item.email}</p>}
                                    {item.phone && <p><i className="bi bi-telephone"></i> {item.phone}</p>}
                                    {item.age && <p><i className="bi bi-calendar"></i> {item.age} years old</p>}
                                    {item.consultationFee && <p><i className="bi bi-cash"></i> ${item.consultationFee}</p>}
                                </div>
                            </div>

                            <div className="card-actions">
                                <button className="btn btn-sm btn-outline-warning" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
      )}

      {/* MANAGE RECORD MODAL (With Labels) */}
      {showModal && (
        <div className="modal d-block" style={{background: "rgba(0,0,0,0.85)"}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4">
                    <div className="d-flex justify-content-between mb-3">
                         <h5 className="fw-bold">{isEditing ? "Edit" : "New"} {activeTab.slice(0, -1)}</h5>
                         <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                    </div>
                    <form onSubmit={handleSave}>
                        {/* Dynamic Inputs based on Tab */}
                        
                        {/* --- APPOINTMENTS FORM --- */}
                        {activeTab === 'appointments' && (
                            <>
                                <div className="mb-3"><label className="form-label">Date</label><input name="date" type="date" value={formData.date || ''} className="form-control" onChange={handleInputChange} required /></div>
                                <div className="mb-3"><label className="form-label">Time</label><input name="time" type="time" value={formData.time || ''} className="form-control" onChange={handleInputChange} required /></div>
                                <div className="mb-3"><label className="form-label">Reason</label><input name="reason" value={formData.reason || ''} className="form-control" onChange={handleInputChange} required /></div>
                                <div className="row g-2">
                                    <div className="col"><label className="form-label">Owner ID</label><input name="ownerId" type="number" value={formData.ownerId || ''} className="form-control" onChange={handleInputChange} required /></div>
                                    <div className="col"><label className="form-label">Pet ID</label><input name="petId" type="number" value={formData.petId || ''} className="form-control" onChange={handleInputChange} required /></div>
                                    <div className="col"><label className="form-label">Vet ID</label><input name="vetId" type="number" value={formData.vetId || ''} className="form-control" onChange={handleInputChange} required /></div>
                                </div>
                            </>
                        )}

                        {/* --- ✅ NEW VISITS FORM --- */}
                        {activeTab === 'visits' && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Visit Date</label>
                                    <input name="visitDate" type="date" value={formData.visitDate || ''} className="form-control" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Reason / Description</label>
                                    <input name="reason" value={formData.reason || ''} className="form-control" onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Diagnosis (Optional)</label>
                                    <input name="diagnosis" value={formData.diagnosis || ''} className="form-control" onChange={handleInputChange} />
                                </div>
                                <div className="row g-2">
                                    <div className="col">
                                        <label className="form-label">Pet ID</label>
                                        <input name="petId" type="number" value={formData.petId || ''} className="form-control" onChange={handleInputChange} required />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Vet ID</label>
                                        <input name="vetId" type="number" value={formData.vetId || ''} className="form-control" onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </>
                        )}
                        
                        {/* --- OWNERS / VETS FORM --- */}
                        {(activeTab === 'owners' || activeTab === 'vets') && (
                            <>
                                <div className="row g-2 mb-3">
                                    <div className="col"><label className="form-label">First Name</label><input name="firstName" value={formData.firstName || ''} className="form-control" onChange={handleInputChange} required /></div>
                                    <div className="col"><label className="form-label">Last Name</label><input name="lastName" value={formData.lastName || ''} className="form-control" onChange={handleInputChange} required /></div>
                                </div>
                                <div className="mb-3"><label className="form-label">Email</label><input name="email" value={formData.email || ''} className="form-control" onChange={handleInputChange} required /></div>
                                <div className="mb-3"><label className="form-label">Phone</label><input name="phone" value={formData.phone || ''} className="form-control" onChange={handleInputChange} required /></div>
                                {activeTab === 'owners' && <div className="mb-3"><label className="form-label">City</label><input name="city" value={formData.city || ''} className="form-control" onChange={handleInputChange} required /></div>}
                                {activeTab === 'vets' && (
                                    <>
                                        <div className="mb-3"><label className="form-label">Specialization</label><input name="specialization" value={formData.specialization || ''} className="form-control" onChange={handleInputChange} required /></div>
                                        <div className="mb-3"><label className="form-label">Consultation Fee ($)</label><input name="consultationFee" type="number" value={formData.consultationFee || ''} className="form-control" onChange={handleInputChange} /></div>
                                    </>
                                )}
                            </>
                        )}

                        {/* --- PETS FORM --- */}
                        {activeTab === 'pets' && (
                            <>
                                <div className="mb-3"><label className="form-label">Name</label><input name="name" value={formData.name || ''} className="form-control" onChange={handleInputChange} required /></div>
                                <div className="mb-3"><label className="form-label">Type (e.g. Dog, Cat)</label><input name="type" value={formData.type || ''} className="form-control" onChange={handleInputChange} required /></div>
                                <div className="mb-3"><label className="form-label">Breed</label><input name="breed" value={formData.breed || ''} className="form-control" onChange={handleInputChange} /></div>
                                <div className="row g-2">
                                    <div className="col"><label className="form-label">Age</label><input name="age" type="number" value={formData.age || ''} className="form-control" onChange={handleInputChange} required /></div>
                                    <div className="col"><label className="form-label">Owner ID</label><input name="ownerId" type="number" value={formData.ownerId || ''} className="form-control" onChange={handleInputChange} required /></div>
                                </div>
                            </>
                        )}

                        <div className="d-grid mt-4">
                            <button type="submit" className="add-btn text-white">Save Record</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;