// app/layout.tsx
import { Header } from './componentes/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Proyecto Memory',
  description: 'Juego de memoria con Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
