export function formatDate(date: string) {
  const parseDate = new Date(date);
  const formatedDate = new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parseDate);
  return formatedDate;
}

export function isQrValid(data: string) {
  const lineas = data.split("\n");
  // Crear un objeto vacío donde almacenaremos los datos
  const jsonResult: { [key: string]: any } = {};

  // Recorrer cada línea del string
  lineas.forEach((linea) => {
    // Dividir cada línea en clave y valor
    const partes = linea.split(":");

    // Si la línea tiene la estructura clave:valor
    if (partes.length === 2) {
      // Quitar espacios extra y agregar la clave y el valor al objeto
      const clave = partes[0].trim();
      const valor = partes[1].trim();

      // Tratar de convertir valores numéricos a tipo número
      if (!isNaN(valor)) {
        jsonResult[clave] = Number(valor);
      } else {
        jsonResult[clave] = valor;
      }
    }
  });
  if (!jsonResult.Codigo) return false;
  return jsonResult;
}
