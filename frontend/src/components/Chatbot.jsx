import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import Loader from "./Loader"; 

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      type: "text",
      text: "Hi 👋 I am HappyPaws AI. Tell me about your pet (e.g., 'My dog is 12 years old and limping')."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", type: "text", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: input }) 
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);
      const data = await response.json();

      const botMsg = {
        from: "bot",
        type: "analysis",
        data: {
          disease: data.disease,
          confidence: data.confidence,
          vet: data.recommendedVet,
          age: data.extracted_info.age,
          weight: data.extracted_info.current_weight_kg
        }
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [
        ...prev,
        { from: "bot", type: "text", text: "❌ Connection Failed. Ensure 'python app.py' is running on Port 5000." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ BUTTON & TOOLTIP WRAPPER */}
      {!open && (
        <div className="chat-widget-wrapper">
          {/* The Pop-up Text */}
          <div className="chat-tooltip">Need Help?</div>

          {/* The Round Button */}
          <button className="chat-toggle-btn" onClick={() => setOpen(true)}>
            <img 
              src="/logo.png" 
              alt="AI" 
              className="chat-logo"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </button>
        </div>
      )}

      {open && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: "5px" }}>
                 <img src="/logo.png" alt="HappyPaws" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <div className="header-title">
                <h3>HappyPaws AI</h3>
                <span className="online-status"><span className="status-dot"></span> Online</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#b0b3b8", fontSize: "20px", cursor: "pointer" }}>✖</button>
          </div>

          {/* Messages */}
          <div className="chat-messages chat-scroll">
            {messages.map((m, i) => (
              <div key={i} className={`msg-container ${m.from}`}>
                {m.type === "text" && <div className={`msg-bubble ${m.from}`}>{m.text}</div>}
                
                {m.type === "analysis" && (
                  <div className="analysis-card">
                    <div className="ac-header"><span className="ac-icon">🩺</span><span className="ac-title">{m.data.disease}</span></div>
                    <div className="ac-body">
                      <div className="ac-section">
                        <div className="ac-row"><span className="ac-label">Confidence</span><span className="ac-value" style={{ color: '#2ecc71' }}>{m.data.confidence}%</span></div>
                        <div className="confidence-track"><div className="confidence-fill" style={{ width: `${m.data.confidence}%` }}></div></div>
                      </div>
                      <div className="ac-section">
                         <div className="ac-row"><span className="ac-label">Specialist</span></div>
                         <div className="vet-box"><span className="vet-icon">👨‍⚕️</span><span className="ac-value">{m.data.vet}</span></div>
                      </div>
                    </div>
                    {(m.data.age !== "Unknown" || m.data.weight !== "Unknown") && (
                      <div className="ac-footer">
                        {m.data.age !== "Unknown" && <div className="data-tag"><span>🎂</span> Age: {m.data.age}</div>}
                        {m.data.weight !== "Unknown" && <div className="data-tag"><span>⚖️</span> {m.data.weight}kg</div>}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="typing" style={{ background: "transparent", padding: 0 }}><Loader type="mini" /></div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <input className="chat-input" value={input} onChange={e => setInput(e.target.value)} placeholder="Describe symptoms..." onKeyDown={e => e.key === "Enter" && sendMessage()} />
            <button className="send-btn" onClick={sendMessage} disabled={loading}>➤</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;