import React, { useState, useEffect, useRef } from 'react';

export default function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'eren', text: "Hi! I'm Eren. Naveen is currently busy building awesome things. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate Eren's reply logic
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('contact') || lowerInput.includes('mail') || lowerInput.includes('email') || lowerInput.includes('help')) {
        setMessages(prev => [...prev, { 
          sender: 'eren', 
          isHtml: true,
          text: "You can reach Naveen directly here: <a href='mailto:naveenramu161@gmail.com' class='text-red-400 underline hover:text-white transition-colors'>naveenramu161@gmail.com</a>" 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          sender: 'eren', 
          text: "I'm opening your email app so you can send this message directly to Naveen! 🚀" 
        }]);
        
        // Open the user's email client with the message pre-filled
        setTimeout(() => {
          window.location.href = `mailto:naveenramu161@gmail.com?subject=Portfolio Chat Message&body=${encodeURIComponent(input)}`;
        }, 1500);
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900/40 to-black/40 px-4 py-3 flex justify-between items-center border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/50">
            <span className="text-red-400 font-bold text-sm">E</span>
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">Eren</h3>
            <span className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse"></span> Online
            </span>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 h-80 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-white text-black self-end rounded-br-sm font-medium' : 'bg-white/10 text-gray-200 self-start rounded-tl-sm border border-white/5'}`}>
            {msg.isHtml ? <span dangerouslySetInnerHTML={{ __html: msg.text }} /> : msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..." 
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
        />
        <button type="submit" disabled={!input.trim()} className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-x-[-1px] translate-y-[1px]"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  );
}
