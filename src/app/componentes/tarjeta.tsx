'use client';

import { useEffect, useState } from 'react';
import { useClics } from './clic';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PokemonData {
  imagen: string;
}

export function TarjetaGrid() {
  const [pokemones, setPokemones] = useState<PokemonData[]>([]);
  const [clicks, setClicks] = useState<number[]>([]);
  const { totalClics, incrementar } = useClics();

  useEffect(() => {
    async function fetchPokemones() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
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
        setClicks(new Array(detalles.length).fill(0));
      } catch (err) {
        console.error('Error al obtener los pokémon:', err);
      }
    }

    fetchPokemones();
  }, []);

  const handleCardClick = (index: number) => {
    const nuevosClicks = [...clicks];
    nuevosClicks[index] += 1;
    setClicks(nuevosClicks);
    incrementar(); // actualiza el contador global
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center bg-gradient p-4 position-relative"
      style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}
    >
      <div className="card-group gap-3 flex-wrap d-flex justify-content-center">
        {pokemones.map((pokemon, index) => (
          <div
            key={index}
            className="card m-2"
            style={{ width: '8rem', cursor: 'pointer' }}
            onClick={() => handleCardClick(index)}
          >
            <img
              src={pokemon.imagen}
              className="card-img-top p-2 bg-light"
              alt={`Pokemon ${index}`}
            />
            <div className="card-footer text-center">
              <small className="text-muted">Clics: {clicks[index]}</small>
            </div>
          </div>
        ))}
      </div>

      {/* Contador global en la esquina inferior izquierda */}
      <div className="position-absolute bottom-0 start-0 text-white m-3">
        <strong>Total de clics: {totalClics}</strong>
      </div>
    </div>
  );
}
