import React, { useState, useRef, useEffect } from 'react';
import API_BASE_URL from '../services/api';

// Simple markdown to HTML converter for bold, lists, and newlines
function formatMarkdown(text) {
    if (!text) return '';
    let html = text
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // bold
        .replace(/\n\n/g, '<br/><br/>') // double newline to paragraph
        .replace(/\n/g, '<br/>') // single newline to <br>
        .replace(/\* (.*?)(?=<br>|$)/g, '<li>$1</li>'); // bullet points
    // Wrap <li> in <ul> if any
    if (html.includes('<li>')) html = html.replace(/(<li>[\s\S]*<\/li>)/g, '<ul>$1</ul>');
    return html;
}

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am your Movie AI. Ask me for movie recommendations by genre, actor, year, or anything else!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatEndRef = useRef(null);

    const sendMessage = async () => {
        if (!input.trim()) return;
        setLoading(true);
        const userMessage = { role: 'user', content: input };
        setMessages(msgs => [...msgs, userMessage]);
        setInput('');
        try {
            const res = await fetch(`${API_BASE_URL}/chatbot/recommend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });
            const data = await res.json();
            setMessages(msgs => [...msgs, { role: 'assistant', content: data.reply }]);
        } catch {
            setMessages(msgs => [...msgs, { role: 'assistant', content: 'Sorry, I could not get a recommendation.' }]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div style={{
            width: 340,
            minHeight: 420,
            maxHeight: 600,
            background: '#181818',
            borderRadius: 12,
            padding: 16,
            color: '#fff',
            boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
            position: 'sticky',
            top: 32,
            right: 0,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 10,
        }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0af' }}>🎬 Movie AI Chatbot</h3>
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 12, background: '#222', borderRadius: 8, padding: 8 }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ margin: '8px 0', color: msg.role === 'user' ? '#0af' : '#fff', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
                        <b>{msg.role === 'user' ? 'You' : 'AI'}:</b>{' '}
                        {msg.role === 'assistant' ? (
                            <span dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }} />
                        ) : (
                            msg.content
                        )}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' ? sendMessage() : undefined}
                    style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #444', background: '#333', color: '#fff' }}
                    placeholder="Ask for a movie..."
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ padding: '8px 16px', borderRadius: 4, border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}>
                    {loading ? '...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default Chatbot; 