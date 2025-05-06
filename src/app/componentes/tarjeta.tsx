'use client';

interface TarjetaProps {
  imagen: string;
}

export function Tarjeta({ imagen }: TarjetaProps) {
  return (
    <div className="bg-white shadow-lg rounded-3xl p-4 w-40 h-40 flex items-center justify-center transition-transform transform hover:scale-110 hover:shadow-xl duration-300">
      <img src={imagen} alt="Pokemon" className="w-28 h-28 object-contain rounded-lg shadow-md border-4 border-indigo-400 hover:border-yellow-400 transition-all duration-300" />
    </div>
  );
}

interface GrupoTarjetasProps {
  tarjetas: string[];
}

export function GrupoTarjetas({ tarjetas }: GrupoTarjetasProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 p-4">
      <div className="grid grid-cols-3 gap-6 justify-center items-center w-full max-w-4xl">
        {tarjetas.map((imagen, index) => (
          <Tarjeta key={index} imagen={imagen} />
        ))}
      </div>
    </div>
  );
}

export function TarjetaGrid() {

  const tarjetas: string[] = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', 
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', 
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',  
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',  
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png', 
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png', 
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',  
  ];

  return <GrupoTarjetas tarjetas={tarjetas} />;
}
