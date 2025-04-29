// components/Header.tsx
import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css'; // Aquesta línia carrega els estils de Bootstrap


export function Header() {
  return (
    <header className="bg-light shadow-sm sticky-top">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link href="/" className="navbar-brand">
            David Escalona García
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link href="/about" className="nav-link">
                  Sobre
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blog" className="nav-link">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link">
                  Contacte
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}
