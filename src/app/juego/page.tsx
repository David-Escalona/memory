'use client';

import { TarjetaGrid } from '../componentes/tarjeta';
import { ClicsProvider } from '../componentes/clic';

export default function Juego() {
  return (
    <ClicsProvider>
      <TarjetaGrid />
    </ClicsProvider>
  );
}
