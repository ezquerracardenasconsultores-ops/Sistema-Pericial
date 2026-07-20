/*==========================================================
 SISTEMA PROFESIONAL DE INFORMES PERICIALES
 script.js
==========================================================*/

"use strict";

/*==========================================================
 BASE DE DATOS DEL INFORME
==========================================================*/

const informe = {

    expediente : "",

    juzgado : "",

    especialista : "",

    demandante : "",

    demandado : "",

    materia : "",

    perito : "",

    registro : "",

    fecha : "",

    lugar : "Lima",

    anexos : [],

    evidencias : []

};

/*==========================================================
 ATAJOS
==========================================================*/

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);

/*==========================================================
 CARGAR DATOS EN EL HTML
==========================================================*/

function cargarDatos(){

    $("#expediente").textContent = informe.expediente;

    $("#juzgado").textContent = informe.juzgado;

    $("#especialista").textContent = informe.especialista;

    $("#demandante").textContent = informe.demandante;

    $("#demandado").textContent = informe.demandado;

    $("#materia").textContent = informe.materia;

    $("#perito").textContent = informe.perito;

    $("#registro").textContent = informe.registro;

    $("#fecha").textContent = informe.fecha;

    $("#fechaInforme").textContent = informe.fecha;

    $("#lugar").textContent = informe.lugar;

}

/*==========================================================
 FECHA ACTUAL
==========================================================*/

function fechaActual(){

    const hoy = new Date();

    return hoy.toLocaleDateString("es-PE");

}

/*==========================================================
 NUEVO INFORME
==========================================================*/

function nuevoInforme(){

    informe.expediente="";

    informe.juzgado="";

    informe.especialista="";

    informe.demandante="";

    informe.demandado="";

    informe.materia="";

    informe.perito="";

    informe.registro="";

    informe.fecha=fechaActual();

    informe.anexos=[];

    informe.evidencias=[];

    cargarDatos();

}
/*==========================================================
 GUARDAR INFORME
==========================================================*/

function guardarInforme(){

    const datos = JSON.stringify(informe,null,4);

    const archivo = new Blob([datos],{

        type:"application/json"

    });

    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(archivo);

    enlace.download = "Informe_Pericial.json";

    enlace.click();

    URL.revokeObjectURL(enlace.href);

}

/*==========================================================
 ABRIR INFORME
==========================================================*/

function abrirInforme(event){

    const archivo = event.target.files[0];

    if(!archivo){

        return;

    }

    const lector = new FileReader();

    lector.onload=function(e){

        const datos = JSON.parse(e.target.result);

        Object.assign(informe,datos);

        cargarDatos();

        cargarAnexos();

        cargarEvidencias();

    };

    lector.readAsText(archivo);

}

/*==========================================================
 AUTOGUARDADO LOCAL
==========================================================*/

function guardarLocal(){

    localStorage.setItem(

        "InformePericial",

        JSON.stringify(informe)

    );

}

function recuperarLocal(){

    const datos = localStorage.getItem(

        "InformePericial"

    );

    if(datos){

        Object.assign(

            informe,

            JSON.parse(datos)

        );

    }

    cargarDatos();

}

/*==========================================================
 LIMPIAR INFORME
==========================================================*/

function limpiarInforme(){

    if(

        confirm(

        "¿Desea crear un informe nuevo?"

        )

    ){

        localStorage.removeItem(

            "InformePericial"

        );

        nuevoInforme();

    }

}
/*==========================================================
 GESTIÓN DE ANEXOS
==========================================================*/

function agregarAnexo(descripcion,folios){

    informe.anexos.push({

        descripcion:descripcion,

        folios:folios

    });

    cargarAnexos();

    guardarLocal();

}

function eliminarAnexo(indice){

    informe.anexos.splice(indice,1);

    cargarAnexos();

    guardarLocal();

}

function cargarAnexos(){

    informe.anexos.forEach((anexo,i)=>{

        const descripcion=document.getElementById(

            "anexo"+(i+1)

        );

        const folio=document.getElementById(

            "folio"+(i+1)

        );

        if(descripcion){

            descripcion.textContent=anexo.descripcion;

        }

        if(folio){

            folio.textContent=anexo.folios;

        }

    });

}

/*==========================================================
 EVIDENCIAS FOTOGRÁFICAS
==========================================================*/

function agregarEvidencia(evento){

    const archivo=evento.target.files[0];

    if(!archivo){

        return;

    }

    const lector=new FileReader();

    lector.onload=function(e){

        informe.evidencias.push({

            nombre:archivo.name,

            imagen:e.target.result

        });

        cargarEvidencias();

        guardarLocal();

    };

    lector.readAsDataURL(archivo);

}

function cargarEvidencias(){

    informe.evidencias.forEach((imagen,i)=>{

        const foto=document.getElementById(

            "img"+(i+1)

        );

        const texto=document.getElementById(

            "imgTexto"+(i+1)

        );

        if(foto){

            foto.src=imagen.imagen;

        }

        if(texto){

            texto.textContent=imagen.nombre;

        }

    });

}

function eliminarEvidencia(indice){

    informe.evidencias.splice(indice,1);

    cargarEvidencias();

    guardarLocal();

}
/*==========================================================
 NUMERACIÓN AUTOMÁTICA DE PÁGINAS
==========================================================*/

function numerarPaginas(){

    const paginas = document.querySelectorAll(".pagina");

    paginas.forEach((pagina,indice)=>{

        let pie = pagina.querySelector(".pie-documento");

        if(!pie){

            pie = document.createElement("div");

            pie.className = "pie-documento";

            pagina.appendChild(pie);

        }

        pie.innerHTML = `

            <span>

                Sistema Profesional de Informes Periciales

            </span>

            <span class="numero-pagina">

                Página ${indice+1} de ${paginas.length}

            </span>

        `;

    });

}

