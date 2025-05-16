'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Header() {
  const router = useRouter();

  return (
    <header className="bg-white shadow-sm sticky-top border-bottom">
      <div className="container-fluid px-4 py-2">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link href="/" className="navbar-brand fw-bold text-primary fs-4">
            David Escalona García
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-2">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => router.push('/home')}
                >
                  🏠 Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={() => router.push('/juego')}
                >
                  🎮 Juego
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => router.push('/acerca')}
                >
                  ℹ️ Acerca
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => router.push('/login')}
                >
                  🔑 Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => router.push('/registre')}
                >
                  📝 Registro
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
