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
}

export default function MemoryGame() {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [disableAll, setDisableAll] = useState(false);

  useEffect(() => {
    async function fetchData() {
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
        uniqueId: index + 1, // unique ID for each card instance
      }));

      const shuffled = duplicated.sort(() => Math.random() - 0.5);
      setCards(shuffled);
    }

    fetchData();
  }, []);

  const handleClick = (cardIndex: number) => {
    if (disableAll || cards[cardIndex].isFlipped || cards[cardIndex].matched) return;

    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    const newFlipped = [...flippedCards, cardIndex];

    setCards(newCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisableAll(true);
      const [firstIdx, secondIdx] = newFlipped;

      if (newCards[firstIdx].id === newCards[secondIdx].id) {
        // Match
        newCards[firstIdx].matched = true;
        newCards[secondIdx].matched = true;
        setCards(newCards);
        setFlippedCards([]);
        setDisableAll(false);
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
          setDisableAll(false);
        }, 1000);
      }
    }
  };

  return (
    <div
      className="min-vh-100 d-flex flex-wrap justify-content-center align-items-start p-4"
      style={{ backgroundColor: '#ffffff' }}
    >
      {cards.map((card, index) => (
        <div
          key={card.uniqueId}
          className="card m-2"
          style={{ width: '8rem', height: '8rem', cursor: 'pointer' }}
          onClick={() => handleClick(index)}
        >
          {card.isFlipped || card.matched ? (
            <img
              src={card.image}
              alt={`Pokemon ${card.id}`}
              className="card-img-top p-2 bg-light"
              style={{ objectFit: 'contain', height: '100%' }}
            />
          ) : (
            <div
              className="bg-secondary w-100 h-100 d-flex align-items-center justify-content-center"
            >
              <span className="text-white">?</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