/*==========================================================
 ENCABEZADO AUTOMÁTICO
==========================================================*/

function crearEncabezados(){

    document.querySelectorAll(".pagina").forEach((pagina)=>{

        if(pagina.classList.contains("portada")){

            return;

        }

        let encabezado = pagina.querySelector(".encabezado-documento");

        if(!encabezado){

            encabezado = document.createElement("div");

            encabezado.className = "encabezado-documento";

            encabezado.innerHTML = `

                <h4>

                    INFORME PERICIAL CONTABLE

                </h4>

                <span id="codigoInforme">

                </span>

            `;

            pagina.prepend(encabezado);

        }

    });

}

/*==========================================================
 CÓDIGO DEL INFORME
==========================================================*/

function generarCodigo(){

    const año = new Date().getFullYear();

    const numero = String(

        Math.floor(Math.random()*9999)+1

    ).padStart(4,"0");

    return `IPC-${año}-${numero}`;

}

function actualizarCodigo(){

    const codigo = generarCodigo();

    document.querySelectorAll("#codigoInforme")

    .forEach(item=>{

        item.textContent = codigo;

    });

}

/*==========================================================
 FECHA AUTOMÁTICA
==========================================================*/

function actualizarFecha(){

    informe.fecha = fechaActual();

    cargarDatos();

}

/*==========================================================
 IMPRESIÓN
==========================================================*/

function imprimirInforme(){

    window.print();

}

/*==========================================================
 RECALCULAR SISTEMA
==========================================================*/

function actualizarSistema(){

    cargarDatos();

    cargarAnexos();

    cargarEvidencias();

    crearEncabezados();

    numerarPaginas();

    actualizarCodigo();

}

/*==========================================================
 EVENTOS
==========================================================*/

window.addEventListener(

    "beforeprint",

    numerarPaginas

);

window.addEventListener(

    "afterprint",

    numerarPaginas

);

window.addEventListener(

    "resize",

    numerarPaginas

);

/*==========================================================
 INICIALIZACIÓN
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        recuperarLocal();

        actualizarFecha();

        actualizarSistema();

    }

);
/*==========================================================
 ÍNDICE AUTOMÁTICO
==========================================================*/

function actualizarIndice(){

    const capitulos=document.querySelectorAll(".titulo-capitulo");

    const indice=document.querySelector(".indice tbody");

    if(!indice){

        return;

    }

    indice.innerHTML="";

    capitulos.forEach((capitulo,i)=>{

        const fila=document.createElement("tr");

        const titulo=capitulo.querySelector("h2").textContent;

        fila.innerHTML=`

            <td>${titulo}</td>

            <td>${i+1}</td>

        `;

        indice.appendChild(fila);

    });

}

/*==========================================================
 BUSCADOR INTERNO
==========================================================*/

function buscar(texto){

    texto=texto.toLowerCase();

    const paginas=document.querySelectorAll(".pagina");

    paginas.forEach(pagina=>{

        const contenido=pagina.innerText.toLowerCase();

        pagina.style.display=contenido.includes(texto)

            ? "block"

            : "none";

    });

}

/*==========================================================
 VALIDAR INFORME
==========================================================*/

function validarInforme(){

    const errores=[];

    if(!informe.expediente){

        errores.push("Falta el expediente.");

    }

    if(!informe.juzgado){

        errores.push("Falta el juzgado.");

    }

    if(!informe.demandante){

        errores.push("Falta el demandante.");

    }

    if(!informe.demandado){

        errores.push("Falta el demandado.");

    }

    if(!informe.perito){

        errores.push("Falta el nombre del perito.");

    }

    return errores;

}

/*==========================================================
 RESUMEN DEL INFORME
==========================================================*/

function resumenInforme(){

    return{

        paginas:document.querySelectorAll(".pagina").length,

        anexos:informe.anexos.length,

        evidencias:informe.evidencias.length,

        fecha:informe.fecha,

        expediente:informe.expediente

    };

}

/*==========================================================
 HISTORIAL DE CAMBIOS
==========================================================*/

const historial=[];

function registrarCambio(descripcion){

    historial.push({

        fecha:new Date().toLocaleString("es-PE"),

        accion:descripcion

    });

}

/*==========================================================
 EXPORTAR HISTORIAL
==========================================================*/

function exportarHistorial(){

    const blob=new Blob(

        [

            JSON.stringify(

                historial,

                null,

                4

            )

        ],

        {

            type:"application/json"

        }

    );

    const enlace=document.createElement("a");

    enlace.href=URL.createObjectURL(blob);

    enlace.download="Historial.json";

    enlace.click();

}

/*==========================================================
 RESTABLECER SISTEMA
==========================================================*/

function reiniciarSistema(){

    if(

        confirm(

            "¿Desea reiniciar completamente el sistema?"

        )

    ){

        localStorage.clear();

        location.reload();

    }

}

/*==========================================================
 ATAJOS DE TECLADO
==========================================================*/

document.addEventListener(

    "keydown",

    function(e){

        if(e.ctrlKey && e.key==="p"){

            e.preventDefault();

            imprimirInforme();

        }

        if(e.ctrlKey && e.key==="s"){

            e.preventDefault();

            guardarInforme();

        }

    }

);

/*==========================================================
 INFORMACIÓN DEL SISTEMA
==========================================================*/

console.log(

"=========================================="

);

console.log(

"SISTEMA PROFESIONAL DE INFORMES PERICIALES"

);

console.log(

"Versión 1.0"

);

console.log(

"Desarrollado en HTML5 + CSS3 + JavaScript"

);

console.log(

"=========================================="

);
