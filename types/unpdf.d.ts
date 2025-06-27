
declare module 'unpdf' {
  interface UnpdfResult {
    text: string;
    // Aquí se pueden añadir otras propiedades que devuelva unpdf si las usas,
    // como 'pages' o 'info'. Por ahora, solo necesitamos 'text'.
  }

  function unpdf(buffer: Buffer | ArrayBuffer): Promise<UnpdfResult>;

  export default unpdf;
}
