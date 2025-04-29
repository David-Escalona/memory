// app/layout.tsx

import React from 'react';
import { Header } from './componentes/Header'; // Ruta correcta al Header
import { Main } from './componentes/Main'; // Ruta correcta al Main
import 'bootstrap/dist/css/bootstrap.min.css'; // Estils globals de Bootstrap

export default function RootLayout() {
  return (
    <html lang="es">
      <body>
        <Header />
        <Main />
      </body>
    </html>
  );
}
