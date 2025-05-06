'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Header() {
  const router = useRouter();

  return (
    <header className="bg-light shadow-sm sticky-top">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link href="/" className="navbar-brand">
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button type="button" onClick={() => router.push('/home')}>
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button type="button" onClick={() => router.push('/juego')}>
                  Juego
                </button>
              </li>
              <li className="nav-item">
                <button type="button" onClick={() => router.push('/acerca')}>
                  Acerca
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
