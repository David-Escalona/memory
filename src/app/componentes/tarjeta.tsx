'use client';

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PokemonCardData {
  id: number;
  image: string;
  matched: boolean;
}

interface CardState extends PokemonCardData {
  isFlipped: boolean;
  uniqueId: number;
  clicks: number;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [disableAll, setDisableAll] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // ⏱️ Temporizador
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ⬇️ Carga inicial de cartas (Promise.all = càrrega paral·lela)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=8');
        const data = await res.json();

        const results = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const resDetail = await fetch(pokemon.url);
            const dataDetail = await resDetail.json();
            return {
              id: dataDetail.id,
              image: dataDetail.sprites.front_default,
              matched: false,
            };
          })
        );

        const duplicated = [...results, ...results].map((card, index) => ({
          ...card,
          isFlipped: false,
          uniqueId: index + 1,
          clicks: 0,
        }));

        const shuffled = duplicated.sort(() => Math.random() - 0.5);
        setCards(shuffled);
      } catch (err) {
        console.error('Error carregant pokémons:', err);
      }
    }

    fetchData();
  }, []);

  // 🔁 Gestor del clic a cada targeta
  const handleClick = (cardIndex: number) => {
    if (disableAll || cards[cardIndex].isFlipped || cards[cardIndex].matched) return;

    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    newCards[cardIndex].clicks += 1;
    setTotalClicks(prev => prev + 1);

    const newFlipped = [...flippedCards, cardIndex];

    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisableAll(true);
      const [firstIdx, secondIdx] = newFlipped;

      if (newCards[firstIdx].id === newCards[secondIdx].id) {
        newCards[firstIdx].matched = true;
        newCards[secondIdx].matched = true;
        setScore(prev => prev + 10); // 🎯 Sumar puntuació
        setTimeout(() => {
          setCards([...newCards]);
          setFlippedCards([]);
          setDisableAll(false);
        }, 500);
      } else {
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setFlippedCards([]);
          setDisableAll(false);
        }, 1000);
      }
    }
  };

  // 🧮 Formatea el tiempo (mm:ss)
  const formatTime = (totalSeconds: number) => {
    const min = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (totalSeconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column align-items-center justify-content-start p-4"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* ⏱️🏆 Encabezado */}
      <div className="mb-4 text-center">
        <h5 className="fw-bold text-primary">🖱 Total Clicks: {totalClicks}</h5>
        <h6 className="text-secondary">⏱ Temps: {formatTime(seconds)}</h6>
        <h6 className="text-success">🎯 Puntuació: {score}</h6>
      </div>

      {/* 🧩 Grid de targetes */}
      <div className="d-flex flex-wrap justify-content-center" style={{ maxWidth: '1200px' }}>
        {cards.map((card, index) => (
          <div
            key={card.uniqueId}
            className="card m-2 text-center shadow"
            style={{
              width: '8rem',
              height: '9.5rem',
              cursor: 'pointer',
              border: card.matched ? '2px solid limegreen' : '1px solid #ccc',
              backgroundColor: card.matched ? '#e6ffe6' : 'white',
            }}
            onClick={() => handleClick(index)}
          >
            {card.isFlipped || card.matched ? (
              <>
                <img
                  src={card.image}
                  alt={`Pokemon ${card.id}`}
                  className="card-img-top p-2 bg-light"
                  style={{ objectFit: 'contain', height: '6rem' }}
                />
                <div className="card-footer p-1">
                  <small className="text-muted">Clicks: {card.clicks}</small>
                </div>
              </>
            ) : (
              <div className="bg-secondary w-100 h-100 d-flex align-items-center justify-content-center rounded">
                <span className="text-white display-6">?</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
