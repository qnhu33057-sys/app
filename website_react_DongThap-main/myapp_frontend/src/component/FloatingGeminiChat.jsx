// src/FloatingGeminiChat.jsx
import React, { useState, useRef, useEffect } from "react";
import "../assets/css/FloatingGeminiChat.css";

export default function FloatingGeminiChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Xin chào 👋! Tôi là AI, bạn cần gì?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMsgs = [...messages, { role: "user", content: input }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await resp.json();
      console.log("Gemini response:", data);

      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        data?.error?.message ||
        "❌ Không nhận được phản hồi từ AI.";

      setMessages([...newMsgs, { role: "assistant", content: aiText }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMsgs, { role: "assistant", content: "❌ Có lỗi xảy ra." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="floating-btn">
      {/* Nút Chat AI */}
      <div className="fixed right-4 top-1/3 flex flex-col gap-4 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Mở chat AI"
          className="w-12 h-12 flex items-center justify-center bg-green-500 rounded-full shadow-lg hover:scale-110 transition"
        >
      <img src="https://cdn-icons-png.flaticon.com/128/2814/2814666.png" 
       alt="AI" 
       style={{ width: "1.5rem", height: "1.5rem" }}/>
        </button>
      </div>

      {/* Chatbox AI */}
      {isChatOpen && (
        <div className={`floating-chatbox ${isChatOpen ? "open" : ""}`}>
  <div className="chat-header">
    Chat với AI
    <button onClick={() => setIsChatOpen(false)}>✖</button>
  </div>
  <div className="chat-messages">
    {messages.map((m, i) => (
      <div key={i} className={`chat-message ${m.role}`}>
        {m.content}
      </div>
    ))}
    {loading && <div className="italic text-gray-500">Đang gửi...</div>}
    <div ref={messagesEndRef} />
  </div>
  <div className="chat-input">
    <input
      type="text"
      placeholder="Nhập tin nhắn..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
    />
    <button onClick={handleSend} disabled={loading || !input.trim()}>
      Gửi
    </button>
  </div>
</div>

      )}
    </div>
  );
}
