'use client';

import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"error" | "success" | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !email || !password) {
      setMensaje("Por favor, completa todos los campos.");
      setTipoMensaje("error");
      return;
    }

    const usuariosRaw = localStorage.getItem("usuarios");
    const usuarios = usuariosRaw ? JSON.parse(usuariosRaw) : [];

    const yaExiste = usuarios.find((u: any) => u.email === email);
    if (yaExiste) {
      setMensaje("❌ Ya existe un usuario con ese correo.");
      setTipoMensaje("error");
      return;
    }

    const nuevoUsuario = { name: nombre, email, password, role: "user" };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setMensaje("✅ Usuario registrado correctamente. Redirigiendo al login...");
    setTipoMensaje("success");

    setTimeout(() => {
      window.location.href = "/login";
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
        <h2 className="text-center mb-4 text-primary">Registro</h2>

        {mensaje && <div className={`alert ${tipoMensaje === "error" ? "alert-danger" : "alert-success"}`}>{mensaje}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">Registrar</button>
        </form>
      </div>
    </div>
  );
}
