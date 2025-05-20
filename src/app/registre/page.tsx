'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
  const router = useRouter();

  const getUsers = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('users');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  };

  const [users, setUsers] = useState(getUsers());
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !username || !password) {
      setMessage('Completa todos los campos');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Introduce un email válido');
      return;
    }

    if (users.find((u: any) => u.email === email)) {
      setMessage('El email ya está registrado');
      return;
    }

    if (users.find((u: any) => u.username === username)) {
      setMessage('El usuario ya existe');
      return;
    }

    const newUsers = [...users, { email, username, password }];
    setUsers(newUsers);
    localStorage.setItem('users', JSON.stringify(newUsers));
    setMessage('Registro exitoso! Redirigiendo a login...');
    setEmail('');
    setUsername('');
    setPassword('');

    setTimeout(() => router.push('/login'), 1500);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Registro</h2>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
          />
        </div>
        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
          />
        </div>
        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Registrar
        </button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}
