'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const userObj = JSON.parse(storedUser);
          setUserName(userObj.name || userObj.email); // Usa el nombre si existe, si no el email
        } catch (e) {
          console.error('Error al parsear usuario:', e);
        }
      }
    }
  }, []);

  const handleMisPartidasClick = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Debes iniciar sesión para ver tus partidas.');
      router.push('/login');
      return;
    }
    router.push('/mispartidas');
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        fontFamily: "'Comfortaa', cursive",
      }}
    >
      {/* Fondo */}
      <div
        style={{
          backgroundImage:
            'url(https://i.pinimg.com/originals/d7/4f/fd/d74ffd0c117cde7d1532de5bb81570f0.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: -1,
        }}
      />

      {/* Contenido */}
      <div
        className="d-flex flex-column align-items-center justify-content-center min-vh-100 px-4"
        style={{
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          className="mb-4 fw-bold"
          style={{
            fontSize: '3.5rem',
            color: '#A7FF00',
            textShadow:
              '0 0 1px #A7FF00, 0 0 16px #85D700, 0 0 24px #6CBD00, 0 0 32px rgb(0, 0, 0), 0 0 48px rgb(245, 245, 245)',
            letterSpacing: '0.15em',
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          Proyecto MEMORY
        </h1>

        <p className="mb-5 fs-5" style={{ maxWidth: '600px', lineHeight: '1.6', color: '#EEE' }}>
          Esto es un juego de cartas en el que los jugadores intentan encontrar pares de cartas
          iguales dándoles la vuelta. El juego requiere memoria y estrategia, ya que los jugadores
          aprenden dónde se encuentran las cartas para encontrar las parejas.
        </p>

        <div className="d-flex gap-4 flex-wrap justify-content-center">
          <button
            onClick={() => router.push('/juego')}
            className="btn btn-light btn-lg px-5 py-3 fw-bold shadow-sm"
            style={{
              borderRadius: '50px',
              letterSpacing: '1.5px',
              color: '#333',
              backgroundColor: '#E0FFC1',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#C1FF80';
              e.currentTarget.style.color = '#1A1A1A';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#E0FFC1';
              e.currentTarget.style.color = '#333';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🎮 Jugar
          </button>

          <button
            onClick={handleMisPartidasClick}
            className="btn btn-outline-light btn-lg px-5 py-3 fw-bold shadow-sm"
            style={{
              borderRadius: '50px',
              letterSpacing: '1.5px',
              color: '#E0FFC1',
              borderColor: '#E0FFC1',
              backgroundColor: 'transparent',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#E0FFC1';
              e.currentTarget.style.color = '#1A1A1A';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#E0FFC1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            📜 Mis Partidas
          </button>
        </div>
      </div>
    </div>
  );
}
