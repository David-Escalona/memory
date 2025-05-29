'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        if (parsedUser?.email) {
          setUserEmail(parsedUser.email);
        } else {
          setUserEmail(null);
        }
      } catch (e) {
        console.error('Error parsing user:', e);
        setUserEmail(null);
      }
    } else {
      setUserEmail(null);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkUser();
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserEmail(null);
    router.push('/');
  };

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHovering(false);
    }, 300); // Espera 300ms antes de ocultar el dropdown
  };

  return (
    <header
      className="sticky-top border-bottom shadow-sm"
      style={{
        backgroundImage:
          "url('https://png.pngtree.com/thumb_back/fh260/background/20210630/pngtree-red-yellow-orange-background-photos-and-premium-high-res-victors-image_733773.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: "'Comfortaa', cursive",
      }}
    >
      <div
        className="container-fluid px-4 py-2"
        style={{ backgroundColor: 'rgba(231, 9, 9, 0.49)' }}
      >
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link href="/" className="navbar-brand fw-bold fs-4">
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
                <Link href="/home" className="btn btn-outline-light">🏠 Home</Link>
              </li>
              <li className="nav-item">
                <Link href="/juego" className="btn btn-outline-light">🎮 Juego</Link>
              </li>
              <li className="nav-item">
                <Link href="/acerca" className="btn btn-outline-light">ℹ️ Acerca</Link>
              </li>

              {userEmail ? (
                <li
                  className="nav-item position-relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ cursor: 'pointer' }}
                >
                  <span className="btn btn-light text-dark fw-semibold d-flex align-items-center gap-2">
                    👤 {userEmail}
                  </span>
                  {hovering && (
                    <div
                      className="position-absolute mt-2 bg-white border rounded shadow-sm"
                      style={{ top: '100%', right: 0, zIndex: 1000 }}
                    >
                      <button
                        className="dropdown-item text-danger fw-bold p-2"
                        onClick={handleLogout}
                      >
                        ❌ Cerrar sesión
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/login" className="btn btn-outline-light">🔑 Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/registre" className="btn btn-outline-light">📝 Registro</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
