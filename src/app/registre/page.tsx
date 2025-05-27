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
    const password_confirmation = password;
    const role = "user";

    if (!nombre || !email || !password) {
      setMensaje("Por favor, completa todos los campos.");
      setTipoMensaje("error");
      return;
    }

    async function registerUser() {
      try {
        const url = "https://soothing-magic-production.up.railway.app/api/register";
        const respuesta = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nombre,
            email,
            role,
            password,
            password_confirmation,
          }),
        });

        const respuestaJson = await respuesta.json();

        if (!respuesta.ok) {
          const error = respuestaJson?.message || "Error al registrar el usuario.";
          setMensaje(`❌ ${error}`);
          setTipoMensaje("error");
          return;
        }

        setMensaje("✅ Usuario registrado correctamente. Redirigiendo al login...");
        setTipoMensaje("success");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);

      } catch (error) {
        setMensaje("❌ Error de conexión con el servidor.");
        setTipoMensaje("error");
      }
    }

    registerUser();
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
        backgroundRepeat: 'no-repeat',
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
        <h2 className="text-center mb-4 text-primary">Registro</h2>

        {mensaje && (
          <div className={`alert ${tipoMensaje === "error" ? "alert-danger" : "alert-success"}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
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
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
