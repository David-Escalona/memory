'use client';

export default function AcercaPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: "'Comfortaa', cursive",
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/11/29/87/69/360_F_1129876981_HkII19WOJsUHiuQj8do5MnkqbHD8RsmW.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        position: 'relative',
      }}
    >
      {/* Overlay oscuro para legibilidad */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      />

      {/* Contenido principal */}
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <h2 className="text-center mb-4" style={{ color: '#adff2f' }}>
          Acerca del Proyecto
        </h2>

        <p style={{ fontSize: '1.1rem' }}>
          Este proyecto fue desarrollado por <strong>David Escalona García</strong> como parte de un ejercicio práctico para reforzar conceptos de desarrollo frontend usando <strong>React</strong>, <strong>TypeScript</strong> y <strong>Next.js</strong>.
        </p>

        <p style={{ fontSize: '1.1rem' }}>
          El juego consiste en un <strong>juego de memoria</strong> con cartas de Pokémon obtenidas desde la <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" style={{ color: '#00ffcc' }}>PokeAPI</a>. El objetivo es encontrar todas las parejas con el menor número de clics y en el menor tiempo posible.
        </p>

      </div>
    </div>
  );
}
