'use client';

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface GameResult {
  name: string;
  email: string;
  time: string;
  score: number;
  clicks: number;
}

export default function Usuarios() {
  const [games, setGames] = useState<GameResult[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('games');
    if (stored) {
      setGames(JSON.parse(stored));
    }
  }, []);

  const uniqueUsers = Array.from(new Set(games.map((g) => g.email)));

  const userGames = selectedUser ? games.filter((g) => g.email === selectedUser) : [];

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: "'Comfortaa', cursive",
    }}>
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
          zIndex: -2,
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
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: -1,
        }}
      />

      <h2 className="text-center text-white mb-4">👥 Jugadores</h2>

      <div className="row g-4 justify-content-center">
        {uniqueUsers.map((email) => (
          <div key={email} className="col-sm-6 col-md-4 col-lg-3">
            <div
              className="card text-center text-bg-light h-100 shadow-lg"
              onClick={() => setSelectedUser(email)}
              style={{ cursor: 'pointer', borderRadius: '1rem' }}
            >
              <img
                src="https://www.svgrepo.com/show/382106/user-avatar.svg"
                alt="Avatar"
                className="card-img-top p-4"
                style={{ height: '200px', objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title">{email}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="mt-5">
          <h3 className="text-white text-center mb-4">🧾 Partidas de {selectedUser}</h3>
          <div className="row g-4 justify-content-center">
            {userGames.map((game, idx) => (
              <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm text-bg-secondary" style={{ borderRadius: '1rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">Tiempo: {game.time}</h5>
                    <p className="card-text mb-1">Puntuación: {game.score}</p>
                    <p className="card-text">Clicks: {game.clicks}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
