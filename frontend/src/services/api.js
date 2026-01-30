import axios from "axios";

// 🚀 PRODUCTION BACKEND URL
const API_URL = "https://happypaws-backend-z4ik.onrender.com/api";

// 🧠 PRODUCTION ML SERVICE URL
const ML_API_URL = "https://happypaws-ml-dmjm.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

// 🛡️ TOKEN INTERCEPTOR (Attaches JWT to every request)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// 🤖 AI / ML SERVICE
// ==========================
export const getPrediction = async (symptoms) => {
    // This call goes to the Python Flask Service, not the Spring Boot Backend
    const response = await axios.post(`${ML_API_URL}/predict`, { symptoms });
    return response.data;
};

// ==========================
// 🔐 AUTHENTICATION
// ==========================
export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    if (response.data.role) localStorage.setItem("role", response.data.role);
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
};

// ==========================
// 👤 USERS (Admin Management)
// ==========================
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/users", userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => api.delete(`/users/${id}`);


// ==========================
// 🩺 VETS
// ==========================
export const getAllVets = async () => {
  const response = await api.get("/vets");
  return response.data;
};

export const registerVet = async (vetData) => {
  const response = await api.post("/vets", vetData);
  return response.data;
};

export const updateVet = async (id, vetData) => {
  const response = await api.put(`/vets/${id}`, vetData);
  return response.data;
};

export const deleteVet = async (id) => api.delete(`/vets/${id}`);

// Vet Dashboard Functions
export const getVetProfile = async () => {
    const response = await api.get("/vets/me");
    return response.data;
};

export const getVetSchedule = async () => {
    const response = await api.get("/appointments/vet-schedule");
    return response.data;
};


// ==========================
// 👥 OWNERS
// ==========================
export const getAllOwners = async () => {
  try {
    const response = await api.get("/owners");
    return response.data;
  } catch (error) {
    console.error("Error fetching owners", error);
    return [];
  }
};

// Self Profile
export const getOwnerProfile = async () => {
  const response = await api.get("/owners/me");
  return response.data;
};

// Update Self Profile
export const updateOwnerProfile = async (id, ownerData) => {
  const response = await api.put(`/owners/${id}`, ownerData);
  return response.data;
};

// Admin Create
export const registerOwner = async (ownerData) => {
  const response = await api.post("/owners", ownerData);
  return response.data;
};

// Admin Update
export const updateOwner = async (id, ownerData) => {
  const response = await api.put(`/owners/${id}`, ownerData);
  return response.data;
};

export const deleteOwner = async (id) => api.delete(`/owners/${id}`);


// ==========================
// 🐾 PETS
// ==========================
// Get pets belonging to the logged-in owner
export const getMyPets = async () => {
  const response = await api.get("/pets/my-pets");
  return response.data;
};

// Get single pet details
export const getPetById = async (id) => {
  const response = await api.get(`/pets/${id}`);
  return response.data;
};

// Admin/Vet view of all pets
export const getPets = async () => {
  const response = await api.get("/pets");
  return response.data;
};

// Create (Admin/Owner)
export const createPet = async (petData) => {
  const response = await api.post("/pets", petData);
  return response.data;
};
export const addPet = createPet; 

export const updatePet = async (id, petData) => {
  const response = await api.put(`/pets/${id}`, petData);
  return response.data;
};

export const deletePet = async (id) => api.delete(`/pets/${id}`);


// ==========================
// 📅 VISITS (Medical Records)
// ==========================
export const getAllVisits = async () => {
  try {
    const response = await api.get("/visits");
    return response.data;
  } catch (error) {
    console.error("Error fetching visits", error);
    return [];
  }
};

export const createVisit = async (visitData) => {
  const response = await api.post("/visits", visitData);
  return response.data;
};

export const updateVisit = async (id, visitData) => {
  const response = await api.put(`/visits/${id}`, visitData);
  return response.data;
};

export const deleteVisit = async (id) => api.delete(`/visits/${id}`);


// ==========================
// 📆 APPOINTMENTS (Booking System)
// ==========================

// Admin: Get All
export const getAllAppointments = async () => {
  const response = await api.get("/appointments");
  return response.data;
};

// Admin: Create
export const createAppointment = async (appointmentData) => {
  const response = await api.post("/appointments", appointmentData);
  return response.data;
};

// Admin: Update (Reschedule/Status Change)
export const updateAppointment = async (id, appointmentData) => {
  const response = await api.put(`/appointments/${id}`, appointmentData);
  return response.data;
};

// Admin: Delete
export const deleteAppointment = async (id) => api.delete(`/appointments/${id}`);

// Owner: Get Own
export const getMyAppointments = async () => {
  const response = await api.get("/appointments/my-appointments");
  return response.data;
};

// Owner: Book
export const bookAppointment = async (appointmentData) => {
  try {
    const response = await api.post("/appointments", appointmentData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; 
    }
    throw new Error("Booking failed. Please try again.");
  }
};

export default api;
