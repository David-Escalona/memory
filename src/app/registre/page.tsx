'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Les contrasenyes no coincideixen');
      return;
    }
    console.log('Registrar amb:', { email, password });
    // Aquí podries enviar-ho a una API de registre
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow"
        style={{ minWidth: '300px' }}
      >
        <h4 className="mb-3 text-center">Registra't</h4>
        <div className="mb-3">
          <label className="form-label">Correu electrònic</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contrasenya</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Repeteix contrasenya</label>
          <input
            type="password"
            className="form-control"
            required
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Registrar-se
        </button>
      </form>
    </div>
  );
}
