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
const filtroCategoria = document.querySelector("#filtroCategoria");
const filtroEstado = document.querySelector("#filtroEstado");
const busquedaTexto = document.querySelector("#busquedaTexto");
const indicadoresContenedor = document.querySelector("#indicadores");
const resumenCategorias = document.querySelector("#resumenCategorias");
const interpretacionTexto = document.querySelector("#interpretacion");

// =====================================================
// 3. INICIO DEL PROYECTO BASE
// =====================================================

mostrarTabla(registros);
inicializarFiltros();
aplicarFiltros();

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

// =====================================================
// 5. MEJORA INCREMENTAL
// =====================================================

function inicializarFiltros() {
  llenarOpcionesFiltro(filtroCategoria, obtenerCategoriasUnicas(registros));
  llenarOpcionesFiltro(filtroEstado, obtenerEstadosUnicos(registros));

  filtroCategoria.addEventListener("change", aplicarFiltros);
  filtroEstado.addEventListener("change", aplicarFiltros);
  busquedaTexto.addEventListener("input", aplicarFiltros);
}

function llenarOpcionesFiltro(elemento, valores) {
  valores.forEach(function (valor) {
    const opcion = document.createElement("option");
    opcion.value = valor;
    opcion.textContent = valor;
    elemento.appendChild(opcion);
  });
}

function aplicarFiltros() {
  const categoriaSeleccionada = filtroCategoria.value;
  const estadoSeleccionado = filtroEstado.value;
  const textoBusqueda = busquedaTexto.value.trim().toLowerCase();

  const datosFiltrados = registros.filter(function (registro) {
    const estado = obtenerEstado(registro);
    const coincideCategoria = !categoriaSeleccionada || registro.categoria === categoriaSeleccionada;
    const coincideEstado = !estadoSeleccionado || estado === estadoSeleccionado;
    const coincideTexto = !textoBusqueda || [
      registro.producto,
      registro.productor,
      registro.vereda,
      registro.categoria
    ].some(function (campo) {
      return campo.toLowerCase().includes(textoBusqueda);
    });

    return coincideCategoria && coincideEstado && coincideTexto;
  });

  mostrarTabla(datosFiltrados);
  mostrarIndicadores(datosFiltrados);
  mostrarResumenPorCategoria(datosFiltrados);
  mostrarInterpretacion(datosFiltrados);
}

function obtenerEstado(registro) {
  if (registro.cantidad >= 50) {
    return "Alto";
  }
  if (registro.cantidad >= 25) {
    return "Medio";
  }
  return "Bajo";
}

function obtenerCategoriasUnicas(datos) {
  return [...new Set(datos.map(function (registro) {
    return registro.categoria;
  }))].sort();
}

function obtenerEstadosUnicos(datos) {
  return [...new Set(datos.map(obtenerEstado))].sort();
}

function mostrarIndicadores(datos) {
  const totalRegistros = datos.length;
  const resumenCategoria = calcularCategoriaDominante(datos);
  const totalCantidad = datos.reduce(function (suma, registro) {
    return suma + registro.cantidad;
  }, 0);
  const promedioCantidad = totalRegistros ? Math.round(totalCantidad / totalRegistros) : 0;
  const ultimaActualizacion = new Date().toLocaleString("es-CO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  indicadoresContenedor.innerHTML = `
    <article class="indicador">
      <h3>Total de registros</h3>
      <p>${totalRegistros}</p>
    </article>
    <article class="indicador">
      <h3>Categoría dominante</h3>
      <p>${resumenCategoria.texto}</p>
    </article>
    <article class="indicador">
      <h3>Promedio cantidad</h3>
      <p>${promedioCantidad} uds</p>
    </article>
    <article class="indicador">
      <h3>Última actualización</h3>
      <p>${ultimaActualizacion}</p>
    </article>
  `;
}

function calcularCategoriaDominante(datos) {
  const conteo = datos.reduce(function (acumulador, registro) {
    acumulador[registro.categoria] = (acumulador[registro.categoria] || 0) + 1;
    return acumulador;
  }, {});

  const categorias = Object.keys(conteo);

  if (!categorias.length) {
    return { texto: "Sin registros" };
  }

  const maximaCategoria = categorias.reduce(function (mejor, categoria) {
    return conteo[categoria] > conteo[mejor] ? categoria : mejor;
  }, categorias[0]);

  return { texto: `${maximaCategoria} (${conteo[maximaCategoria]})` };
}

function mostrarResumenPorCategoria(datos) {
  const total = datos.length;
  const conteo = datos.reduce(function (acumulador, registro) {
    acumulador[registro.categoria] = (acumulador[registro.categoria] || 0) + 1;
    return acumulador;
  }, {});

  const categorias = Object.entries(conteo).sort(function (a, b) {
    return b[1] - a[1];
  });

  if (!categorias.length) {
    resumenCategorias.innerHTML = `<p>No hay resultados para mostrar.</p>`;
    return;
  }

  resumenCategorias.innerHTML = categorias.map(function (entrada) {
    const [categoria, cantidad] = entrada;
    const porcentaje = Math.round((cantidad / total) * 100);
    return `
      <article class="categoria-card">
        <h4>${categoria}</h4>
        <p>Cantidad de registros: <strong>${cantidad}</strong></p>
        <p class="participacion">${porcentaje}% del total</p>
        <p>${generarTextoResumen(categoria, porcentaje)}</p>
      </article>
    `;
  }).join("");
}

function generarTextoResumen(categoria, porcentaje) {
  if (porcentaje >= 50) {
    return `${categoria} representa la mayoría de los datos registrados.`;
  }
  if (porcentaje >= 25) {
    return `${categoria} tiene una participación significativa en el total.`;
  }
  return `${categoria} contribuye con una participación menor, pero importante.`;
}

function mostrarInterpretacion(datos) {
  interpretacionTexto.innerHTML = `<p>${generarInterpretacion(datos)}</p>`;
}

function generarInterpretacion(datos) {
  const total = datos.length;
  if (!total) {
    return "No hay datos visibles para interpretar actualmente.";
  }

  const conteo = datos.reduce(function (acumulador, registro) {
    acumulador[registro.categoria] = (acumulador[registro.categoria] || 0) + 1;
    return acumulador;
  }, {});

  const valores = Object.values(conteo);
  const mayor = Math.max.apply(null, valores);
  const porcentajeMayor = Math.round((mayor / total) * 100);
  const hayCategoriasBajas = valores.some(function (valor) {
    return (valor / total) < 0.15;
  });
  const desviacion = valores.reduce(function (acumulador, valor) {
    return acumulador + Math.abs(valor / total - 1 / valores.length);
  }, 0) / valores.length;

  if (porcentajeMayor >= 50) {
    const categoriaMayor = Object.keys(conteo).find(function (categoria) {
      return conteo[categoria] === mayor;
    });
    return `La mayoría pertenece a una sola categoría: ${categoriaMayor}.`;
  }

  if (desviacion < 0.12) {
    return "Los datos muestran distribución equilibrada entre las categorías.";
  }

  if (hayCategoriasBajas) {
    return "Existen categorías con baja participación que pueden requerir atención.";
  }

  return "La información revela una combinación de categorías con registros distribuidos.";
}
