import type { Metadata } from "next";
import { Inter, Noto_Sans, Public_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
const noto_sans = Noto_Sans({ subsets: ["latin"], weight: ['400', '500', '700', '900'], variable: '--font-noto-sans' });
const public_sans = Public_Sans({ subsets: ["latin"], weight: ['400', '500', '700', '900'], variable: '--font-public-sans' });



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
    <html lang="es" suppressHydrationWarning> {/* Cambiado a español y añadido suppressHydrationWarning */}
      <body className={`${inter.className} ${noto_sans.variable} ${public_sans.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}