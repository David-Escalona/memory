'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

interface GameResult {
  name: string;
  email: string;
  time: string;
  score: number;
  clicks: number;
}

export default function MemoryGame() {
  const router = useRouter();

  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [disableAll, setDisableAll] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [gameFinished, setGameFinished] = useState(false);

  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    loadCards();

    // Cargar usuario desde localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!timerActive) return;
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timerActive]);

  const loadCards = async () => {
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
      setFlippedCards([]);
      setDisableAll(false);
      setTotalClicks(0);
      setScore(0);
      setSeconds(0);
      setTimerActive(true);
      setGameFinished(false);
    } catch (err) {
      console.error('Error cargando pokémons:', err);
    }
  };

  const handleClick = (cardIndex: number) => {
    if (disableAll || cards[cardIndex].isFlipped || cards[cardIndex].matched || gameFinished) return;

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
        setScore(prev => prev + 10);
        setTimeout(() => {
          setCards([...newCards]);
          setFlippedCards([]);
          setDisableAll(false);
          if (newCards.every(card => card.matched)) {
            setGameFinished(true);
            setTimerActive(false);

            if (user) {
              const gameData: GameResult = {
                name: user.name,
                email: user.email,
                time: formatTime(seconds),
                score,
                clicks: totalClicks,
              };

              const stored = localStorage.getItem('games');
              const parsed = stored ? JSON.parse(stored) : [];
              parsed.push(gameData);
              localStorage.setItem('games', JSON.stringify(parsed));
            }
          }
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

  const formatTime = (totalSeconds: number) => {
    const min = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const sec = (totalSeconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  const messageAnimation = {
    animation: 'pulse 1.5s infinite',
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        fontFamily: "'Comfortaa', cursive",
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/11/29/87/69/360_F_1129876981_HkII19WOJsUHiuQj8do5MnkqbHD8RsmW.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0,
        }}
      />

      <div
        className="d-flex flex-column align-items-center justify-content-start p-4"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div className="mb-4 text-center">
          <h5 className="fw-bold" style={{ color: '#adff2f' }}>
            🖱 Total Clicks: {totalClicks}
          </h5>
          <h6 style={{ color: '#d0f0c0' }}>⏱ Temps: {formatTime(seconds)}</h6>
          <h6 style={{ color: '#7fff00' }}>🎯 Puntuació: {score}</h6>
        </div>

        {gameFinished && (
          <>
            <div
              className="mb-4 text-center p-4 rounded"
              style={{
                backgroundColor: 'rgba(0, 128, 0, 0.7)',
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '700',
                maxWidth: '500px',
                ...messageAnimation,
              }}
            >
              🎉 ¡Felicidades, terminaste el juego! 🎉<br />
              Tiempo: {formatTime(seconds)} <br />
              Puntuación: {score}
            </div>

            <div className="d-flex gap-3 mb-4">
              <button
                onClick={loadCards}
                className="btn btn-light fw-bold"
                style={{ borderRadius: '30px', fontFamily: "'Comfortaa', cursive" }}
              >
                🔄 Jugar de nuevo
              </button>
              <button
                onClick={() => router.push('/')}
                className="btn btn-success fw-bold"
                style={{ borderRadius: '30px', fontFamily: "'Comfortaa', cursive" }}
              >
                🏠 Menú principal
              </button>
              <button
                onClick={() => router.push('/mispartidas')}
                className="btn btn-info fw-bold"
                style={{ borderRadius: '30px', fontFamily: "'Comfortaa', cursive" }}
              >
                📋 Ver mis partidas
              </button>
            </div>
          </>
        )}

        <div className="d-flex flex-wrap justify-content-center" style={{ maxWidth: '1200px' }}>
          {cards.map((card, index) => (
            <div
              key={card.uniqueId}
              className="card m-2 text-center shadow"
              style={{
                width: '8rem',
                height: '10rem',
                cursor: gameFinished ? 'default' : 'pointer',
                userSelect: 'none',
              }}
              onClick={() => handleClick(index)}
            >
              <div className="card-container w-100 h-100">
                <div className={`card-inner ${card.isFlipped || card.matched ? 'flipped' : ''}`}>
                  <div
                    className="card-front"
                    style={{
                      backgroundColor: card.matched ? '#e6ffe6' : 'white',
                      border: card.matched ? '3px solid limegreen' : '1.5px solid #ccc',
                    }}
                  >
                    <img
                      src={card.image}
                      alt={`Pokemon ${card.id}`}
                      className="card-img-top p-2 bg-light"
                      style={{ objectFit: 'contain', height: '7.5rem' }}
                    />
                    <div className="card-footer p-1">
                      <small className="text-muted">Clicks: {card.clicks}</small>
                    </div>
                  </div>

                  <div className="card-back">
                    <span className="text-white display-5">?</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .card-container {
          perspective: 1000px;
          width: 100%;
          height: 100%;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 1s;
        }

        .card-inner.flipped {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 0.5rem;
        }

        .card-front {
          transform: rotateY(180deg);
        }

        .card-back {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #6c757d;
        }
      `}</style>
    </div>
  );
}
