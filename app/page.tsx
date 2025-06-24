import Image from "next/image";
import React from 'react'; // <-- PASO 1: AÑADIR ESTA LÍNEA

export default function Home() {
  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
      // PASO 2: Aplicar la corrección al final del objeto style
      style={{
        '--select-button-svg': "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(129,106,106)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')",
        fontFamily: '"Public Sans", "Noto Sans", sans-serif',
      } as React.CSSProperties}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f1f1] px-10 py-3">
          <div className="flex items-center gap-4 text-[#161212]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#161212] text-lg font-bold leading-tight tracking-[-0.015em]">Cálculo Paso a Paso</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a className="text-[#161212] text-sm font-medium leading-normal" href="#">Guías de Estudio</a>
              <a className="text-[#161212] text-sm font-medium leading-normal" href="#">Solucionador de Ejercicios</a>
              <a className="text-[#161212] text-sm font-medium leading-normal" href="#">Integración con Wolfram Alpha</a>
            </div>
            <button
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f4f1f1] text-[#161212] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
            >
              <div className="text-[#161212]" data-icon="Question" data-size="20px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
                  ></path>
                </svg>
              </div>
            </button>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWREe4cel8YALu_uFVB5P6TufyqLWimZC3BSc_cYejM0ZPg1hhiIUSO5LYr4HlEksh-Iw4jEXzbdeweKFH-s0F4IJk3ZGiS9Nhz0ZUVOzL0UUzYk1h2WFDpTgHvc8BU49TJ64Y7pMAPdpwLBzcV5uW_twDJfX5MMmBoVHLaB0QfpSR5_wi7nmF8sSpD_hBOxwUrMQ_qwj0FOomHzf_0fnSQFVkQSEyguuRiiorETaclHERRe3_5R4tCrHUhET-dnjWuzv9oMuxrk0")' }}
            ></div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-[#161212] tracking-light text-[32px] font-bold leading-tight">Cálculo Paso a Paso</p>
                <p className="text-[#816a6a] text-sm font-normal leading-normal">
                  Bienvenido a la página web de Cálculo Paso a Paso de la Facultad Multidisciplinaria del Oeste de la UES. Aquí encontrarás guías de estudio, soluciones de
                  ejercicios e integración con Wolfram Alpha para ayudarte con tus estudios de cálculo.
                </p>
              </div>
            </div>
            <h2 className="text-[#161212] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Guías de Estudio</h2>
            <p className="text-[#161212] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Descarga las guías de estudio en formato PDF para repasar los conceptos y la teoría del cálculo.
            </p>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-start">
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e5b2b2] text-[#161212] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Descargar Guía 1</span>
                </button>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f4f1f1] text-[#161212] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Descargar Guía 2</span>
                </button>
              </div>
            </div>
            <h2 className="text-[#161212] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Solucionador de Ejercicios</h2>
            <p className="text-[#161212] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Selecciona la guía, la sección y el número de ejercicio para ver la solución paso a paso.
            </p>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <select
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#161212] focus:outline-0 focus:ring-0 border border-[#e3dddd] bg-white focus:border-[#e3dddd] h-14 bg-[image:--select-button-svg] placeholder:text-[#816a6a] p-[15px] text-base font-normal leading-normal"
                  defaultValue="one"
                >
                  <option value="one">Seleccionar Guía</option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                </select>
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <select
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#161212] focus:outline-0 focus:ring-0 border border-[#e3dddd] bg-white focus:border-[#e3dddd] h-14 bg-[image:--select-button-svg] placeholder:text-[#816a6a] p-[15px] text-base font-normal leading-normal"
                  defaultValue="one"
                >
                  <option value="one">Seleccionar Sección</option>
                  <option value="two">two</option>
                  <option value="three">three</option>
                </select>
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <input
                  placeholder="Número de Ejercicio"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#161212] focus:outline-0 focus:ring-0 border border-[#e3dddd] bg-white focus:border-[#e3dddd] h-14 placeholder:text-[#816a6a] p-[15px] text-base font-normal leading-normal"
                  defaultValue=""
                />
              </label>
            </div>
            <div className="flex px-4 py-3 justify-start">
              <button
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#e5b2b2] text-[#161212] text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Mostrar Solución</span>
              </button>
            </div>
            {/* El resto de tu contenido de la sección de Wolfram Alpha iría aquí */}
          </div>
        </div>
      </div>
    </div>
  );
}