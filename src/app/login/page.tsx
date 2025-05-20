'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const getUsers = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('users');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  };

  const [users] = useState(getUsers());
  const [userOrEmail, setUserOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(
      (u: any) =>
        (u.email === userOrEmail || u.username === userOrEmail) &&
        u.password === password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setMessage('Login correcto, redirigiendo...');
      setTimeout(() => router.push('/home'), 1000);
    } else {
      setMessage('Usuario/Email o contraseña incorrectos');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Usuario o Email</label>
          <input
            type="text"
            className="form-control"
            value={userOrEmail}
            onChange={e => setUserOrEmail(e.target.value)}
            placeholder="Usuario o email"
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
          Iniciar sesión
        </button>
      </form>
      {message && <div className="mt-3 alert alert-warning">{message}</div>}
    </div>
  );
}
