'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

interface GameResult {
  name: string;
  email: string;
  time: string; // formato "MM:SS"
  score: number;
  clicks: number;
}

type SortField = 'time' | 'score' | 'clicks' | 'email';
type SortOrder = 'asc' | 'desc';

export default function MisPartidas() {
  const [games, setGames] = useState<GameResult[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('time');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('⚠️ Debes iniciar sesión para ver tus partidas.');
      router.push('/login');
      return;
    }

    const user = JSON.parse(userStr);
    setUserEmail(user.email);

    const stored = localStorage.getItem('games');
    if (stored) {
      const allGames: GameResult[] = JSON.parse(stored);
      const userGames = allGames.filter((g) => g.email === user.email);
      setGames(userGames);
    }
  }, [router]);

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

  const handleDelete = (index: number) => {
    if (!userEmail) return;

    const allGames = JSON.parse(localStorage.getItem('games') || '[]');
    const userGames = allGames.filter((g: GameResult) => g.email === userEmail);
    userGames.splice(index, 1);

    const remainingGames = allGames.filter((g: GameResult) => g.email !== userEmail);
    const updatedAllGames = [...remainingGames, ...userGames];

    localStorage.setItem('games', JSON.stringify(updatedAllGames));
    setGames(userGames);
  };

  const sortedGames = sortGames(games, sortField, sortOrder);

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return '↕️';
    return sortOrder === 'asc' ? '⬆️' : '⬇️';
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">📜 Mis Partidas</h2>

      {sortedGames.length === 0 ? (
        <p className="text-center">No tienes partidas guardadas aún.</p>
      ) : (
        <table className="table table-hover table-bordered text-center shadow">
          <thead className="table-dark">
            <tr>
              <th
                onClick={() => handleSort('email')}
                style={{ cursor: 'pointer', color: sortField === 'email' ? '#A7FF00' : undefined }}
              >
                Email {renderSortIcon('email')}
              </th>
              <th
                onClick={() => handleSort('time')}
                style={{ cursor: 'pointer', color: sortField === 'time' ? '#A7FF00' : undefined }}
              >
                Tiempo {renderSortIcon('time')}
              </th>
              <th
                onClick={() => handleSort('score')}
                style={{ cursor: 'pointer', color: sortField === 'score' ? '#A7FF00' : undefined }}
              >
                Puntuación {renderSortIcon('score')}
              </th>
              <th
                onClick={() => handleSort('clicks')}
                style={{ cursor: 'pointer', color: sortField === 'clicks' ? '#A7FF00' : undefined }}
              >
                Clicks {renderSortIcon('clicks')}
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedGames.map((game, index) => (
              <tr key={index}>
                <td>{game.email}</td>
                <td>{game.time}</td>
                <td>{game.score}</td>
                <td>{game.clicks}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    🗑️ Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
