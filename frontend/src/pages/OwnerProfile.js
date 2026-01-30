import React, { useEffect, useState } from "react";
import { getOwnerProfile, updateOwnerProfile } from "../services/api";
import "./OwnerProfile.css";

// 💾 Save Icon
const SaveIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
  </svg>
);

// ✏️ Edit Icon
const EditIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
  </svg>
);

const OwnerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getOwnerProfile();
      setProfile(data);
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        city: data.city || ""
      });
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to load profile details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedProfile = await updateOwnerProfile(profile.id, formData);
      setProfile(updatedProfile);
      setIsEditing(false);
      
      // ✅ NO ALERTS
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000); 

    } catch (err) {
      console.error("Error updating profile:", err);
      setSaveStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) return <div className="profile-loading">Loading Profile...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-avatar">
            {profile?.firstName?.charAt(0).toUpperCase()}
          </div>
          <h2 className="profile-name">
            {isEditing ? "Edit Profile" : `${profile?.firstName} ${profile?.lastName}`}
          </h2>
          <p className="profile-role">Pet Owner</p>
        </div>

        {/* DETAILS SECTION */}
        <div className="profile-details">
          
          <div className="form-row">
            <div className="detail-item">
              <span className="detail-label">First Name</span>
              {isEditing ? <input name="firstName" className="edit-input" value={formData.firstName} onChange={handleChange} /> 
              : <span className="detail-value">{profile?.firstName}</span>}
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Name</span>
              {isEditing ? <input name="lastName" className="edit-input" value={formData.lastName} onChange={handleChange} /> 
              : <span className="detail-value">{profile?.lastName}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{profile?.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Phone</span>
              {isEditing ? <input name="phone" className="edit-input" value={formData.phone} onChange={handleChange} /> 
              : <span className="detail-value">{profile?.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="detail-item">
              <span className="detail-label">Address</span>
              {isEditing ? <input name="address" className="edit-input" value={formData.address} onChange={handleChange} /> 
              : <span className="detail-value">{profile?.address || "Not Set"}</span>}
            </div>
            <div className="detail-item">
              <span className="detail-label">City</span>
              {isEditing ? <input name="city" className="edit-input" value={formData.city} onChange={handleChange} /> 
              : <span className="detail-value">{profile?.city}</span>}
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        {isEditing ? (
          <div className="action-buttons">
            <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="btn-save" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : <><SaveIcon /> Save Changes</>}
            </button>
          </div>
        ) : (
          <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
             {saveStatus === "success" ? "Saved! ✅" : <><EditIcon /> Edit Profile</>}
          </button>
        )}

      </div>
    </div>
  );
};

export default OwnerProfile;