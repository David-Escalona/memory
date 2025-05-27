'use client';

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

interface Partida {
  id: number;
  score: number;
  date: string;
  duration: string;
}

export default function Partidas() {
  const router = useRouter();
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');  // Ajusta según cómo guardes la sesión
    if (!token) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }
    setIsLoggedIn(true);

    // Aquí iría llamada real a tu API para obtener partidas del usuario
    // Simulo llamada con setTimeout:
    setTimeout(() => {
      setPartidas([
        { id: 1, score: 70, date: '2025-05-01', duration: '02:15' },
        { id: 2, score: 85, date: '2025-05-10', duration: '01:50' },
        { id: 3, score: 95, date: '2025-05-15', duration: '01:30' },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Cargando partidas...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning" role="alert">
          ⚠️ Necesitas iniciar sesión para ver tus partidas.
        </div>
        <button
          className="btn btn-primary"
          onClick={() => router.push('/login')}
        >
          🔑 Ir a Login
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center text-primary">📜 Mis Partidas</h2>
      {partidas.length === 0 ? (
        <p className="text-center text-muted">No tienes partidas jugadas todavía.</p>
      ) : (
        <table className="table table-striped shadow-sm rounded">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Puntuación</th>
              <th>Fecha</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            {partidas.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.score}</td>
                <td>{p.date}</td>
                <td>{p.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
