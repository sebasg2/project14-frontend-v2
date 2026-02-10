import React, { useState } from 'react';

const API_URL =
  process.env.REACT_APP_API_URL || "https://project14-backend.onrender.com";

function PasswordPage({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // For image zoom

  const submitPassword = async () => {
    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError('Contraseña incorrecta... no eres la paty!');
        return;
      }

      localStorage.setItem('shared_password', password);
      onSuccess();

    } catch {
      setError('El backend esta funcionando mal :(');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-page">
      {/* --- EXPANDED IMAGE OVERLAY --- */}
      {isExpanded && (
        <div 
          onClick={() => setIsExpanded(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
            padding: '20px'
          }}
        >
          <img
            src="/images/grafico_panquequita.png"
            alt="Expanded view"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              border: '3px solid #fff',
              borderRadius: '8px',
              boxShadow: '0 0 30px rgba(0,0,0,0.5)',
              imageRendering: 'pixelated'
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: '40px',
            color: 'white',
            fontFamily: 'monospace',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '5px 15px',
            borderRadius: '20px'
          }}>
            Click para cerrar
          </div>
        </div>
      )}

      <div className="password-card">
        <h1 className="password-title">
          Pon la contraseña secreta
        </h1>
        <p className="password-subtitle">
          Detrás de escenas
        </p>

        {/* Visual block */}
        <div className="password-media">
          <img
            src="/images/grafico_panquequita.png"
            alt="Architecture diagram"
            className="password-image"
            onClick={() => setIsExpanded(true)}
            style={{ 
              cursor: 'zoom-in',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />

          <video
            className="password-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://res.cloudinary.com/dfwlff17n/video/upload/q_auto,f_auto/v1770681095/video_panquequita_efejuf.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Form */}
        <div className="password-form">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Secreto aqui!"
          />

          <button onClick={submitPassword} disabled={loading}>
            {loading ? 'Verificando..' : 'Enter'}
          </button>
        </div>

        {error && <p className="password-error">{error}</p>}
      </div>
    </div>
  );
}

export default PasswordPage;