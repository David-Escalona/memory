// app/Main.tsx (o qualsevol ruta adequada)
'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Main() {
  return (
    <div className="container mt-5">
      <h1>Proyecto MEMORY</h1>
      <p>Este proyecto consiste en un juego de memoria donde los jugadores deben encontrar pares de cartas iguales.</p>

      <div className="my-4">
          <img src="https://www.sintetia.com/wp-content/uploads/2013/09/la-liga.jpg" alt="" />
      </div>
    </div>
  );
}
