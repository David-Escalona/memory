'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold">Proyecto MEMORY</h1>
        <p className="lead">
          Este proyecto consiste en un juego de memoria donde los jugadores deben encontrar pares de cartas iguales.
        </p>
      </div>

      <div className="d-flex justify-content-center">
        <img 
          src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2025/01/pokemon-tcg-pocket-4288422.jpg?tf=3840x" 
          alt="Memory" 
          className="img-fluid rounded shadow" 
          style={{ maxWidth: '600px', height: 'auto' }}
        />
      </div>
    </div>
  );
}
