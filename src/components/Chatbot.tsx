import React, { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          backgroundColor: '#ab4e68',
          color: '#fffbf2',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        }}
        aria-label="Open chatbot"
      >
        {isOpen ? (
          <span className="text-2xl">✕</span>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 flex h-96 w-80 flex-col rounded-2xl shadow-2xl"
          style={{
            backgroundColor: '#fffbf2',
            border: '1px solid #c4a287',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between rounded-t-2xl px-4 py-3"
            style={{ backgroundColor: '#7e1946' }}
          >
            <h3 className="text-sm font-semibold" style={{ color: '#fffbf2' }}>
              Chat with Artea
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80"
              aria-label="Close chatbot"
            >
              <span className="text-lg">✕</span>
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3">
            <div className="space-y-3">
              <div className="rounded-lg px-3 py-2" style={{ backgroundColor: 'rgba(171, 78, 104, 0.1)' }}>
                <p className="text-xs" style={{ color: '#4b4453' }}>
                  Hi! I'm here to help answer questions about speaking engagements, topics, or collaborations.
                </p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t px-4 py-3" style={{ borderColor: '#c4a287' }}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: '#c4a287' }}
              />
              <button
                className="rounded-lg px-4 py-2 text-sm font-medium text-white"
                style={{ backgroundColor: '#ab4e68' }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

