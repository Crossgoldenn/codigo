'use client';

import { useState, useEffect } from 'react';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
}

export default function Home() {
  const [cryptoData, setCryptoData] = useState<CoinData[]>([]);
  const [currency, setCurrency] = useState<'usd' | 'mxn'>('usd');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      setError(null);
      // Obtenemos los datos detallados que requiere la aplicación
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=bitcoin,ethereum,dogecoin&price_change_percentage=24h`
      );
      
      if (!response.ok) throw new Error('Demasiadas solicitudes o error de API. Intenta de nuevo en un minuto.');
      
      const data = await response.json();
      setCryptoData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [currency]);

  const currencySymbol = currency === 'usd' ? '$' : 'Mex$';

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Ticker Animado Estilo Bloomberg */}
      <div className="bg-amber-500 text-slate-950 text-xs font-mono py-1.5 overflow-hidden whitespace-nowrap border-b border-amber-600">
        <div className="inline-block animate-[marquee_30s_linear_infinite] space-x-8">
          <span>• CRYPTO TERMINAL V1.0 •</span>
          {cryptoData.map(c => (
            <span key={c.id + '-ticker'}>
              {c.name}: {currencySymbol}{c.current_price.toLocaleString()} ({c.price_change_percentage_24h >= 0 ? '+' : ''}{c.price_change_percentage_24h.toFixed(2)}%)
            </span>
          ))}
          <span>• DATOS EN TIEMPO REAL COINGECKO •</span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h1 className="text-lg font-mono font-bold tracking-wider uppercase">
              Crypto<span className="text-amber-500">Tracker</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Selector de Divisa */}
            <div className="bg-slate-900 p-0.5 rounded-lg border border-slate-800 flex">
              <button 
                onClick={() => setCurrency('usd')}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${currency === 'usd' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                USD
              </button>
              <button 
                onClick={() => setCurrency('mxn')}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${currency === 'mxn' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                MXN
              </button>
            </div>

            <button 
              onClick={fetchPrices}
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-50 px-4 py-1.5 rounded-lg text-xs font-mono transition-all"
            >
              {loading ? '⚡...' : 'REFRESH'}
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-6xl w-full mx-auto px-6 py-10 flex-grow">
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-center font-mono text-xs max-w-xl mx-auto mb-8">
            [ERROR]: {error}
          </div>
        )}

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {loading && cryptoData.length === 0 ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-slate-900/50 border border-slate-900 p-6 rounded-xl h-64 animate-pulse" />
            ))
          ) : (
            cryptoData.map((coin) => {
              const isPositive = coin.price_change_percentage_24h >= 0;
              return (
                <div key={coin.id} className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 p-6 rounded-xl flex flex-col justify-between transition-all hover:bg-slate-900/60">
                  
                  {/* Encabezado Tarjeta */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <img src={coin.image} alt={coin.name} className="w-8 h-8 object-contain filter grayscale hover:grayscale-0 transition-all" />
                      <div>
                        <h3 className="font-mono font-bold text-white text-base">{coin.name}</h3>
                        <span className="text-[10px] uppercase text-slate-500 font-mono tracking-widest">{coin.symbol}</span>
                      </div>
                    </div>
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </div>

                  {/* Precio */}
                  <div className="my-5">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Last Price</p>
                    <p className="text-3xl font-mono font-bold tracking-tight text-white">
                      {currencySymbol}{coin.current_price.toLocaleString(undefined, { minimumFractionDigits: coin.current_price < 1 ? 4 : 2 })}
                    </p>
                  </div>

                  {/* Estadísticas Avanzadas (Mencionadas en tu Readme) */}
                  <div className="border-t border-slate-900/80 pt-4 space-y-2 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">24h High/Low:</span>
                      <span className="text-slate-300">
                        {coin.high_24h.toLocaleString()} / {coin.low_24h.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Market Cap:</span>
                      <span className="text-slate-400">{coin.market_cap.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Volume:</span>
                      <span className="text-slate-400">{coin.total_volume.toLocaleString()}</span>
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Footer Terminal */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-[10px] font-mono text-slate-600 tracking-widest uppercase">
        <p>System Status: Operational // Powered by CoinGecko API</p>
      </footer>

      {/* Inyección de estilos CSS para la animación del Ticker */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </div>
  );
}
