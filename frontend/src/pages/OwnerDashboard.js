import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { getMyPets, getAllVisits, getMyAppointments } from "../services/api"; //
import "./OwnerDashboard.css";
import Loader from "../components/Loader"; 

// --- SVG ICONS ---
const CalendarIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const ClockIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const PlusIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;
const PawIcon = () => <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"/></svg>;
const CheckCircleIcon = () => <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [recent, setRecent] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showAllHistory, setShowAllHistory] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // ✅ 1. PARALLEL FETCHING (Faster)
      // We start all requests at the same time instead of waiting for one by one
      const [myPets, allVisits, myAppointments] = await Promise.all([
          getMyPets(),
          getAllVisits(),
          getMyAppointments()
      ]);

      setPets(myPets);
      const myPetIds = myPets.map(p => p.id);

      // Process Visits
      const myVisits = allVisits.filter(v => {
          const pId = v.pet?.id || v.pet_id || v.petId;
          return myPetIds.includes(parseInt(pId));
      });
      myVisits.sort((a, b) => new Date(b.visitDate || b.visit_date) - new Date(a.visitDate || a.visit_date));
      setRecent(myVisits);

      // Process Appointments
      const today = new Date();
      today.setHours(0,0,0,0); 

      const futureApps = myAppointments.filter(app => new Date(app.date) >= today);
      futureApps.sort((a, b) => new Date(a.date) - new Date(b.date));
      setUpcoming(futureApps);

      // 4. Graph Data
      const monthCounts = {};
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const monthKey = d.toLocaleString('default', { month: 'short' });
        monthCounts[monthKey] = 0;
      }

      myVisits.forEach(visit => {
        const vDate = new Date(visit.visitDate || visit.visit_date);
        const monthKey = vDate.toLocaleString('default', { month: 'short' });
        if (monthCounts.hasOwnProperty(monthKey)) {
            monthCounts[monthKey] += 1;
        }
      });

      const chartData = Object.keys(monthCounts).map(key => ({
        name: key,
        visits: monthCounts[key]
      }));
      setGraphData(chartData);

    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      // 🚀 INSTANT UNLOAD: No setTimeout here!
      setLoading(false); 
    }
  };

  const getPetName = (item) => {
    const pId = item.pet?.id || item.pet_id || item.petId;
    const pet = pets.find(p => p.id === parseInt(pId));
    return pet ? pet.name : "Unknown Pet";
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(':');
    const h = parseInt(hour);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minute} ${ampm}`;
  };

  if (loading) return <Loader type="fullscreen" />;

  const historyDisplay = showAllHistory ? recent : recent.slice(0, 4);

  return (
    <div className="dashboard-container">
      
      {/* 1. TOP HEADER */}
      <div className="dashboard-header">
        <div>
            <h1>Overview</h1>
            <p>Welcome back! Here is your pet care summary.</p>
        </div>
        <button className="btn-book-app" onClick={() => navigate("/book-appointment")}>
            <PlusIcon /> Book Appointment
        </button>
      </div>

      {/* 2. STATS CARDS */}
      <div className="stats-row">
        <div className="stat-card">
            <div className="stat-icon purple"><PawIcon /></div>
            <div className="stat-info">
                <h3>{pets.length}</h3>
                <p>My Pets</p>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon orange"><CalendarIcon /></div>
            <div className="stat-info">
                <h3>{upcoming.length}</h3>
                <p>Upcoming</p>
            </div>
        </div>
        <div className="stat-card">
            <div className="stat-icon green"><CheckCircleIcon /></div>
            <div className="stat-info">
                <h3>{recent.length}</h3>
                <p>Completed</p>
            </div>
        </div>
      </div>

      <div className="dashboard-grid-layout">
        
        {/* 3. LEFT COLUMN */}
        <div className="left-panel">
            
            {/* GRAPH */}
            <div className="graph-card">
                <h3>Visit Activity (6 Months)</h3>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={graphData}>
                            <defs>
                                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#151a25', border: '1px solid #333', borderRadius: '8px'}} 
                                itemStyle={{color: '#fff'}}
                            />
                            <Area type="monotone" dataKey="visits" stroke="#3498db" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* RECENT HISTORY */}
            <div className="history-card">
                <div className="card-header-row">
                    <h3>Recent History</h3>
                    <button 
                        className="btn-link" 
                        onClick={() => setShowAllHistory(!showAllHistory)}
                    >
                        {showAllHistory ? "Show Less" : "View All"}
                    </button>
                </div>
                <div className="list-container">
                    {recent.length === 0 ? (
                        <p className="no-data">No past appointments found.</p>
                    ) : (
                        historyDisplay.map(visit => (
                            <div key={visit.id} className="list-item">
                                <div className="item-date">
                                    <span className="day">{new Date(visit.visitDate || visit.visit_date).getDate()}</span>
                                    <span className="month">{new Date(visit.visitDate || visit.visit_date).toLocaleString('default', { month: 'short' })}</span>
                                </div>
                                <div className="item-details">
                                    <h4>{visit.visitType || "Checkup"}</h4>
                                    <p>{getPetName(visit)} • {visit.diagnosis || "Routine Visit"}</p>
                                </div>
                                <span className="status-badge completed">Done</span>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>

        {/* 4. RIGHT COLUMN */}
        <div className="right-panel">
            <div className="schedule-card">
                <h3>Scheduled Appointments</h3>
                <div className="schedule-list">
                    {upcoming.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon" style={{color: '#333'}}><CalendarIcon /></div>
                            <p>No upcoming appointments.</p>
                            <button className="btn-small" onClick={() => navigate("/book-appointment")}>Book Now</button>
                        </div>
                    ) : (
                        upcoming.map(app => (
                            <div key={app.id} className="schedule-item">
                                <div className="schedule-header">
                                    <span className="pet-name-tag">{getPetName(app)}</span>
                                    <span className="schedule-time">
                                        <ClockIcon /> {formatTime(app.time)}
                                    </span>
                                </div>
                                <h4>{app.reason || "General Checkup"}</h4>
                                <div className="schedule-date">
                                    <CalendarIcon /> {new Date(app.date).toDateString()}
                                </div>
                                <div className="schedule-actions">
                                    <button className="btn-reschedule">Reschedule</button>
                                    <button className="btn-cancel">Cancel</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default OwnerDashboard;