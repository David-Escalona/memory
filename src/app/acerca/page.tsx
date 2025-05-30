'use client';

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface GameResult {
  email: string;
  time: string;
  score: number;
  clicks: number;
}

type SortField = 'email' | 'time' | 'score' | 'clicks';
type SortOrder = 'asc' | 'desc';

export default function Clasificacion() {
  const [games, setGames] = useState<GameResult[]>([]);
  const [sortField, setSortField] = useState<SortField>('score');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    const stored = localStorage.getItem('games');
    if (stored) {
      setGames(JSON.parse(stored));
    }
  }, []);

  const sortGames = (gamesToSort: GameResult[], field: SortField, order: SortOrder): GameResult[] => {
    return [...gamesToSort].sort((a, b) => {
      let valA: number | string = a[field];
      let valB: number | string = b[field];

      if (field === 'time') {
        const toSeconds = (time: string) => {
          const [min, sec] = time.split(':').map(Number);
          return min * 60 + sec;
        };
        valA = toSeconds(a.time);
        valB = toSeconds(b.time);
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else {
        return order === 'asc' ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
      }
    });
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return '↕️';
    return sortOrder === 'asc' ? '⬆️' : '⬇️';
  };

  const sortedGames = sortGames(games, sortField, sortOrder);

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
            'url(https://t4.ftcdn.net/jpg/11/29/87/69/360_F_1129876981_HkII19WOJsUHiuQj8do5MnkqbHD8RsmW.jpg)',
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
      {/* Overlay oscuro */}
      <div
        style={{
          background: 'rgba(0,0,0,0.5)',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />

      {/* Contenido principal */}
      <div className="container mt-5 text-white">
        <h2 className="text-center mb-3">🌐 Clasificación Global</h2>
        <p className="text-center text-light mb-4">
          Los resultados son públicos. Haz clic en los encabezados para ordenarlos.
        </p>

        <div className="table-responsive shadow rounded">
          <table className="table table-hover table-bordered text-center bg-light">
            <thead className="table-dark">
              <tr>
                <th
                  onClick={() => handleSort('email')}
                  style={{ cursor: 'pointer', color: sortField === 'email' ? '#FFD700' : undefined }}
                >
                  Email {renderSortIcon('email')}
                </th>
                <th
                  onClick={() => handleSort('time')}
                  style={{ cursor: 'pointer', color: sortField === 'time' ? '#FFD700' : undefined }}
                >
                  Tiempo {renderSortIcon('time')}
                </th>
                <th
                  onClick={() => handleSort('score')}
                  style={{ cursor: 'pointer', color: sortField === 'score' ? '#FFD700' : undefined }}
                >
                  Puntuación {renderSortIcon('score')}
                </th>
                <th
                  onClick={() => handleSort('clicks')}
                  style={{ cursor: 'pointer', color: sortField === 'clicks' ? '#FFD700' : undefined }}
                >
                  Clicks {renderSortIcon('clicks')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedGames.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-muted">
                    No hay partidas registradas aún.
                  </td>
                </tr>
              ) : (
                sortedGames.map((game, index) => (
                  <tr key={index}>
                    <td>{game.email}</td>
                    <td>{game.time}</td>
                    <td>{game.score}</td>
                    <td>{game.clicks}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
