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
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmingUserDelete, setConfirmingUserDelete] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('games');
    if (stored) {
      setGames(JSON.parse(stored));
    }
  }, []);

  const uniqueUsers = Array.from(new Set(games.map((g) => g.email)));
  const userGames = selectedUser ? games.filter((g) => g.email === selectedUser) : [];

  const deleteUser = (email: string) => {
    const confirmEmail = prompt(`Introduce la contraseña de ${email} para borrar el usuario:`);

    if (confirmEmail && confirmEmail === email) {
      const updatedGames = games.filter((g) => g.email !== email);
      localStorage.setItem('games', JSON.stringify(updatedGames));
      setGames(updatedGames);
      if (selectedUser === email) setSelectedUser(null);
      alert(`Usuario ${email} eliminado.`);
    } else {
      alert('❌ Contraseña incorrecta. No se ha borrado el usuario.');
    }
  };

  const deleteGame = (index: number) => {
    if (!selectedUser) return;
    const userGameList = games.filter((g) => g.email === selectedUser);
    userGameList.splice(index, 1);
    const updatedAll = games.filter((g) => g.email !== selectedUser).concat(userGameList);
    localStorage.setItem('games', JSON.stringify(updatedAll));
    setGames(updatedAll);
  };

  const playAgain = (game: GameResult) => {
    localStorage.setItem('replay', JSON.stringify(game));
    window.location.href = '/jugar'; // Asegúrate de tener esta ruta
  };

  const sortByScore = [...userGames].sort((a, b) => b.score - a.score);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '2rem', fontFamily: "'Comfortaa', cursive" }}>
      {/* Fondo */}
      <div
        style={{
          backgroundImage: 'url(https://t4.ftcdn.net/jpg/11/29/87/69/360_F_1129876981_HkII19WOJsUHiuQj8do5MnkqbHD8RsmW.jpg)',
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
          <div key={email} className="col-sm-6 col-md-4 col-lg-3 position-relative">
            <div
              className="card text-center text-bg-light h-100 shadow-lg"
              onClick={() => setSelectedUser(email)}
              style={{ cursor: 'pointer', borderRadius: '1rem' }}
            >
              {/* Borrar icono */}
              <button
                className="btn btn-danger btn-sm position-absolute"
                style={{ top: '10px', left: '10px', zIndex: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteUser(email);
                }}
              >
                🗑
              </button>

              <img
                src="https://th.bing.com/th/id/OIP.dzZlz7vwvzOBO1J1lJ4WzQHaHa?rs=1&pid=ImgDetMain"
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
          <h3 className="text-white text-center mb-4">🏆 Clasificación de {selectedUser}</h3>
          <div className="row g-4 justify-content-center">
            {sortByScore.map((game, idx) => (
              <div key={idx} className="col-sm-6 col-md-4 col-lg-3">
                <div className="card h-100 shadow-sm text-bg-secondary position-relative" style={{ borderRadius: '1rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">Tiempo: {game.time}</h5>
                    <p className="card-text mb-1">Puntuación: {game.score}</p>
                    <p className="card-text">Clicks: {game.clicks}</p>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteGame(idx)}
                      >
                        🗑 Eliminar
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => playAgain(game)}
                      >
                        🔁 Reintentar
                      </button>
                    </div>
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
