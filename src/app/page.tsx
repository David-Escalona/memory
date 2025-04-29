// src/app/layout.tsx
import { ReactNode } from "react"
import { Header } from "./componentes/Header"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ca">
      <head>
        {/* Aquí pots afegir metatags, enllaços a fulls d'estil externs, fonts, etc. */}
      </head>
      <body>
        <Header />
        {children}  {/* Aquí s'injecta el contingut de cada pàgina */}
      </body>
    </html>
  )
}
