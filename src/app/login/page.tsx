'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState<"error" | "success" | "">("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje('');
    setTipoMensaje('');

    if (!email || !password) {
      setMensaje('Por favor, completa todos los campos.');
      setTipoMensaje('error');
      return;
    }

    try {
      const response = await fetch('https://soothing-magic-production.up.railway.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('DATA DEL LOGIN:', data);

      if (!response.ok) {
        setMensaje(data.message || '❌ Credenciales incorrectas.');
        setTipoMensaje('error');
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);

        // Intentamos detectar el usuario en distintas rutas posibles
        const userData = data.user || data.data?.user || {};

        const user = {
          name: userData.name || 'Usuario',
          email: userData.email || email,
        };

        localStorage.setItem('user', JSON.stringify(user));

        setMensaje('✅ Inicio de sesión exitoso. Redirigiendo...');
        setTipoMensaje('success');

        setTimeout(() => {
          router.push('/home');
        }, 2000);
      } else {
        setMensaje('No se recibió token del servidor.');
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setMensaje('❌ Error del servidor. Intenta más tarde.');
      setTipoMensaje('error');
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center px-3"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/foto-gratis/paisaje-natural-cielo-despejado-estrellado_23-2151683193.jpg?semt=ais_hybrid&w=740')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        fontFamily: "'Comfortaa', cursive",
      }}
    >
      <div
        className="bg-white p-4 rounded-4 shadow w-100"
        style={{
          maxWidth: 420,
          backdropFilter: "blur(2px)",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <h2 className="text-center mb-4 text-primary">Iniciar sesión</h2>

        {mensaje && (
          <div className={`alert ${tipoMensaje === 'error' ? 'alert-danger' : 'alert-success'}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
