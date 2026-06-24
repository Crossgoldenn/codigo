import './globals.css';

export const metadata = {
  title: 'CryptoTracker - Terminal Financiero',
  description: 'Monitoreo en tiempo real de Bitcoin, Ethereum y Dogecoin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-950 text-slate-100 min-h-screen selection:bg-amber-500/30 antialiased">
        {children}
      </body>
    </html>
  );
}
