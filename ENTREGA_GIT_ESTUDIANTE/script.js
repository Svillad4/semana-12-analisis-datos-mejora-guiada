/*
  AgroDatos El Progreso
  Semana 12 - Proyecto base

  Estado inicial:
  El sistema ya tiene datos almacenados y una tabla que los muestra.

  Mejora por construir durante la clase:
  Crear un panel de análisis que calcule indicadores, permita filtrar datos,
  genere resúmenes e interprete la información.
*/

// =====================================================
// 1. DATOS ALMACENADOS
// =====================================================

const registros = [
  { producto: "Café campesino", categoria: "Agricultura", productor: "Familia Gómez", vereda: "El Progreso", cantidad: 25, precioUnitario: 18000 },
  { producto: "Miel artesanal", categoria: "Alimentos", productor: "Asociación Dulce Campo", vereda: "La Esperanza", cantidad: 18, precioUnitario: 22000 },
  { producto: "Canasto tejido", categoria: "Artesanías", productor: "Doña Marta", vereda: "Monte Verde", cantidad: 10, precioUnitario: 35000 },
  { producto: "Panela natural", categoria: "Alimentos", productor: "Trapiche San José", vereda: "El Progreso", cantidad: 40, precioUnitario: 8000 },
  { producto: "Plántulas de tomate", categoria: "Agricultura", productor: "Vivero La Huerta", vereda: "La Esperanza", cantidad: 120, precioUnitario: 2500 },
  { producto: "Servicio de riego", categoria: "Servicios", productor: "Jóvenes Tech Rural", vereda: "El Progreso", cantidad: 6, precioUnitario: 45000 },
  { producto: "Arequipe casero", categoria: "Alimentos", productor: "Familia Ríos", vereda: "Monte Verde", cantidad: 30, precioUnitario: 12000 },
  { producto: "Abono orgánico", categoria: "Agricultura", productor: "EcoFinca El Roble", vereda: "El Progreso", cantidad: 55, precioUnitario: 9000 },
  { producto: "Bordado artesanal", categoria: "Artesanías", productor: "Colectivo Manos Unidas", vereda: "La Esperanza", cantidad: 14, precioUnitario: 28000 },
  { producto: "Asesoría digital", categoria: "Servicios", productor: "Semillero TIC", vereda: "Monte Verde", cantidad: 8, precioUnitario: 50000 },
  { producto: "Queso campesino", categoria: "Alimentos", productor: "Finca La Pradera", vereda: "El Progreso", cantidad: 22, precioUnitario: 16000 },
  { producto: "Semillas de maíz", categoria: "Agricultura", productor: "Banco de Semillas Local", vereda: "Monte Verde", cantidad: 75, precioUnitario: 4200 }
];

// =====================================================
// 2. CONEXIÓN INICIAL CON HTML
// =====================================================

const tablaDatos = document.querySelector("#tablaDatos");

// =====================================================
// 3. INICIO DEL PROYECTO BASE
// =====================================================

mostrarTabla(registros);

// =====================================================
// 4. FUNCIONES BASE
// =====================================================

function mostrarTabla(datos) {
  tablaDatos.innerHTML = "";

  datos.forEach(function (registro) {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${registro.producto}</td>
      <td>${registro.categoria}</td>
      <td>${registro.productor}</td>
      <td>${registro.vereda}</td>
      <td>${registro.cantidad}</td>
      <td>${formatearMoneda(registro.precioUnitario)}</td>
      <td>${formatearMoneda(calcularValorRegistro(registro))}</td>
    `;

    tablaDatos.appendChild(fila);
  });
}

function calcularValorRegistro(registro) {
  return registro.cantidad * registro.precioUnitario;
}

function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(valor);
}

/*
  La mejora incremental se construirá debajo de esta línea.
  No está hecha todavía para que el estudiante pueda ver el cambio real.
*/
