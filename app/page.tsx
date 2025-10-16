import React from 'react';
// 1. IMPORTAMOS LA FUNCIÓN 'createClient' DESDE EL ARCHIVO DEL SERVIDOR (¡Buena práctica!)
import { createClient } from '@/utils/supabase/server'; 

import { ThemeSwitcher } from './theme-switcher';
export default async function Home() {
  
  // 2. LLAMAMOS A LA FUNCIÓN PARA OBTENER NUESTRA INSTANCIA DE SUPABASE
  const supabase = createClient();

  const { data: guias, error } = await supabase
    .from('guias')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    console.error("Error al obtener las guías desde Supabase:", error.message);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 font-sans text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div className="flex size-6 items-center justify-center rounded-md bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h1 className="text-lg font-bold tracking-tight">Cálculo Paso a Paso</h1>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50" href="/admin">
            Panel Admin
          </a>
          <ThemeSwitcher />
          <div className="relative flex size-9 items-center justify-center rounded-full bg-slate-200 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section className="mb-12 rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-800">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Recursos de Cálculo
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-400">
              Bienvenido al portal de la Facultad Multidisciplinaria de Occidente (UES). Aquí encontrarás guías de estudio, soluciones de ejercicios e integración con Wolfram Alpha para potenciar tu aprendizaje.
            </p>
          </section>

          {/* Study Guides Section */}
          <section className="mb-12">
            <div className="mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Guías de Estudio</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Descarga las guías en formato PDF para repasar los conceptos y la teoría del cálculo.
              </p>
            </div>
            
            {guias && guias.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {guias.map((guia) => (
                  <a
                    key={guia.id}
                    href={guia.url_pdf || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-blue-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-800 dark:hover:border-blue-500"
                  >
                    <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-700 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" x2="8" y1="13" y2="13" />
                        <line x1="16" x2="8" y1="17" y2="17" />
                        <line x1="10" x2="8" y1="9" y2="9" />
                      </svg>
                    </div>
                    <span className="truncate font-medium text-slate-700 group-hover:text-blue-600 dark:text-slate-300 dark:group-hover:text-blue-400">{guia.nombre_guia}</span>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
                <p className="text-slate-500 dark:text-slate-400">No hay guías disponibles en este momento.</p>
              </div>
            )}
          </section>

          {/* Exercise Solver Section */}
          <section>
            <div className="mb-6">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Solucionador de Ejercicios</h3>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Selecciona la guía, la sección y el número de ejercicio para ver la solución paso a paso.
              </p>
            </div>
            <div className="rounded-lg border-2 border-dashed border-slate-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800">
              <p className="text-slate-500 dark:text-slate-400">El solucionador estará disponible próximamente.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
