'use client';

import { TarjetaGrid } from '../componentes/tarjeta';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Juego() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <TarjetaGrid />
    </div>
  );
}
