import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cálculo Paso a Paso", // Puedes cambiar el título aquí
  description: "Guías y soluciones para estudiantes de la FMOcc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es"> {/* Cambiado a español */}
      <head>
        {/* Aquí es el lugar correcto para los links de fuentes */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?display=swap&family=Noto+Sans:wght@400;500;700;900&family=Public+Sans:wght@400;500;700;900"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}