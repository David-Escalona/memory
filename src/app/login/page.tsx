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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje('Por favor, completa todos los campos.');
      setTipoMensaje('error');
      return;
    }

    const usuariosRaw = localStorage.getItem("usuarios");
    const usuarios = usuariosRaw ? JSON.parse(usuariosRaw) : [];

    const usuario = usuarios.find((u: any) => u.email === email && u.password === password);

    if (!usuario) {
      setMensaje("❌ Credenciales incorrectas.");
      setTipoMensaje("error");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name: usuario.name, email: usuario.email }));
    setMensaje("✅ Inicio de sesión exitoso. Redirigiendo...");
    setTipoMensaje("success");

    setTimeout(() => {
      router.push("/home");
    }, 2000);
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center px-3" style={{
      backgroundImage: "url('https://img.freepik.com/foto-gratis/paisaje-natural-cielo-despejado-estrellado_23-2151683193.jpg?semt=ais_hybrid&w=740')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      fontFamily: "'Comfortaa', cursive",
    }}>
      <div className="bg-white p-4 rounded-4 shadow w-100" style={{ maxWidth: 420, backdropFilter: "blur(2px)", backgroundColor: "rgba(255, 255, 255, 0.85)" }}>
        <h2 className="text-center mb-4 text-primary">Iniciar sesión</h2>

        {mensaje && <div className={`alert ${tipoMensaje === "error" ? "alert-danger" : "alert-success"}`}>{mensaje}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}
