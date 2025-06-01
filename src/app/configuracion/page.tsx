'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

interface GameResult {
  name: string;
  email: string;
  time: string;
  score: number;
  clicks: number;
}

interface Usuario {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function Usuarios() {
  const router = useRouter();

  const [games, setGames] = useState<GameResult[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [currentUserPassword, setCurrentUserPassword] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  useEffect(() => {
    // Cargo partidas
    const storedGames = localStorage.getItem('games');
    if (storedGames) {
      setGames(JSON.parse(storedGames));
    }

    // Cargo todos los usuarios
    const storedUsuarios = localStorage.getItem('usuarios');
    if (storedUsuarios) {
      setUsuarios(JSON.parse(storedUsuarios));
    }

    // Cargo usuario logueado (solo email y name)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj?.email) {
          setCurrentUserEmail(userObj.email);

          // Buscar contraseña del usuario actual en la lista de usuarios
          if (storedUsuarios) {
            const usuariosArr: Usuario[] = JSON.parse(storedUsuarios);
            const usuarioActual = usuariosArr.find(u => u.email === userObj.email);
            if (usuarioActual) {
              setCurrentUserPassword(usuarioActual.password);
            }
          }
        }
      } catch (e) {
        console.error('Error al parsear usuario actual:', e);
      }
    }
  }, []);

  // Lista de emails únicos para mostrar, sacada de los usuarios, no de juegos
  const uniqueUsers = Array.from(new Set(usuarios.map(u => u.email)));

  const deleteUser = (email: string) => {
    if (email !== currentUserEmail) {
      alert('❌ Solo puedes borrar tu propio usuario.');
      return;
    }

    const confirmPassword = prompt(`Introduce la contraseña de ${email} para borrar el usuario:`);

    if (confirmPassword && confirmPassword === currentUserPassword) {
      // Eliminar partidas asociadas a ese usuario
      const updatedGames = games.filter(g => g.email !== email);
      localStorage.setItem('games', JSON.stringify(updatedGames));
      setGames(updatedGames);

      // Eliminar usuario de la lista de usuarios
      const updatedUsuarios = usuarios.filter(u => u.email !== email);
      localStorage.setItem('usuarios', JSON.stringify(updatedUsuarios));
      setUsuarios(updatedUsuarios);

      if (selectedUser === email) setSelectedUser(null);
      alert(`Usuario ${email} eliminado.`);

      // Eliminar usuario logueado para simular logout
      localStorage.removeItem('user');
      router.push('/login'); // Cambia '/login' si tu ruta es otra
    } else {
      alert('❌ Contraseña incorrecta. No se ha borrado el usuario.');
    }
  };

  const goToMyProfile = () => {
    if (currentUserEmail) {
      router.push('/mispartidas');
    } else {
      alert('⚠️ Debes estar logueado para ver tu perfil.');
    }
  };

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

      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={goToMyProfile}>
          🔐 Mis Partidas
        </button>
      </div>

      <div className="row g-4 justify-content-center">
        {uniqueUsers.map(email => (
          <div key={email} className="col-sm-6 col-md-4 col-lg-3 position-relative">
            <div
              className={`card text-center h-100 shadow-lg ${email === currentUserEmail ? 'text-bg-light' : 'text-bg-secondary'}`}
              onClick={() => setSelectedUser(email)}
              style={{ cursor: 'pointer', borderRadius: '1rem' }}
            >
              {email === currentUserEmail && (
                <button
                  className="btn btn-danger btn-sm position-absolute"
                  style={{ top: '10px', left: '10px', zIndex: 1 }}
                  onClick={e => {
                    e.stopPropagation();
                    deleteUser(email);
                  }}
                >
                  🗑
                </button>
              )}

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
    </div>
  );
}
