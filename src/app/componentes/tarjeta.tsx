'use client';

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PokemonData {
  imagen: string;
}

export function TarjetaGrid() {
  const [pokemones, setPokemones] = useState<PokemonData[]>([]);

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
      } catch (err) {
        console.error('Error al obtener los pokémon:', err);
      }
    }

    fetchPokemones();
  }, []);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient p-4" style={{ background: 'linear-gradient(to bottom right, #4f46e5, #9333ea)' }}>
      <div className="card-group gap-3 flex-wrap d-flex justify-content-center">
        {pokemones.map((pokemon, index) => (
          <div key={index} className="card" style={{ width: '8rem' }}>
            <img src={pokemon.imagen} className="card-img-top p-2 bg-light" alt={`Pokemon ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
