'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

interface GameResult {
  name: string;
  email: string;
  time: string; // Asumimos formato "mm:ss" o similar
  score: number;
  clicks: number;
}

type SortKey = 'time' | 'score' | 'clicks' | null;
type SortDirection = 'asc' | 'desc';

export default function MisPartidas() {
  const router = useRouter();
  const [games, setGames] = useState<GameResult[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj?.email) {
          setUserEmail(userObj.email);
        }
      } catch (e) {
        console.error('Error al leer el usuario:', e);
      }
    }

    const storedGames = localStorage.getItem('games');
    if (storedGames) {
      setGames(JSON.parse(storedGames));
    }
  }, []);

  const parseTimeToSeconds = (time: string) => {
    // Asumiendo formato mm:ss o hh:mm:ss
    const parts = time.split(':').map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
  };

  const sortedGames = () => {
    const userGames = games.filter((game) => game.email === userEmail);
    if (!sortKey) return userGames;

    return [...userGames].sort((a, b) => {
      let aVal: number | string = '';
      let bVal: number | string = '';

      switch (sortKey) {
        case 'time':
          aVal = parseTimeToSeconds(a.time);
          bVal = parseTimeToSeconds(b.time);
          break;
        case 'score':
          aVal = a.score;
          bVal = b.score;
          break;
        case 'clicks':
          aVal = a.clicks;
          bVal = b.clicks;
          break;
      }

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Cambiar dirección
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleDeleteGame = (index: number) => {
    // Solo eliminamos la partida correspondiente al usuario y la posición
    const userGames = games.filter(game => game.email === userEmail);
    const gameToDelete = userGames[index];

    const updatedGames = games.filter(game => game !== gameToDelete);
    setGames(updatedGames);
    localStorage.setItem('games', JSON.stringify(updatedGames));
  };

  const handleEditGame = (game: GameResult) => {
    localStorage.setItem('gameToReplay', JSON.stringify(game));
    router.push('/juego');
  };

  const displayedGames = sortedGames();

  return (
    <div className="container mt-5" style={{ fontFamily: "'Comfortaa', cursive" }}>
      <h2 className="text-center mb-4">
        📜 Mis Partidas {userEmail && `(${userEmail})`}
      </h2>

      {displayedGames.length === 0 ? (
        <p className="text-center">No tienes partidas guardadas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('time')}
                >
                  ⏱ Tiempo {sortKey === 'time' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('score')}
                >
                  🏆 Puntuación {sortKey === 'score' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSort('clicks')}
                >
                  🖱️ Clicks {sortKey === 'clicks' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {displayedGames.map((game, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{game.time}</td>
                  <td>{game.score}</td>
                  <td>{game.clicks}</td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEditGame(game)}
                      >
                        📝 Modificar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteGame(idx)}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

