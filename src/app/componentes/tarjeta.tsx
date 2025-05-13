'use client';
import { useEffect, useState } from 'react';
import { ClicsProvider, useClics } from './ClickContext';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PokemonData {
  imagen: string;
}

function PokemonCard({ imagen, index }: { imagen: string; index: number }) {
  const { incrementarClicks } = useClics();
  const [individualClicks, setIndividualClicks] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setFlipped(true); // mostrar imagen
    setIndividualClicks(prev => prev + 1);
    incrementarClicks();

    // ocultar después de 1 segundo
    setTimeout(() => {
      setFlipped(false);
    }, 1000);
  };

  return (
    <div
      className="card text-center"
      style={{ width: '8rem', cursor: 'pointer' }}
      onClick={handleClick}
    >
      {flipped ? (
        <img
          src={imagen}
          className="card-img-top p-2 bg-light"
          alt={`Pokemon ${index}`}
          style={{ height: '96px', objectFit: 'contain' }}
        />
      ) : (
        <div
          className="bg-secondary"
          style={{
            height: '96px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <small className="text-white">Cap per avall</small>
        </div>
      )}
      <div className="card-footer">
        <small className="text-muted">Clics: {individualClicks}</small>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ClicsProvider>
      <TarjetaGrid />
    </ClicsProvider>
  );
}

function TarjetaGrid() {
  const [pokemones, setPokemones] = useState<PokemonData[]>([]);
  const { totalClicks } = useClics();

  useEffect(() => {
    async function fetchPokemones() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await res.json();

        const detalles = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const resDetalle = await fetch(pokemon.url);
            const dataDetalle = await resDetalle.json();
            return {
              imagen: dataDetalle.sprites.front_default,
            };
          })
        );

        setPokemones(detalles);
      } catch (err) {
        console.error('Error al obtener los pokémon:', err);
      }
    }

    fetchPokemones();
  }, []);

  return (
    <div
      className="min-vh-100 position-relative d-flex align-items-center justify-content-center p-4"
      style={{ backgroundColor: '#fff' }}
    >
      {/* Contador Global */}
      <div
        className="position-absolute bottom-0 start-0 bg-dark text-white p-2 m-3 rounded shadow"
        style={{ fontSize: '14px' }}
      >
        Total clics: {totalClicks}
      </div>

      {/* Tarjetas */}
      <div className="d-flex flex-wrap justify-content-center gap-3" style={{ maxWidth: '1200px' }}>
        {pokemones.map((pokemon, index) => (
          <PokemonCard key={index} imagen={pokemon.imagen} index={index} />
        ))}
      </div>
    </div>
  );
}
