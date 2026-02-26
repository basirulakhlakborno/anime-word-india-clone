import React from 'react';
import './TelegramModal.css';

const TELEGRAM_LINK = 'https://t.me/+eFG0xD8AYd9mNjY1';

export default function TelegramModal({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="telegram-modal-bg">
      <div className="telegram-modal-content premium-anime" style={{padding:'2.5rem 2rem', minWidth:'320px', position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute', top:'10px', right:'10px', background:'none', border:'none', color:'#f5f5f5', fontSize:'24px', cursor:'pointer', fontWeight:'bold'}}>×</button>
        <img src="https://telegram.org/img/t_logo.png" alt="Telegram" className="telegram-icon" />
        <div style={{margin:'1.2rem 0 2rem 0'}}>
          <span style={{fontSize:'1.25rem',fontWeight:600,letterSpacing:'0.5px',color:'#fff'}}>Join our Telegram</span>
        </div>
        <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="telegram-link-btn" style={{display:'inline-block',marginBottom:'1.5rem',fontSize:'1.1rem',padding:'0.7rem 2.2rem',borderRadius:'12px',background:'#229ED9',color:'#fff',fontWeight:600,boxShadow:'0 2px 8px rgba(34,158,217,0.15)',textDecoration:'none',transition:'background 0.2s'}}>
          <span style={{verticalAlign:'middle'}}>Join</span>
        </a>
      </div>
    </div>
  );
}
