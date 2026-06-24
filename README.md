# 🪙 CryptoTracker

Aplicación Next.js que muestra precios en tiempo real de **Bitcoin**, **Ethereum** y **Dogecoin** usando la API pública de [CoinGecko](https://www.coingecko.com/).

## ✨ Características

- Precios en USD y MXN
- Variación 24h y 7d
- Capitalización de mercado y volumen
- Máximo/mínimo del día
- Ticker animado estilo Bloomberg
- API Route en Next.js (sin exponer keys)
- Diseño dark mode con estética de terminal financiero

---

## 🚀 Instalación local

### Requisitos

- Node.js 18 o superior
- npm o yarn

### Pasos

```bash
# 1. Clona el repositorio
git clone https://github.com/TU_USUARIO/crypto-tracker.git
cd crypto-tracker

# 2. Instala dependencias
npm install

# 3. Ejecuta en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del proyecto

```
crypto-tracker/
├── app/
│   ├── api/
│   │   └── price/
│   │       └── route.ts        # API Route → CoinGecko
│   ├── globals.css             # Estilos globales + variables CSS
│   ├── layout.tsx              # Layout raíz
│   └── page.tsx                # Página principal
├── components/
│   ├── CoinSelector.tsx        # Botones de selección de moneda
│   ├── PriceCard.tsx           # Tarjeta principal de precio
│   ├── StatsGrid.tsx           # Grid de estadísticas
│   └── TickerBanner.tsx        # Ticker animado
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🌐 API utilizada

La app consume la API pública de CoinGecko (sin API key requerida):

```
GET https://api.coingecko.com/api/v3/coins/{coin}
```

El endpoint interno de Next.js (`/api/price?coin=bitcoin`) actúa como proxy y evita exponer lógica al cliente.

---

## 📤 Subir a GitHub

```bash
# Inicializar git (si no existe)
git init
git add .
git commit -m "feat: crypto tracker inicial"

# Crear repositorio en github.com y luego:
git remote add origin https://github.com/TU_USUARIO/crypto-tracker.git
git branch -M main
git push -u origin main
```

---

## ▲ Deploy en Vercel

### Opción A — Desde la interfaz (recomendado)

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
2. Haz clic en **"Add New → Project"**
3. Importa el repositorio `crypto-tracker`
4. Deja la configuración por defecto (Vercel detecta Next.js automáticamente)
5. Haz clic en **"Deploy"**
6. En ~1 minuto tendrás tu URL: `https://crypto-tracker-xxx.vercel.app`

### Opción B — Vercel CLI

```bash
# Instalar CLI
npm i -g vercel

# Desplegar
vercel

# Para producción
vercel --prod
```

### Variables de entorno

Esta app **no requiere variables de entorno**. CoinGecko es público.

> Si en el futuro usas la API Pro de CoinGecko con una key, agrégala en Vercel:
> `Settings → Environment Variables → COINGECKO_API_KEY`
> Y en `route.ts` añade: `headers: { 'x-cg-demo-api-key': process.env.COINGECKO_API_KEY }`

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo en localhost:3000 |
| `npm run build` | Build de producción |
| `npm run start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint |

---

## 📝 Licencia

MIT — Úsalo libremente.
